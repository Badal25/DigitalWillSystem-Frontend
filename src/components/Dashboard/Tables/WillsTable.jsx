// src/components/Dashboard/Tables/WillsTable.jsx
import { useEffect, useState } from "react";
import API from "../../../services/api";

const WillsTable = ({ reload }) => {
  const [wills, setWills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all wills
  const fetchWills = async () => {
    try {
      setLoading(true);
      const res = await API.get("/wills/get-wills");
      setWills(res.data);
    } catch (err) {
      console.error("Fetch wills error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWills();
  }, [reload]);

  // Delete will
  const deleteWill = async (id) => {
    if (!window.confirm("Delete this will?")) return;
    try {
      await API.delete(`/wills/delete-will/${id}`);
      fetchWills();
    } catch (err) {
      console.error("Delete will error:", err);
    }
  };

  // Toggle release status
  const toggleRelease = async (id) => {
    try {
      await API.patch(`/wills/toggle-release/${id}`);
      fetchWills();
    } catch (err) {
      console.error("Toggle release error:", err);
    }
  };

  // 👉 IMPORTANT FIX (LOCALHOST REMOVED)
  const BASE_URL = import.meta.env.VITE_API_URL 
    || "https://digitalwillsystem-backend.onrender.com";

  return (
    <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-6">My Wills</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-300">

          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="py-3 text-left">Will Name</th>
              <th>Nominee Name</th>
              <th>Email</th>
              <th>Relation</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td className="py-4 text-slate-400" colSpan="7">
                  Loading...
                </td>
              </tr>
            ) : wills.length === 0 ? (
              <tr>
                <td className="py-4 text-slate-500" colSpan="7">
                  No wills found
                </td>
              </tr>
            ) : (

              wills.map((will) => (
                <tr
                  key={will.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="py-3">{will.will_name}</td>
                  <td>{will.nominee_name}</td>
                  <td>{will.nominee_email}</td>
                  <td>{will.nominee_relation}</td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        will.release_to_nominee
                          ? "bg-green-600/20 text-green-400"
                          : "bg-gray-600/20 text-gray-400"
                      }`}
                    >
                      {will.release_to_nominee ? "Released" : "Pending"}
                    </span>
                  </td>

                  <td>
                    {new Date(will.created_at).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="flex gap-3 items-center">

                    <button
                      onClick={() => toggleRelease(will.id)}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-600/20 text-gray-300 hover:bg-gray-600/30"
                    >
                      Toggle
                    </button>

                    {/* FIXED: LOCALHOST → PRODUCTION URL */}
                    {will.pdf_file && (
                      <a
                        href={`${BASE_URL}/uploads/${will.pdf_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        PDF
                      </a>
                    )}

                    {will.nominee_id_file && (
                      <a
                        href={`${BASE_URL}/uploads/${will.nominee_id_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        ID
                      </a>
                    )}

                    <button
                      onClick={() => deleteWill(will.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default WillsTable;
