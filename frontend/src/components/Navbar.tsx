import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    const titles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/build-resume": "Build Resume",
      "/compare-resume": "Compare Resume",
      "/content-calendar": "Content Calendar",
      "/generate-post": "Generate Post",
      "/tasks": "Tasks",
      "/profile": "Profile",
    };
    return titles[path] || "Dashboard";
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Left - Heading */}
      <h1 className="text-2xl font-semibold text-black">{getPageTitle()}</h1>

      {/* Right - Profile Icon */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-800 transition-colors"
      >
        <User className="w-5 h-5 text-white" />
      </button>
    </nav>
  );
};

export default Navbar;
