// layouts/ProtectedLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet /> {/* Dashboard, Profile, etc. will render here */}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
