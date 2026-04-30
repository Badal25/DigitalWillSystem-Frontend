
// src/pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import Footer from "../../components/Dashboard/Footer";
import Cards from "../../components/Dashboard/Cards";

import WillsTable from "../../components/Dashboard/Tables/WillsTable";
import InsuranceTable from "../../components/Dashboard/Tables/InsuranceTable";
import SocialAccounts from "../../components/Dashboard/Tables/SocialAccounts";
import AIChats from "../../components/Dashboard/Tables/AIChats";
import NomineeManagement from "../../components/Dashboard/Tables/NomineeManagement";
import AuditLogs from "../../components/Dashboard/Tables/AuditLogs";

import OverviewChart from "../../components/Dashboard/Charts/OverviewChart";
import FraudChart from "../../components/Dashboard/Charts/FraudChart";

import AddWillForm from "../../components/Dashboard/Forms/AddWillForm";

const Dashboard = () => {
  const [overview, setOverview] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  // Active section state
  const [activeSection, setActiveSection] = useState("overview");

  // Fetch dashboard data
  // useEffect(() => {
  //   const fetchOverview = async () => {
  //     setLoading(true);
  //     try {
  //       const userRes = await API.get("/auth/profile");
  //       setUser(userRes.data);

  //       const res = await API.get("/dashboard/overview-counts");
  //       setOverview(res.data);
  //     } catch (err) {
  //       console.error("Error fetching dashboard data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOverview();
  // }, [reload]);

  useEffect(() => {

  const token = localStorage.getItem("token");

  // ❌ AGAR TOKEN NAHI → API CALL MAT KAR
  if (!token) {
    console.log("No token, skipping API call");
    return;
  }

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const userRes = await API.get("/auth/profile");
      setUser(userRes.data);

      const res = await API.get("/dashboard/overview-counts");
      setOverview(res.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchOverview();

}, [reload]);

  if (loading)
    return (
      <div className="text-center mt-20 text-white text-lg font-semibold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar
        role={user.role}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Topbar user={user} />

        <main className="flex-1 overflow-y-auto p-6">

          {/* Overview */}
          {activeSection === "overview" && (
            <>
              <Cards data={overview} />
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <OverviewChart data={overview} />
                <FraudChart data={overview} />
              </div>
            </>
          )}

          {/* Wills */}
          {activeSection === "wills" && (
            <div className="mb-10">
              <AddWillForm onSuccess={() => setReload(!reload)} />
              <WillsTable reload={reload} />
            </div>
          )}

          {/* Insurance */}
          {activeSection === "insurance" && (
            <div className="mb-10">
              <InsuranceTable />
            </div>
          )}

          {/* Social Accounts */}
          {activeSection === "social" && (
            <div className="mb-10">
              <SocialAccounts />
            </div>
          )}

          {/* AI Chats */}
          {activeSection === "aichats" && (
            <div className="mb-10">
              <AIChats />
            </div>
          )}

          {/* Nominee Management */}
          {activeSection === "nominee" && (
            <div className="mb-10">
              <NomineeManagement />
            </div>
          )}

          {/* Audit Logs */}
          {activeSection === "audit" && (
            <div className="mb-10">
              <AuditLogs />
            </div>
          )}

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;