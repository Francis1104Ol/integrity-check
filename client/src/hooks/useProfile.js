import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthService } from "../services/auth.service";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    try {
      setLoading(true);

      const response = await AuthService.profile();

      const user = response.data.data;

      setProfile(user);

      // Keep localStorage user data synchronized
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      return user;
    } catch (error) {
      console.error("Failed to load profile:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load profile."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    refresh: fetchProfile,
  };
}