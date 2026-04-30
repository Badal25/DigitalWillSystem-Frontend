

// const handleLogout = async () => {
//   try {
//     await API.post("/auth/logout"); // backend logout
//     localStorage.removeItem("token"); // agar JWT token localStorage me hai
//     window.location.href = "/"; // landing page pe redirect
//   } catch (err) {
//     console.error("Logout failed:", err);
//     alert("Logout failed. Try again.");
//   }
// };

//   return (
//     <header className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/60 backdrop-blur-lg relative">
//       {/* Search */}
//       <div className="flex items-center gap-2 bg-slate-950/30 px-3 py-2 rounded-lg">
//         <Search size={18} className="text-slate-400" />
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="bg-transparent outline-none text-white placeholder-slate-400 w-60"
//         />
//       </div>

//       {/* Right Actions */}
//       <div className="flex items-center gap-6 relative">
//         {/* Notifications */}
//         <button className="relative">
//           <Bell size={20} className="text-slate-400 hover:text-blue-400 transition" />
//           <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2" />
//         </button>

//         {/* User Dropdown */}
//         <div className="relative">
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <div className="bg-blue-600/50 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
//               {user.name[0]}
//             </div>
//             <span className="hidden md:block">{user.name}</span>
//           </div>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-lg shadow-lg z-50">
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-slate-800 transition"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Topbar;


import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import API from "../../services/api";

const Topbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/"); // landing page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-full h-16 px-6 flex items-center justify-between bg-[#0f172a] border-b border-gray-700">
      
      {/* Left Title */}
      <h1 className="text-lg font-semibold text-white tracking-wide">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-300 hover:text-white transition" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-md">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400">
              {user?.role || "Member"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-sm text-white shadow-md"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>
    </div>
  );
};

export default Topbar;