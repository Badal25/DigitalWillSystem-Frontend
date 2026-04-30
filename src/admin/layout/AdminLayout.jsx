import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

    <div className="flex h-screen bg-gray-950 text-gray-200">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main */}

      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-950">

          <div className="max-w-7xl mx-auto">

            <Outlet />

          </div>

        </main>

      </div>

    </div>

  );
}