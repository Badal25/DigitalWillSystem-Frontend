// import { useEffect, useState } from "react";
// import AdminLayout from "../layout/AdminLayout";
// import { getDeathList, verifyDocuments } from "../services/adminAPI";

// export default function PendingVerifications() {

//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     fetchPendingCases();
//   }, []);

//   const fetchPendingCases = async () => {
//     try {

//       const res = await getDeathList();

//       const pending = res.data.filter(
//         (item) => item.status === "pending"
//       );

//       setCases(pending);

//     } catch (err) {
//       console.error("Error loading pending cases", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (id) => {

//     try {

//       setProcessingId(id);

//       await verifyDocuments(id);

//       alert("Documents verified successfully");

//       fetchPendingCases();

//     } catch (err) {

//       alert(
//         err.response?.data?.message ||
//         "Verification failed"
//       );

//     } finally {

//       setProcessingId(null);

//     }

//   };

//   return (


//       <div className="p-6">

//         <h1 className="text-2xl font-bold mb-6">
//           Pending Death Verifications
//         </h1>

//         {loading ? (

//           <p className="text-gray-500">
//             Loading pending cases...
//           </p>

//         ) : cases.length === 0 ? (

//           <p className="text-gray-500">
//             No pending verifications found.
//           </p>

//         ) : (

//           <div className="overflow-x-auto">

//             <table className="w-full bg-white shadow rounded">

//               <thead className="bg-gray-200">

//                 <tr>

//                   <th className="p-3 text-left">ID</th>
//                   <th>Email</th>
//                   <th>Will ID</th>
//                   <th>Fraud Flag</th>
//                   <th>Document</th>
//                   <th>Action</th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {cases.map((item) => (

//                   <tr
//                     key={item.id}
//                     className="border-t hover:bg-gray-50"
//                   >

//                     <td className="p-3">
//                       {item.id}
//                     </td>

//                     <td>
//                       {item.email}
//                     </td>

//                     <td>
//                       {item.will_id}
//                     </td>

//                     <td>

//                       {item.fraud_flag ? (

//                         <span className="text-red-600 font-bold">
//                           ⚠ Fraud Flag
//                         </span>

//                       ) : (

//                         <span className="text-green-600">
//                           Clear
//                         </span>

//                       )}

//                     </td>

//                     <td>

//                       {item.verification_document ? (

//                         <a
//                           href={`http://localhost:5000/${item.verification_document}`}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-blue-600 underline"
//                         >
//                           View Document
//                         </a>

//                       ) : (

//                         "No File"

//                       )}

//                     </td>

//                     <td>

//                       <button
//                         disabled={processingId === item.id}
//                         onClick={() => handleVerify(item.id)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         Verify
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



// import { useEffect, useState } from "react";
// import { getDeathList, verifyDocuments } from "../services/adminAPI";

// export default function PendingVerifications() {

//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     fetchPendingCases();
//   }, []);

//   const fetchPendingCases = async () => {
//     try {

//       const res = await getDeathList();

//       const pending = res.data.filter(
//         (item) => item.status === "pending"
//       );

//       setCases(pending);

//     } catch (err) {
//       console.error("Error loading pending cases", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (id) => {

//     try {

//       setProcessingId(id);

//       await verifyDocuments(id);

//       alert("Documents verified successfully");

//       fetchPendingCases();

//     } catch (err) {

//       alert(
//         err.response?.data?.message ||
//         "Verification failed"
//       );

//     } finally {

//       setProcessingId(null);

//     }

//   };

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6 text-gray-100">
//         Pending Death Verifications
//       </h1>

//       {loading ? (

//         <p className="text-gray-400">
//           Loading pending cases...
//         </p>

//       ) : cases.length === 0 ? (

//         <p className="text-gray-400">
//           No pending verifications found.
//         </p>

//       ) : (

//         <div className="overflow-x-auto bg-gray-900 rounded-lg shadow">

//           <table className="w-full text-sm text-left text-gray-300">

//             <thead className="bg-gray-800 text-gray-200">

//               <tr>

//                 <th className="p-3">ID</th>
//                 <th>Email</th>
//                 <th>Will ID</th>
//                 <th>Fraud Flag</th>
//                 <th>Document</th>
//                 <th>Action</th>

//               </tr>

//             </thead>

//             <tbody>

//               {cases.map((item) => (

//                 <tr
//                   key={item.id}
//                   className="border-t border-gray-700 hover:bg-gray-800 transition"
//                 >

//                   <td className="p-3">
//                     {item.id}
//                   </td>

//                   <td>
//                     {item.email}
//                   </td>

//                   <td>
//                     {item.will_id}
//                   </td>

//                   <td>

//                     {item.fraud_flag ? (

//                       <span className="text-red-500 font-semibold">
//                         ⚠ Fraud
//                       </span>

//                     ) : (

//                       <span className="text-green-400">
//                         Clear
//                       </span>

//                     )}

//                   </td>

//                   <td>

//                     {item.verification_document ? (

//                       <a
//                         href={`http://localhost:5000/${item.verification_document}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-400 underline"
//                       >
//                         View
//                       </a>

//                     ) : (
//                       "No File"
//                     )}

//                   </td>

//                   <td>

//                     <button
//                       disabled={processingId === item.id}
//                       onClick={() => handleVerify(item.id)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
//                     >
//                       Verify
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       )}

//     </div>

//   );

// }


import { useEffect, useState } from "react";
import { getDeathList, verifyDocuments } from "../services/adminAPI";

export default function PendingVerifications() {

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingCases();
  }, []);

  const fetchPendingCases = async () => {
    try {
      const res = await getDeathList();
      const pending = res.data.filter(
        (item) => item.status === "pending"
      );
      setCases(pending);
    } catch (err) {
      console.error("Error loading pending cases", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      setProcessingId(id);
      await verifyDocuments(id);
      alert("Documents verified successfully");
      fetchPendingCases();
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Pending Death Verifications
      </h1>

      {loading ? (
        <div className="text-gray-500 text-lg">
          Loading pending cases...
        </div>
      ) : cases.length === 0 ? (
        <p className="text-gray-500">
          No pending verifications found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl border">

          <table className="w-full text-sm">

            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th>Email</th>
                <th>Will ID</th>
                <th>Fraud Flag</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cases.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-semibold text-gray-700">
                    #{item.id}
                  </td>

                  <td className="text-gray-600">
                    {item.email}
                  </td>

                  <td className="text-gray-700">
                    {item.will_id}
                  </td>

                  <td>
                    {item.fraud_flag ? (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                        ⚠ Fraud Flag
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                        Clear
                      </span>
                    )}
                  </td>

                  <td>
                    {item.verification_document ? (
                      <a
                        href={`http://localhost:5000/${item.verification_document}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200"
                      >
                        View Document
                      </a>
                    ) : (
                      <span className="text-gray-400">No File</span>
                    )}
                  </td>

                  <td>
                    <button
                      disabled={processingId === item.id}
                      onClick={() => handleVerify(item.id)}
                      className={`px-3 py-1 rounded-lg text-xs shadow text-white font-medium transition-all duration-200
                        ${processingId === item.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      {processingId === item.id ? "Verifying..." : "Verify"}
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