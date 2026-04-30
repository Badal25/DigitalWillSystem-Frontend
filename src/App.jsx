

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* ================= USER SIDE ================= */

// import Dashboard from "./pages/Dashboard/Dashboard";
// import WillsTable from "./components/Dashboard/Tables/WillsTable";
// import InsuranceTable from "./components/Dashboard/Tables/InsuranceTable";
// import AIChats from "./components/Dashboard/Tables/AIChats";
// import UserAuditLogs from "./components/Dashboard/Tables/AuditLogs";
// import NomineeManagement from "./components/Dashboard/Tables/NomineeManagement";

// import NomineeAccess from "./nominee/pages/NomineeAccess";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Landing from "./pages/Landing";

// /* ================= ADMIN AUTH ================= */

// import AdminLogin from "./admin/auth/AdminLogin";

// /* ================= ADMIN LAYOUT ================= */

// import AdminLayout from "./admin/layout/AdminLayout";
// import AdminProtectedRoute from "./admin/layout/AdminProtectedRoute";

// /* ================= ADMIN PAGES ================= */

// import AdminDashboard from "./admin/pages/AdminDashboard";
// import DeathControl from "./admin/pages/DeathControl";
// import PendingVerifications from "./admin/pages/PendingVerifications";
// import InactiveAccounts from "./admin/pages/InactiveAccounts";
// import NomineeAccessMonitor from "./admin/pages/NomineeAccessMonitor";
// import AuditLogs from "./admin/pages/AuditLogs";

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* ================= PUBLIC ROUTES ================= */}

//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* NOMINEE ACCESS (PUBLIC) */}
//         <Route path="/nominee-access/:token" element={<NomineeAccess />} />

//         {/* ================= USER DASHBOARD ================= */}

//         <Route path="/dashboard" element={<Dashboard />}>
//   <Route index element={<Navigate to="wills" />} />
//   <Route path="wills" element={<WillsTable />} />
//   <Route path="insurance" element={<InsuranceTable />} />
//   <Route path="ai" element={<AIChats />} />
//   <Route path="audit" element={<UserAuditLogs />} />

//   {/* Nominee Management */}
//   <Route path="nominee-management" element={<NomineeManagement />} />
// </Route>

//         {/* ================= ADMIN LOGIN ================= */}

//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* ================= ADMIN PROTECTED ================= */}

//         <Route element={<AdminProtectedRoute />}>
//           <Route path="/admin" element={<AdminLayout />}>

//             <Route index element={<Navigate to="dashboard" />} />

//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="death-control" element={<DeathControl />} />
//             <Route path="pending" element={<PendingVerifications />} />
//             <Route path="inactive" element={<InactiveAccounts />} />
//             <Route path="nominee-monitor" element={<NomineeAccessMonitor />} />
//             <Route path="audit" element={<AuditLogs />} />
// <Route path="/admin/nominees" element={<AdminNominees />} />
//           </Route>
//         </Route>

//         {/* ================= FALLBACK ================= */}

//         <Route path="*" element={<Navigate to="/" />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ================= USER SIDE ================= */

import Dashboard from "./pages/Dashboard/Dashboard";
import WillsTable from "./components/Dashboard/Tables/WillsTable";
import InsuranceTable from "./components/Dashboard/Tables/InsuranceTable";
import AIChats from "./components/Dashboard/Tables/AIChats";
import UserAuditLogs from "./components/Dashboard/Tables/AuditLogs";
import NomineeManagement from "./components/Dashboard/Tables/NomineeManagement";

import NomineeAccess from "./nominee/pages/NomineeAccess";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

/* ================= ADMIN AUTH ================= */

import AdminLogin from "./admin/auth/AdminLogin";

/* ================= ADMIN LAYOUT ================= */

import AdminLayout from "./admin/layout/AdminLayout";
import AdminProtectedRoute from "./admin/layout/AdminProtectedRoute";

/* ================= ADMIN PAGES ================= */

import AdminDashboard from "./admin/pages/AdminDashboard";
import DeathControl from "./admin/pages/DeathControl";
import PendingVerifications from "./admin/pages/PendingVerifications";
import InactiveAccounts from "./admin/pages/InactiveAccounts";
import NomineeAccessMonitor from "./admin/pages/NomineeAccessMonitor";
import AuditLogs from "./admin/pages/AuditLogs";

/* ✅ ADD THIS (IMPORTANT) */
import AdminNominees from "./admin/pages/AdminNominees";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* NOMINEE ACCESS (PUBLIC) */}
        <Route path="/nominee-access/:token" element={<NomineeAccess />} />

        {/* ================= USER DASHBOARD ================= */}

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="wills" />} />
          <Route path="wills" element={<WillsTable />} />
          <Route path="insurance" element={<InsuranceTable />} />
          <Route path="ai" element={<AIChats />} />
          <Route path="audit" element={<UserAuditLogs />} />

          {/* Nominee Management */}
          <Route path="nominee-management" element={<NomineeManagement />} />
        </Route>

        {/* ================= ADMIN LOGIN ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN PROTECTED ================= */}

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="death-control" element={<DeathControl />} />
            <Route path="pending" element={<PendingVerifications />} />
            <Route path="inactive" element={<InactiveAccounts />} />
            <Route path="nominee-monitor" element={<NomineeAccessMonitor />} />
            <Route path="audit" element={<AuditLogs />} />

            {/* ✅ FIXED ROUTE */}
            <Route path="nominees" element={<AdminNominees />} />

          </Route>
        </Route>

        {/* ================= FALLBACK ================= */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;