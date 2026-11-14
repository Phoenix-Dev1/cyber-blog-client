// One place for talking to the API: base URL, the login token, and error messages.
import axios from "axios";
import { toast } from "sonner";

const TOKEN_KEY = "authToken";

// localStorage can throw (private mode, blocked storage): treat that as "not logged in"
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore: the session then only lasts until the next page load
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
};

// After Google/GitHub sign-in the API sends the browser back with the token in the URL: as a fragment
// (#token=…, never sent to any server) or, from older API versions, as ?token=. Store it and clean the URL.
// Call once, before the app renders.
export const captureTokenFromUrl = () => {
  const fromHash = new URLSearchParams(window.location.hash.slice(1)).get("token");
  const fromQuery = new URLSearchParams(window.location.search).get("token");
  const token = fromHash || fromQuery;
  if (token) {
    setToken(token);
    window.history.replaceState(null, document.title, "/");
  }
};

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// A 401 on a request that carried a token means the session ended (expired, account gone).
// AuthContext registers what to do then (log out + tell the user). Requests can opt out with
// { skipSessionCheck: true } (the start-up /auth/me check handles its own 401).
let onSessionExpired = () => {};
export const setSessionExpiredHandler = (handler) => {
  onSessionExpired = handler;
};

api.interceptors.response.use(undefined, (error) => {
  const { config, response } = error;
  if (response?.status === 401 && config?.headers?.Authorization && !config.skipSessionCheck) {
    // Already reported by the handler: showError() skips it
    error.sessionExpired = true;
    onSessionExpired();
  }
  return Promise.reject(error);
});

// The text to show for a failed request. The API answers errors as { message } (and, on some routes,
// as a plain string); anything else gets the fallback.
export const errorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim() && !data.trim().startsWith("<")) return data;
  if (typeof data?.message === "string" && data.message) return data.message;
  if (error?.response?.status === 429) return "Too many requests. Please try again later.";
  if (error && !error.response) return "The server can't be reached. Check your connection.";
  return fallback;
};

// Error toast for a failed request (none when the session-expired message was already shown)
export const showError = (error, fallback) => {
  if (error?.sessionExpired) return;
  toast.error(errorMessage(error, fallback));
};

export const isNotFound = (error) => error?.response?.status === 404;

export default api;
