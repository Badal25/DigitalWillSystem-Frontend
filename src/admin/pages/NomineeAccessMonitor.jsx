// import { useEffect, useState } from "react";
// import AdminLayout from "../layout/AdminLayout";
// import API from "../services/adminAPI";

// export default function NomineeAccessMonitor() {

//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAccessLogs();
//   }, []);

//   const fetchAccessLogs = async () => {

//     try {

//       const res = await API.get("/nominee-access");

//       setRecords(res.data);

//     } catch (err) {

//       console.error("Error fetching nominee access logs", err);
//       alert("Failed to load access logs");

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (


//       <div className="p-6">

//         <h1 className="text-2xl font-bold mb-6">
//           Nominee Access Monitor
//         </h1>

//         {loading ? (

//           <p className="text-gray-500">
//             Loading access records...
//           </p>

//         ) : records.length === 0 ? (

//           <p className="text-gray-500">
//             No nominee access found.
//           </p>

//         ) : (

//           <div className="overflow-x-auto">

//             <table className="w-full bg-white shadow rounded">

//               <thead className="bg-gray-200">

//                 <tr>
//                   <th className="p-3 text-left">ID</th>
//                   <th>Email</th>
//                   <th>Status</th>
//                   <th>Token Expiry</th>
//                   <th>Access Token</th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {records.map((r) => (

//                   <tr
//                     key={r.id}
//                     className="border-t hover:bg-gray-50"
//                   >

//                     <td className="p-3">
//                       {r.id}
//                     </td>

//                     <td>
//                       {r.email}
//                     </td>

//                     <td>

//                       <span
//                         className={
//                           r.status === "released"
//                             ? "text-green-600 font-semibold"
//                             : r.status === "pending"
//                             ? "text-yellow-600 font-semibold"
//                             : "text-gray-600"
//                         }
//                       >
//                         {r.status}
//                       </span>

//                     </td>

//                     <td>
//                       {new Date(r.token_expiry).toLocaleString()}
//                     </td>

//                     <td>

//                       <span className="text-xs text-gray-500">
//                         {r.access_token
//                           ? r.access_token.substring(0, 10) + "..."
//                           : "N/A"}
//                       </span>

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

export default function NomineeAccessMonitor() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessLogs();
  }, []);

  const fetchAccessLogs = async () => {
    try {
      const res = await API.get("/nominee-access");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching nominee access logs", err);
      alert("Failed to load access logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Nominee Access Monitor
      </h1>

      {loading ? (
        <div className="text-gray-500 text-lg">
          Loading access records...
        </div>
      ) : records.length === 0 ? (
        <p className="text-gray-500">
          No nominee access found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl border">

          <table className="w-full text-sm">

            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th>Email</th>
                <th>Status</th>
                <th>Token Expiry</th>
                <th>Access Token</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr
                  key={r.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-semibold text-gray-700">
                    #{r.id}
                  </td>

                  <td className="text-gray-600">{r.email}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        r.status === "released"
                          ? "bg-green-100 text-green-600"
                          : r.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="text-gray-700">
                    {new Date(r.token_expiry).toLocaleString()}
                  </td>

                  <td>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-mono">
                      {r.access_token
                        ? r.access_token.substring(0, 10) + "..."
                        : "N/A"}
                    </span>
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