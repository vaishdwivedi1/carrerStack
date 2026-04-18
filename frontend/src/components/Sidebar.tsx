import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  GitCompare,
  Calendar,
  PenTool,
  CheckSquare,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const menuItems = [
    { path: "/build-resume", name: "Build Resume", icon: FileText },
    { path: "/compare-resume", name: "Compare Resume", icon: GitCompare },
    { path: "/content-calendar", name: "Calendar", icon: Calendar },
    { path: "/generate-post", name: "Posts", icon: PenTool },
    { path: "/tasks", name: "Tasks", icon: CheckSquare },
  ];

  return (
    <aside className="w-64 bg-white text-black border-r border-gray-200 flex flex-col h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">CareerStack</h1>
        <p className="text-xs text-gray-500 mt-1">Build your career</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 mx-2 my-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section & Logout */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
