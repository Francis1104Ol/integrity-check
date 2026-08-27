import {
  LayoutDashboard,
  Database,
  Upload,
  FileText,
  User,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Datasets",
    icon: Database,
    path: "/datasets",
  },
  {
    title: "Upload Dataset",
    icon: Upload,
    path: "/datasets/upload",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Logout",
    icon: LogOut,
    action: "logout",
  },
];

export default navigation;