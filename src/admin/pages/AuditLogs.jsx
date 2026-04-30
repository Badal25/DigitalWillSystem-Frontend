// import { useEffect, useState } from "react";
// import AdminLayout from "../layout/AdminLayout";
// import API from "../services/adminAPI";

// export default function AuditLogs() {

//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const fetchLogs = async () => {

//     try {

//       const res = await API.get("/audit-logs");

//       setLogs(res.data);

//     } catch (err) {

//       console.error("Failed to load audit logs", err);
//       alert("Unable to fetch logs");

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//       <div className="p-6">

//         <h1 className="text-2xl font-bold mb-6">
//           Admin Audit Logs
//         </h1>

//         {loading ? (

//           <p className="text-gray-500">
//             Loading logs...
//           </p>

//         ) : logs.length === 0 ? (

//           <p className="text-gray-500">
//             No audit logs found
//           </p>

//         ) : (

//           <div className="overflow-x-auto">

//             <table className="w-full bg-white shadow rounded">

//               <thead className="bg-gray-200">

//                 <tr>

//                   <th className="p-3 text-left">Log ID</th>
//                   <th>Admin ID</th>
//                   <th>Action</th>
//                   <th>Case ID</th>
//                   <th>Timestamp</th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {logs.map((log) => (

//                   <tr
//                     key={log.id}
//                     className="border-t hover:bg-gray-50"
//                   >

//                     <td className="p-3">
//                       {log.id}
//                     </td>

//                     <td>
//                       {log.admin_id}
//                     </td>

//                     <td>

//                       <span
//                         className={
//                           log.action === "APPROVED_CASE"
//                             ? "text-green-600 font-semibold"
//                             : log.action === "REJECTED_CASE"
//                             ? "text-red-600 font-semibold"
//                             : log.action === "RELEASED_CASE"
//                             ? "text-purple-600 font-semibold"
//                             : "text-gray-600"
//                         }
//                       >
//                         {log.action}
//                       </span>

//                     </td>

//                     <td>
//                       {log.case_id}
//                     </td>

//                     <td>
//                       {new Date(log.created_at).toLocaleString()}
//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//         )}

//       </div>

   

//   );

// }


import { useEffect, useState } from "react";
import API from "../services/adminAPI";

export default function AuditLogs() {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/audit-logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load audit logs", err);
      alert("Unable to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Audit Logs
      </h1>

      {loading ? (
        <div className="text-gray-500 text-lg">
          Loading logs...
        </div>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">
          No audit logs found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl border">

          <table className="w-full text-sm">

            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">Log ID</th>
                <th>Admin ID</th>
                <th>Action</th>
                <th>Case ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-semibold text-gray-700">
                    #{log.id}
                  </td>

                  <td className="text-gray-600">{log.admin_id}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        log.action === "APPROVED_CASE"
                          ? "bg-green-100 text-green-600"
                          : log.action === "REJECTED_CASE"
                          ? "bg-red-100 text-red-600"
                          : log.action === "RELEASED_CASE"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="text-gray-700">{log.case_id}</td>

                  <td className="text-gray-600">
                    {new Date(log.created_at).toLocaleString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}