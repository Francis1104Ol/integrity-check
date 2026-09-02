import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function SidebarItem({
  icon: Icon,
  title,
  path,
  end = false,
  action,
}) {
  const { logout, loading } = useAuth();

  // Action item such as Logout
  if (action === "logout") {
    return (
      <button
        type="button"
        onClick={logout}
        disabled={loading}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon size={20} />

        <span className="font-medium">
          {loading ? "Logging out..." : title}
        </span>
      </button>
    );
  }

  // Normal navigation item
  return (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      <Icon size={20} />

      <span className="font-medium">
        {title}
      </span>
    </NavLink>
  );
}