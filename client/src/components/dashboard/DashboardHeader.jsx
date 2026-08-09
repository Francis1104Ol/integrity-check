import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back, {user?.firstName || "User"} 👋
        </p>
      </div>

      <div className="rounded-xl bg-white px-4 py-3 shadow">
        <p className="font-semibold">
          {user?.firstName} {user?.lastName}
        </p>

        <p className="text-sm text-slate-500">
          {user?.email}
        </p>
      </div>
    </div>
  );
}