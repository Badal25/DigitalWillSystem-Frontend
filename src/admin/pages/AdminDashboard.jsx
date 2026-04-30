// import { useEffect, useState } from "react";
// import { getDashboard } from "../services/adminAPI";
// import DashboardCards from "../components/DashboardCards";

// export default function AdminDashboard() {

//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {

//     try {

//       setLoading(true);

//       const res = await getDashboard();
//       setStats(res.data);

//     } catch (err) {

//       console.error("Dashboard error:", err);
//       setError("Failed to load dashboard");

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Admin Dashboard
//       </h1>

//       {loading && (
//         <div className="text-gray-500">
//           Loading dashboard...
//         </div>
//       )}

//       {error && (
//         <div className="text-red-500">
//           {error}
//         </div>
//       )}

//       {stats && (
//         <DashboardCards stats={stats} />
//       )}

//     </div>

//   );
// }




import { useEffect, useState } from "react";
import { getDashboard } from "../services/adminAPI";
import DashboardCards from "../components/DashboardCards";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const res = await getDashboard();
      setStats(res.data);

    } catch (err) {

      console.error("Dashboard error:", err);
      setError("Failed to load dashboard");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Overview of system statistics and activity
        </p>

      </div>

      {/* Loading */}

      {loading && (

        <div className="bg-white shadow rounded-lg p-6 text-gray-500">
          Loading dashboard...
        </div>

      )}

      {/* Error */}

      {error && (

        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>

      )}

      {/* Stats Cards */}

      {stats && (

        <div className="bg-white shadow-xl rounded-xl p-6">

          <DashboardCards stats={stats} />

        </div>

      )}

    </div>

  );

}