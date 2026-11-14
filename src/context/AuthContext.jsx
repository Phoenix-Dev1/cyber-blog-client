import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { clearToken, getToken, setSessionExpiredHandler, setToken } from "../api/client";

const AuthContext = createContext(null);

// The logged-in user. `isLoading` is true until the stored token has been checked with /auth/me, so pages
// that need a login (PrivateRoute) wait instead of sending a logged-in user to /login on a page reload.
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getToken()));

  // Per-user data cached by queries (saved posts) must not leak into the next session
  const forgetUserData = useCallback(() => {
    queryClient.removeQueries({ queryKey: ["savedPosts"] });
  }, [queryClient]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setIsLoading(false);
    forgetUserData();
  }, [forgetUserData]);

  // Loads the user for the stored token. Resolves to the user, or null.
  const refreshUser = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setIsLoading(false);
      return null;
    }
    try {
      const { data } = await api.get("/auth/me", { skipSessionCheck: true });
      setUser(data);
      return data;
    } catch (error) {
      // An invalid or expired token is dropped. On a network error the token is kept for the next try.
      if (error.response?.status === 401) clearToken();
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stores the token and waits for the user, so the caller can navigate once logged in
  const login = useCallback(
    async (token) => {
      setToken(token);
      setIsLoading(true);
      forgetUserData();
      return refreshUser();
    },
    [forgetUserData, refreshUser]
  );

  useEffect(() => {
    refreshUser();
    setSessionExpiredHandler(() => {
      logout();
      toast.error("Your session has expired. Please log in again.", { id: "session-expired" });
    });
    return () => setSessionExpiredHandler(() => {});
  }, [refreshUser, logout]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAdmin: user?.role === "admin",
      isDemo: Boolean(user?.isDemo),
      login,
      logout,
      refreshUser,
      // Older name, kept for existing callers
      updateUser: refreshUser,
    }),
    [user, isLoading, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
