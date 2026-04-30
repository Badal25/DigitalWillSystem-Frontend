import { useEffect, useState } from "react";
import { getAllNominees } from "../services/adminAPI";

const BASE_URL = "https://digitalwillsystem-backend.onrender.com";

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

                {/* DOCUMENT VIEW FIXED */}
                <td className="p-2">
                  {n.id_proof_file ? (
                    <button
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      onClick={() =>
                        window.open(
                          `${BASE_URL}/uploads/${n.id_proof_file}`,
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
