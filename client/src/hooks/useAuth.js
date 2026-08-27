import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthService } from "../services/auth.service";

export function useAuth() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isAuthenticated =
    Boolean(localStorage.getItem("token"));

  async function login(credentials) {
    try {
      setLoading(true);

      const response =
        await AuthService.login(credentials);

      const { token, user } =
        response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setUser(user);

      toast.success("Login successful");

      navigate("/dashboard");

      return user;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getProfile() {
    try {
      const token =
        localStorage.getItem("token");

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
    } finally {
      setCheckingAuth(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);

      await AuthService.logout();
    } catch (error) {
      console.error(
        "Logout request failed:",
        error
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      navigate("/login");
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return {
    user,
    loading,
    checkingAuth,
    isAuthenticated,
    login,
    logout,
    getProfile,
  };
}