import { useAuth } from "../context/AuthContext";

export function useProfile() {
  const {
    user,
    loading,
  } = useAuth();

  return {
    profile: user,
    loading,
    refresh: () => {},
  };
}