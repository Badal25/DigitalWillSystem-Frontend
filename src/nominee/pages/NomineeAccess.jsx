// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { AiOutlineUpload, AiOutlineFilePdf } from "react-icons/ai";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function NomineeAccess() {
//   const { token } = useParams();
//   const [status, setStatus] = useState("loading"); // loading, pending, under_review, released, invalid
//   const [assets, setAssets] = useState([]);
//   const [files, setFiles] = useState({
//     death_certificate: null,
//     nominee_id: null,
//     relationship_proof: null,
//   });
//   const [uploading, setUploading] = useState(false);

//   // Verify token on mount
//   useEffect(() => {
//     const cleanToken = token?.trim();
//     if (!cleanToken) return setStatus("invalid");

//     axios
//       .get(`http://localhost:5000/api/nominee/verify/${cleanToken}`)
//       .then((res) => {
//         const st = res.data?.status || "pending";
//         // If status pending, show upload form
//         if (st === "pending") setStatus("pending");
//         else if (st === "under_review") setStatus("under_review");
//         else if (st === "released") setStatus("released");
//         else setStatus("invalid");
//       })
//       .catch(() => setStatus("invalid"));
//   }, [token]);

//   // Fetch assets only when released
//   useEffect(() => {
//     if (status !== "released") return;

//     const cleanToken = token?.trim();
//     axios
//       .get(`http://localhost:5000/api/nominee/assets/${cleanToken}`)
//       .then((res) => setAssets(res.data.assets || []))
//       .catch(() => toast.error("Failed to fetch assets"));
//   }, [status, token]);

//   const handleFileChange = (e) => {
//     setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
//   };

//   const handleUpload = async () => {
//     const { death_certificate, nominee_id, relationship_proof } = files;
//     if (!death_certificate || !nominee_id || !relationship_proof) {
//       return toast.warning("Please select all documents before uploading");
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("death_certificate", death_certificate);
//     formData.append("nominee_id", nominee_id);
//     formData.append("relationship_proof", relationship_proof);

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/nominee/upload/${token.trim()}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       toast.success(res.data.message);
//       setStatus("under_review"); // After upload
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 flex flex-col items-center p-6">
//       <ToastContainer />
//       <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Nominee Access Panel</h1>

//       {status === "loading" && <p className="text-gray-600 animate-pulse">Verifying secure link...</p>}

//       {status === "invalid" && (
//         <p className="text-red-600 bg-red-100 px-4 py-3 rounded shadow-md">
//           Invalid or expired link. Contact support.
//         </p>
//       )}

//       {(status === "pending") && (
//         <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Documents</h2>
//           <p className="text-gray-600 mb-3">
//             Your access is pending. Please upload the required documents to continue.
//           </p>
//           <div className="flex flex-col gap-4">
//             <label className="flex items-center gap-3 bg-gray-50 p-2 rounded hover:bg-gray-100 cursor-pointer">
//               <AiOutlineFilePdf className="text-red-500 text-xl" />
//               Death Certificate
//               <input type="file" name="death_certificate" onChange={handleFileChange} className="hidden" />
//             </label>
//             <label className="flex items-center gap-3 bg-gray-50 p-2 rounded hover:bg-gray-100 cursor-pointer">
//               <AiOutlineFilePdf className="text-blue-500 text-xl" />
//               Nominee ID Proof
//               <input type="file" name="nominee_id" onChange={handleFileChange} className="hidden" />
//             </label>
//             <label className="flex items-center gap-3 bg-gray-50 p-2 rounded hover:bg-gray-100 cursor-pointer">
//               <AiOutlineFilePdf className="text-green-500 text-xl" />
//               Relationship Proof
//               <input type="file" name="relationship_proof" onChange={handleFileChange} className="hidden" />
//             </label>
//             <button
//               onClick={handleUpload}
//               disabled={uploading}
//               className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
//             >
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//         </div>
//       )}

//       {status === "under_review" && (
//         <p className="text-yellow-800 bg-yellow-100 px-4 py-3 rounded shadow-md">
//           Documents uploaded. Awaiting admin approval.
//         </p>
//       )}

