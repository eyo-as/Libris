import { useCallback, useEffect, useState } from "react";
import { login, register } from "../services/authService";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      if (token) setUser({ authenticated: true });
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const loginHandler = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const userData = await login(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerHandler = useCallback(async (userData) => {
    setLoading(true);

    try {
      const newUser = await register(userData);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    loginHandler,
    registerHandler,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
