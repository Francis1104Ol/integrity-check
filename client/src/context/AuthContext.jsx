import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthService } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return null;
      }

      const response =
        await AuthService.profile();

      const profile =
        response.data.data;

      setUser(profile);

      localStorage.setItem(
        "user",
        JSON.stringify(profile)
      );

      return profile;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      return null;
    }
  }

  useEffect(() => {
    async function initializeAuth() {
      setLoading(true);
      await loadUser();
      setLoading(false);
    }

    initializeAuth();
  }, []);

  async function login(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refresh: loadUser,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}