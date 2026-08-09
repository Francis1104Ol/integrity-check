import { NavLink } from "react-router-dom";

export default function SidebarItem({
  icon: Icon,
  title,
  path,
  end = false,
}) {
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