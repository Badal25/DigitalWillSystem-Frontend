// import { useState } from "react";
// import {
//   Home,
//   FileText,
//   Shield,
//   Users,
//   Bot,
//   AlertCircle,
//   Settings,
//   Activity,
// } from "lucide-react";

// const Sidebar = ({ role }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const menu = [
//     { name: "Overview", icon: <Home size={20} />, id: "overview" },
//     { name: "My Wills", icon: <FileText size={20} />, id: "wills" },
//     { name: "Insurance Vault", icon: <Shield size={20} />, id: "insurance" },
//     { name: "Social Instructions", icon: <Users size={20} />, id: "social" },
//     { name: "AI Assistant", icon: <Bot size={20} />, id: "aichats" },
//     { name: "Nominee Access", icon: <Users size={20} />, id: "nominee" },
//     { name: "Audit Logs", icon: <Activity size={20} />, id: "audit" },
//     { name: "Fraud Monitor", icon: <AlertCircle size={20} />, id: "fraud" },
//   ];

//   if (role === "admin") {
//     menu.push({ name: "Admin Panel", icon: <Settings size={20} />, id: "admin" });
//   }

//   // Scroll to section function
//   const handleScroll = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className={`${collapsed ? "w-20" : "w-64"} bg-slate-900/70 backdrop-blur-lg border-r border-slate-800 transition-all duration-300 flex flex-col`}>
//       <div className="flex justify-between items-center p-4 border-b border-slate-800">
//         <h1 className={`${collapsed ? "hidden" : "text-xl font-bold"} text-blue-400`}>DigitalWill</h1>
//         <button onClick={() => setCollapsed(!collapsed)}>☰</button>
//       </div>

//       <nav className="flex-1 mt-4">
//         {menu.map((item) => (
//           <div
//             key={item.name}
//             onClick={() => handleScroll(item.id)}
//             className={`flex items-center gap-3 p-3 hover:bg-slate-800 cursor-pointer transition ${collapsed ? "justify-center" : ""}`}
//           >
//             {item.icon}
//             {!collapsed && <span>{item.name}</span>}
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar; 


// src/components/Dashboard/Sidebar.jsx
import { useState } from "react";
import {
  Home,
  FileText,
  Shield,
  Users,
  Bot,
  AlertCircle,
  Settings,
  Activity,
} from "lucide-react";

const Sidebar = ({ role, activeSection, setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Overview", icon: <Home size={20} />, id: "overview" },
    { name: "My Wills", icon: <FileText size={20} />, id: "wills" },
    { name: "Insurance Vault", icon: <Shield size={20} />, id: "insurance" },
    { name: "Social Instructions", icon: <Users size={20} />, id: "social" },
    { name: "AI Assistant", icon: <Bot size={20} />, id: "aichats" },
    { name: "NomineeManagement", icon: <Users size={20} />, id: "nominee" },
    { name: "Audit Logs", icon: <Activity size={20} />, id: "audit" },
    { name: "Fraud Monitor", icon: <AlertCircle size={20} />, id: "fraud" },
  ];

  if (role === "admin") {
    menu.push({ name: "Admin Panel", icon: <Settings size={20} />, id: "admin" });
  }

  return (
    <div className={`${collapsed ? "w-20" : "w-64"} bg-slate-900/70 backdrop-blur-lg border-r border-slate-800 transition-all duration-300 flex flex-col`}>
      <div className="flex justify-between items-center p-4 border-b border-slate-800">
        <h1 className={`${collapsed ? "hidden" : "text-xl font-bold"} text-blue-400`}>DigitalWill</h1>
        <button onClick={() => setCollapsed(!collapsed)}>☰</button>
      </div>

      <nav className="flex-1 mt-4">
        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 p-3 cursor-pointer transition ${collapsed ? "justify-center" : ""} ${activeSection === item.id ? "bg-slate-800" : "hover:bg-slate-800"}`}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;