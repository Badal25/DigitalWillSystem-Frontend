// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileWarning,
//   ShieldCheck,
//   UserX,
//   Eye,
//   FileText
// } from "lucide-react";

// export default function Sidebar({ sidebarOpen, toggleSidebar }) {

//   const menu = [

//     {
//       name: "Dashboard",
//       path: "/admin/dashboard",
//       icon: <LayoutDashboard size={20}/>
//     },

//     {
//       name: "Death Control",
//       path: "/admin/death-control",
//       icon: <ShieldCheck size={20}/>
//     },

//     {
//       name: "Pending Verifications",
//       path: "/admin/pending-verifications",
//       icon: <FileWarning size={20}/>
//     },

//     {
//       name: "Inactive Accounts",
//       path: "/admin/inactive-accounts",
//       icon: <UserX size={20}/>
//     },

//     {
//       name: "Nominee Access",
//       path: "/admin/nominee-access",
//       icon: <Eye size={20}/>
//     },

//     {
//       name: "Audit Logs",
//       path: "/admin/audit-logs",
//       icon: <FileText size={20}/>
//     }

//   ];

//   return (

//     <div
//       className={`bg-gray-900 text-white h-screen transition-all duration-300
//       ${sidebarOpen ? "w-64" : "w-20"}`}
//     >

//       {/* Logo */}

//       <div className="flex items-center justify-between p-4 border-b border-gray-700">

//         <h1 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>
//           Admin Panel
//         </h1>

//         <button
//           onClick={toggleSidebar}
//           className="text-gray-400 hover:text-white"
//         >
//           ☰
//         </button>

//       </div>

//       {/* Menu */}

//       <nav className="mt-5">

//         {menu.map((item, index) => (

//           <NavLink
//             key={index}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 p-3 mx-2 rounded-lg transition
//               ${isActive
//                 ? "bg-purple-600 text-white"
//                 : "text-gray-300 hover:bg-gray-800"
//               }`
//             }
//           >

//             {item.icon}

//             <span className={`${!sidebarOpen && "hidden"}`}>
//               {item.name}
//             </span>

//           </NavLink>

//         ))}

//       </nav>

//     </div>

//   );

// }


import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileWarning,
  ShieldCheck,
  UserX,
  Eye,
  FileText
} from "lucide-react";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {

  const menu = [

    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20}/>
    },

    {
      name: "Death Control",
      path: "/admin/death-control",
      icon: <ShieldCheck size={20}/>
    },

    {
      name: "Pending Verifications",
      path: "/admin/pending",
      icon: <FileWarning size={20}/>
    },

    {
      name: "Inactive Accounts",
      path: "/admin/inactive",
      icon: <UserX size={20}/>
    },

    {
      name: "Nominee Access",
      path: "/admin/nominee-monitor",
      icon: <Eye size={20}/>
    },
{
  name: "Nominee Management",
  path: "/admin/nominees",
  icon: <Eye size={20}/>
},
    {
      name: "Audit Logs",
      path: "/admin/audit",
      icon: <FileText size={20}/>
    }

  ];

  return (

    <div
      className={`bg-gray-900 text-white h-screen transition-all duration-300
      ${sidebarOpen ? "w-64" : "w-20"}`}
    >

      {/* Logo */}

      <div className="flex items-center justify-between p-4 border-b border-gray-700">

        <h1 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>
          Admin Panel
        </h1>

        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          ☰
        </button>

      </div>

      {/* Menu */}

      <nav className="mt-5 flex flex-col gap-1">

        {menu.map((item, index) => (

          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 mx-2 rounded-lg transition-all duration-200
              ${isActive
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >

            {item.icon}

            <span className={`${!sidebarOpen && "hidden"} font-medium`}>
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>

    </div>

  );

}