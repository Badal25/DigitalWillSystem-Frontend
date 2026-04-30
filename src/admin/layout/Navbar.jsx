import { Bell, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (

    <header className="flex items-center justify-between bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-6 py-3">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white transition"
        >
          <Menu size={24}/>
        </button>

        <h1 className="text-xl font-semibold text-white tracking-wide">
          Admin Panel
        </h1>

      </div>

      {/* SEARCH */}

      <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1.5 border border-gray-700">

        <Search size={18} className="text-gray-400"/>

        <input
          type="text"
          placeholder="Search users, logs..."
          className="bg-transparent text-sm text-gray-200 outline-none px-2"
        />

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-6">

        {/* Notification */}

        <button className="relative text-gray-300 hover:text-white transition">

          <Bell size={22}/>

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/40"
            alt="admin"
            className="w-9 h-9 rounded-full border border-gray-600"
          />

          <div className="hidden md:block">

            <p className="text-sm font-semibold text-white">
              Admin
            </p>

            <p className="text-xs text-gray-400">
              Super Admin
            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-md transition"
        >
          Logout
        </button>

      </div>

    </header>

  );
}