//       {status === "released" && (
//         <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg mt-4">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Released Assets</h2>
//           {assets.length === 0 && <p className="text-gray-600">No assets available</p>}
//           <ul className="flex flex-col gap-3">
//             {assets.map((a) => (
//               <li
//                 key={a.id}
//                 className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
//               >
//                 <span className="font-medium text-gray-700">{a.will_name}</span>
//                 <a
//                   href={`http://localhost:5000/uploads/${a.pdf_file}`}
//                   target="_blank"
//                   className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
//                 >
//                   <AiOutlineUpload /> View
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineUpload, AiOutlineFilePdf, AiOutlineCheck } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NomineeAccess() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading, pending, under_review, released, invalid
  const [assets, setAssets] = useState([]);
  const [files, setFiles] = useState({
    death_certificate: null,
    nominee_id: null,
    relationship_proof: null,
  });
  const [uploading, setUploading] = useState(false);

  // Verify token on mount
  useEffect(() => {
    const cleanToken = token?.trim() || "";
    if (!cleanToken) return setStatus("invalid");

    axios
      .get(`http://localhost:5000/api/nominee/verify/${cleanToken}`)
      .then((res) => setStatus(res.data?.status || "pending"))
      .catch(() => setStatus("invalid"));
  }, [token]);

  // Fetch released assets if status is released
  useEffect(() => {
    if (status !== "released") return;

    const cleanToken = token?.trim() || "";
    axios
      .get(`http://localhost:5000/api/nominee/assets/${cleanToken}`)
      .then((res) => setAssets(res.data.assets || []))
      .catch(() => toast.error("Failed to fetch assets"));
  }, [status, token]);

  const handleFileChange = (e) => {
    setFiles((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleUpload = async () => {
    const { death_certificate, nominee_id, relationship_proof } = files;
    if (!death_certificate || !nominee_id || !relationship_proof) {
      return toast.warning("Please select all documents before upload");
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("death_certificate", death_certificate);
    formData.append("nominee_id", nominee_id);
    formData.append("relationship_proof", relationship_proof);

    const cleanToken = token?.trim() || "";

    try {
      const res = await axios.post(
        `http://localhost:5000/api/nominee/upload/${cleanToken}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(res.data.message);
      setStatus("under_review");
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    under_review: "bg-blue-100 text-blue-800",
    released: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    pending: "Pending",
    under_review: "Under Review",
    released: "Released",
    expired: "Expired",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      <ToastContainer position="top-right" autoClose={4000} />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nominee Access Panel</h1>

      {/* STATUS CARD */}
      {status !== "loading" && status !== "invalid" && (
        <div className="mb-6 w-full max-w-md bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-700">Your Status:</p>
            <span className={`px-3 py-1 rounded-full font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          {status === "released" && <p className="text-gray-500 text-sm">Valid for 24 hours</p>}
        </div>
      )}

      {/* LOADING / INVALID / PENDING MESSAGES */}
      {status === "loading" && <p className="text-gray-500 animate-pulse">Verifying your link...</p>}
      {status === "invalid" && (
        <p className="text-red-600 bg-red-100 px-4 py-3 rounded shadow-md">
          Invalid or expired link. Contact support.
        </p>
      )}
      {status === "pending" && (
        <p className="text-yellow-800 bg-yellow-100 px-4 py-3 rounded shadow-md">
          Your access is pending. Please wait for admin approval.
        </p>
      )}

      {/* FILE UPLOAD */}
      {(status === "pending" || status === "under_review") && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Required Documents</h2>

          <div className="flex flex-col gap-4">
            {["death_certificate", "nominee_id", "relationship_proof"].map((key) => (
              <label
                key={key}
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 relative"
              >
                <AiOutlineFilePdf className="text-2xl text-blue-500" />
                <span className="flex-1 text-gray-800 font-medium">{key.replace("_", " ").toUpperCase()}</span>
                <input type="file" name={key} onChange={handleFileChange} className="hidden" />
                {files[key] && <AiOutlineCheck className="text-green-500 text-xl absolute right-3" />}
              </label>
            ))}

            <button
              onClick={handleUpload}
              disabled={uploading || !files.death_certificate || !files.nominee_id || !files.relationship_proof}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-2 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Documents"}
            </button>
          </div>
        </div>
      )}

      {/* ASSETS TABLE */}
      {/* {status === "released" && (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Released Assets</h2>
          {assets.length === 0 && <p className="text-gray-500">No assets available.</p>}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">File Name</th>
                  <th className="px-4 py-2 text-left text-gray-700">Type</th>
                  <th className="px-4 py-2 text-left text-gray-700">Download</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, idx) => (
                  <tr
                    key={a.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2">{a.will_name}</td>
                    <td className="px-4 py-2">{a.pdf_file?.split(".").pop().toUpperCase()}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`http://localhost:5000/uploads/${a.pdf_file}`}
                        target="_blank"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        <AiOutlineUpload /> Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}

      {/* ASSETS TABLE */}
{status === "released" && (
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Released Assets</h2>
    {assets.length === 0 && <p className="text-gray-500">No assets available.</p>}
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700">File Name</th>
            <th className="px-4 py-2 text-left text-gray-700">Type</th>
            <th className="px-4 py-2 text-left text-gray-700">Download</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a, idx) => (
            <tr
              key={a.id}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
            >
              <td className="px-4 py-2 font-medium text-gray-700">{a.will_name}</td>
              <td className="px-4 py-2 text-gray-600 font-semibold">
                {a.pdf_file?.split(".").pop().toUpperCase()}
              </td>
              <td className="px-4 py-2">
                <a
                  href={`http://localhost:5000/uploads/${a.pdf_file}`}
                  target="_blank"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <AiOutlineUpload /> Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
    </div>
  );
}