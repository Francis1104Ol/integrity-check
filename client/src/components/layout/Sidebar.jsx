import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import navigation from "../../constants/navigation";

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r bg-white lg:flex lg:flex-col">
      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.title}
            {...item}
            end={item.path === "/datasets"}
          />
        ))}
      </nav>
    </aside>
  );
}