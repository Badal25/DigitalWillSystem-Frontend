// import { useEffect, useState } from "react";
// import AdminLayout from "../layout/AdminLayout";
// import ActionButtons from "../components/ActionButtons";
// import {
//   getDeathList,
//   verifyDocuments,
//   approveCase,
//   releaseCase,
//   rejectCase
// } from "../services/adminAPI";

// export default function DeathControl() {

//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     fetchCases();
//   }, []);

//   const fetchCases = async () => {
//     try {
//       setLoading(true);

//       const res = await getDeathList();

//       setCases(res.data);

//     } catch (error) {
//       console.error("Failed to fetch cases", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (id) => {
//     try {

//       setProcessingId(id);

//       await verifyDocuments(id);

//       alert("Documents Verified");

//       fetchCases();

//     } catch (err) {
//       alert(err.response?.data?.message || "Verification failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {

//       setProcessingId(id);

//       await approveCase(id);

//       alert("Case Approved");

//       fetchCases();

//     } catch (err) {
//       alert(err.response?.data?.message || "Approval failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleRelease = async (id) => {
//     try {

//       setProcessingId(id);

//       await releaseCase(id);

//       alert("Assets Released");

//       fetchCases();

//     } catch (err) {
//       alert(err.response?.data?.message || "Release failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const handleReject = async (id) => {
//     try {

//       setProcessingId(id);

//       await rejectCase(id);

//       alert("Case Rejected");

//       fetchCases();

//     } catch (err) {
//       alert(err.response?.data?.message || "Reject failed");
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   return (
    

//       <div className="p-6">

//         <h1 className="text-2xl font-bold mb-6">
//           Death Verification Control
//         </h1>

//         {loading ? (
//           <div className="text-gray-500">
//             Loading cases...
//           </div>
//         ) : (

//           <div className="overflow-x-auto">

//             <table className="w-full bg-white shadow rounded">

//               <thead className="bg-gray-200">

//                 <tr>

//                   <th className="p-3 text-left">ID</th>
//                   <th>Email</th>
//                   <th>Will ID</th>
//                   <th>Status</th>
//                   <th>Nominee Declared</th>
//                   <th>Fraud Flag</th>
//                   <th>Document</th>
//                   <th>Actions</th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {cases.map((item) => (

//                   <tr
//                     key={item.id}
//                     className="border-t hover:bg-gray-50"
//                   >

//                     <td className="p-3">{item.id}</td>

//                     <td>{item.email}</td>

//                     <td>{item.will_id}</td>

//                     <td>

//                       <span className="px-2 py-1 bg-gray-100 rounded text-sm">
//                         {item.status}
//                       </span>

//                     </td>

//                     <td>
//                       {item.nominee_declared ? "Yes" : "No"}
//                     </td>

//                     <td>
//                       {item.fraud_flag ? (
//                         <span className="text-red-600 font-bold">
//                           Flagged
//                         </span>
//                       ) : (
//                         "Clear"
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
//                           View
//                         </a>

//                       ) : (
//                         "No File"
//                       )}

//                     </td>

//                     <td className="space-x-2">

//                       <button
//                         disabled={processingId === item.id}
//                         onClick={() => handleVerify(item.id)}
//                         className="bg-blue-600 text-white px-2 py-1 rounded"
//                       >
//                         Verify
//                       </button>

//                       <button
//                         disabled={processingId === item.id}
//                         onClick={() => handleApprove(item.id)}
//                         className="bg-green-600 text-white px-2 py-1 rounded"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         disabled={processingId === item.id}
//                         onClick={() => handleRelease(item.id)}
//                         className="bg-purple-600 text-white px-2 py-1 rounded"
//                       >
//                         Release
//                       </button>

//                       <button
//                         disabled={processingId === item.id}
//                         onClick={() => handleReject(item.id)}
//                         className="bg-red-600 text-white px-2 py-1 rounded"
//                       >
//                         Reject
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
import AdminLayout from "../layout/AdminLayout";
import ActionButtons from "../components/ActionButtons";
import {
  getDeathList,
  verifyDocuments,
  approveCase,
  releaseCase,
  rejectCase
} from "../services/adminAPI";

export default function DeathControl() {

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);

      const res = await getDeathList();

      setCases(res.data);

    } catch (error) {
      console.error("Failed to fetch cases", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleVerify = async (id) => {
  //   try {

  //     setProcessingId(id);

  //     await verifyDocuments(id);

  //     alert("Documents Verified");

  //     fetchCases();

  //   } catch (err) {
  //     alert(err.response?.data?.message || "Verification failed");
  //   } finally {
  //     setProcessingId(null);
  //   }
  // };

  const handleVerify = async (id) => {
  try {
    setProcessingId(id);

    const res = await verifyDocuments(id); // api call
    alert(res.data.message || "Documents Verified");

    fetchCases(); // reload table

  } catch (err) {
    alert(err.response?.data?.message || "Verification failed");
  } finally {
    setProcessingId(null);
  }
};

  const handleApprove = async (id) => {
    try {

      setProcessingId(id);

      await approveCase(id);

      alert("Case Approved");

      fetchCases();

    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleRelease = async (id) => {
    try {

      setProcessingId(id);

      await releaseCase(id);

      alert("Assets Released");

      fetchCases();

    } catch (err) {
      alert(err.response?.data?.message || "Release failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {

      setProcessingId(id);

      await rejectCase(id);

      alert("Case Rejected");

      fetchCases();

    } catch (err) {
      alert(err.response?.data?.message || "Reject failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (

      <div className="p-8 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Death Verification Control
        </h1>

        {loading ? (

          <div className="text-gray-500 text-lg">
            Loading cases...
          </div>

        ) : (

          <div className="overflow-x-auto bg-white shadow-xl rounded-xl border">

            <table className="w-full text-sm">

              <thead className="bg-gray-900 text-white">

                <tr>

                  <th className="p-4 text-left">ID</th>
                  <th>Email</th>
                  <th>Will ID</th>
                  <th>Status</th>
                  <th>Nominee Declared</th>
                  <th>Fraud Flag</th>
                  <th>Document</th>
                  <th>Actions</th>

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

                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {item.status}
                      </span>

                    </td>

                    <td>

                      {item.nominee_declared ? (
                        <span className="text-green-600 font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          No
                        </span>
                      )}

                    </td>

                    <td>

                      {item.fraud_flag ? (
                        <span className="text-red-600 font-bold">
                          ⚠ Flagged
                        </span>
                      ) : (
                        <span className="text-green-600">
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
                          View File
                        </a>

                      ) : (

                        <span className="text-gray-400">
                          No File
                        </span>

                      )}

                    </td>

                    <td className="space-x-2">

                      <button
                        disabled={processingId === item.id}
                        onClick={() => handleVerify(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                      >
                        Verify
                      </button>

                      <button
                        disabled={processingId === item.id}
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                      >
                        Approve
                      </button>

                      <button
                        disabled={processingId === item.id}
                        onClick={() => handleRelease(item.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                      >
                        Release
                      </button>

                      <button
                        disabled={processingId === item.id}
                        onClick={() => handleReject(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs shadow"
                      >
                        Reject
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