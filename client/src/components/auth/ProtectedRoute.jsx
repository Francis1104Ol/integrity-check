import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
export default function ProtectedRoute() {
  const {
    isAuthenticated,
    checkingAuth,
  } = useAuth();

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-sm">
          <p className="text-slate-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}