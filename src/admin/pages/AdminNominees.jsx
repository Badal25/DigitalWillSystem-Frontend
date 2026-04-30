// import { useEffect, useState } from "react";
// import { getAllNominees } from "../services/adminAPI";


// export default function AdminNominees() {

//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const res = await getAllNominees();
//       setData(res.data);
//     } catch (err) {
//       console.error("Fetch nominees error", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 bg-slate-900 rounded-xl">

//       <h2 className="text-xl font-bold mb-4">
//         Nominee Management (Admin)
//       </h2>

//       <table className="w-full">

//         <thead>
//           <tr className="border-b border-gray-700">
//             <th>User Email</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Relation</th>
//             <th>ID Proof</th>
//           </tr>
//         </thead>

//         <tbody>

//           {data.map((n) => (
//             <tr key={n.id} className="border-b border-gray-700">

//               <td>{n.user_email}</td>
//               <td>{n.name}</td>
//               <td>{n.email}</td>
//               <td>{n.phone}</td>
//               <td>{n.relationship}</td>

//               <td>
//                 {n.id_proof_file ? (
//                   <button
//                     className="bg-green-600 px-2 py-1 rounded"
//                     onClick={() =>
//                       window.open(
//                         // `http://localhost:5000/uploads/nominee-id/${n.id_proof_file}`,
//                         // "_blank"
//                         `http://localhost:5000/uploads/${n.id_proof_file}`,"_blank"
//                       )
//                     }
//                   >
//                     View
//                   </button>
//                 ) : "No File"}
//               </td>

//             </tr>
//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAllNominees } from "../services/adminAPI";

export default function AdminNominees() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getAllNominees();
      setData(res.data);
    } catch (err) {
      console.error("Fetch nominees error", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-slate-900 rounded-xl">

      <h2 className="text-xl font-bold mb-4 text-white">
        Nominee Management (Admin)
      </h2>

      {/* 🔄 Loading */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-400">No nominees found</p>
      ) : (

        <table className="w-full text-white">

          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="p-2">User Email</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Relation</th>
              <th className="p-2">ID Proof</th>
            </tr>
          </thead>

          <tbody>

            {data.map((n) => (
              <tr key={n.id} className="border-b border-gray-700">

                <td className="p-2">{n.user_email || "N/A"}</td>
                <td className="p-2">{n.name}</td>
                <td className="p-2">{n.email}</td>
                <td className="p-2">{n.phone}</td>
                <td className="p-2">{n.relationship}</td>

                <td className="p-2">
                  {n.id_proof_file ? (
                    <button
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      onClick={() =>
                        window.open(
                          `http://localhost:5000/uploads/${n.id_proof_file}`,
                          "_blank"
                        )
                      }
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">No File</span>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}