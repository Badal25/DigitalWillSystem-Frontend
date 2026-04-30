// import { useEffect, useState } from "react";
// import AdminLayout from "../layout/AdminLayout";
// import { getInactiveUsers, notifyNominee } from "../services/adminAPI";

// export default function InactiveAccounts() {

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     fetchInactiveUsers();
//   }, []);

//   const fetchInactiveUsers = async () => {
//     try {

//       const res = await getInactiveUsers();
//       setUsers(res.data);

//     } catch (err) {

//       console.error("Failed to load inactive users", err);
//       alert("Error loading inactive users");

//     } finally {

//       setLoading(false);

//     }
//   };

//   const handleNotify = async (id) => {

//     try {

//       setProcessingId(id);

//       await notifyNominee(id);

//       alert("Nominee notified successfully");

//       fetchInactiveUsers();

//     } catch (err) {

//       alert(
//         err.response?.data?.message ||
//         "Failed to notify nominee"
//       );

//     } finally {

//       setProcessingId(null);

//     }

//   };

//   return (

//       <div className="p-6">

//         <h1 className="text-2xl font-bold mb-6">
//           Inactive Accounts
//         </h1>

//         {loading ? (

//           <p className="text-gray-500">
//             Loading inactive users...
//           </p>

//         ) : users.length === 0 ? (

//           <p className="text-gray-500">
//             No inactive accounts found.
//           </p>

//         ) : (

//           <div className="overflow-x-auto">

//             <table className="w-full bg-white shadow rounded">

//               <thead className="bg-gray-200">

//                 <tr>
//                   <th className="p-3 text-left">User ID</th>
//                   <th>Email</th>
//                   <th>Last Login</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {users.map((user) => (

//                   <tr
//                     key={user.id}
//                     className="border-t hover:bg-gray-50"
//                   >

//                     <td className="p-3">
//                       {user.id}
//                     </td>

//                     <td>
//                       {user.email}
//                     </td>

//                     <td>
//                       {user.last_login
//                         ? new Date(user.last_login).toLocaleDateString()
//                         : "Never"}
//                     </td>

//                     <td>

//                       <span className="text-red-600 font-semibold">
//                         {user.account_status}
//                       </span>

//                     </td>

//                     <td>

//                       <button
//                         disabled={processingId === user.id}
//                         onClick={() => handleNotify(user.id)}
//                         className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
//                       >

//                         {processingId === user.id
//                           ? "Sending..."
//                           : "Notify Nominee"}

//                       </button>

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
import { getInactiveUsers, notifyNominee } from "../services/adminAPI";

export default function InactiveAccounts() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchInactiveUsers();
  }, []);

  const fetchInactiveUsers = async () => {
    try {
      const res = await getInactiveUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load inactive users", err);
      alert("Error loading inactive users");
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async (id) => {
    try {
      setProcessingId(id);
      await notifyNominee(id);
      alert("Nominee notified successfully");
      fetchInactiveUsers();
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to notify nominee"
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Inactive Accounts
      </h1>

      {loading ? (
        <div className="text-gray-500 text-lg">
          Loading inactive users...
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500">
          No inactive accounts found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl border">

          <table className="w-full text-sm">

            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">User ID</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-semibold text-gray-700">
                    #{user.id}
                  </td>

                  <td className="text-gray-600">
                    {user.email}
                  </td>

                  <td className="text-gray-700">
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString()
                      : "Never"}
                  </td>

                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.account_status.toLowerCase() === "inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {user.account_status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <button
                      disabled={processingId === user.id}
                      onClick={() => handleNotify(user.id)}
                      className={`px-3 py-1 rounded-lg text-xs shadow text-white font-medium transition-all duration-200
                        ${processingId === user.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                        }`}
                    >
                      {processingId === user.id ? "Sending..." : "Notify Nominee"}
                    </button>
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