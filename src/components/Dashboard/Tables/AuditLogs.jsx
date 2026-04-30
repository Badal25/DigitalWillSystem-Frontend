// src/components/Dashboard/Tables/AuditLogs.jsx
import { useEffect, useState } from "react";
import API from "../../../services/api";
import { CSVLink } from "react-csv";
import { motion } from "framer-motion";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/audit_logs");
        setLogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.performed_by?.toString().includes(search) ||
      l.user_id?.toString().includes(search)
  );

  const openLogModal = (log) => {
    setSelectedLog(log);
    setOpenModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-slate-800 p-6"
    >
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Audit Logs</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search action / user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
          />
          <CSVLink
            data={filteredLogs}
            filename={"audit_logs_export.csv"}
            className="px-3 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition text-white"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="py-2 px-4">Action</th>
              <th className="py-2 px-4">Performed By</th>
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">Timestamp</th>
              <th className="py-2 px-4">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((l) => (
              <tr
                key={l.id}
                className="border-b border-slate-700 hover:bg-slate-800 transition"
              >
                <td className="py-2 px-4">{l.action}</td>
                <td className="py-2 px-4">{l.performed_by || "-"}</td>
                <td className="py-2 px-4">{l.user_id || "-"}</td>
                <td className="py-2 px-4">{new Date(l.timestamp).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
                    onClick={() => openLogModal(l)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} center>
        <h2 className="text-lg font-bold mb-4">Audit Log Detail</h2>
        {selectedLog && (
          <div className="space-y-4">
            <p><span className="font-semibold">Action:</span> {selectedLog.action}</p>
            <p><span className="font-semibold">Performed By:</span> {selectedLog.performed_by || "-"}</p>
            <p><span className="font-semibold">User ID:</span> {selectedLog.user_id || "-"}</p>
            <p><span className="font-semibold">Timestamp:</span> {new Date(selectedLog.timestamp).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default AuditLogs;