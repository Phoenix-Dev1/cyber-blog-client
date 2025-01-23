import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user data from the backend using the JWT token
  const fetchUser = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      logout(); // Clear the token and user data on error
    }
  };

  // Handle login with a token
  const login = (token) => {
    localStorage.setItem("authToken", token);
    fetchUser(token);
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  // Check for token on page load and handle OAuth login
  useEffect(() => {
    // Extract token from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // If token is in the URL, log in and clean the URL
      login(token);
      window.history.replaceState({}, document.title, "/"); // Clean the URL
    } else {
      // Check localStorage for token if no token in URL
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        fetchUser(storedToken);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
