import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthService } from "../services/auth.service";

export function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function login(credentials) {
    try {
      setLoading(true);

      const response = await AuthService.login(credentials);

      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      navigate("/dashboard");

      return user;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await AuthService.logout();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }
  }

  return {
    loading,
    login,
    logout,
  };
}