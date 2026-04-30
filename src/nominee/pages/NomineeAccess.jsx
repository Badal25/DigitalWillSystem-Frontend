import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineUpload, AiOutlineFilePdf, AiOutlineCheck } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NomineeAccess() {
  const { token } = useParams();

  const BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://digitalwillsystem-backend.onrender.com";

  const [status, setStatus] = useState("loading");
  const [assets, setAssets] = useState([]);
  const [files, setFiles] = useState({
    death_certificate: null,
    nominee_id: null,
    relationship_proof: null,
  });
  const [uploading, setUploading] = useState(false);

  // VERIFY TOKEN
  useEffect(() => {
    const cleanToken = token?.trim();
    if (!cleanToken) return setStatus("invalid");

    axios
      .get(`${BASE_URL}/api/nominee/verify/${cleanToken}`)
      .then((res) => setStatus(res.data?.status || "pending"))
      .catch(() => setStatus("invalid"));
  }, [token]);

  // FETCH ASSETS
  useEffect(() => {
    if (status !== "released") return;

    const cleanToken = token?.trim();

    axios
      .get(`${BASE_URL}/api/nominee/assets/${cleanToken}`)
      .then((res) => setAssets(res.data.assets || []))
      .catch(() => toast.error("Failed to fetch assets"));
  }, [status, token]);

  const handleFileChange = (e) => {
    setFiles((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  // UPLOAD
  const handleUpload = async () => {
    const { death_certificate, nominee_id, relationship_proof } = files;

    if (!death_certificate || !nominee_id || !relationship_proof) {
      return toast.warning("Please select all documents");
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("death_certificate", death_certificate);
    formData.append("nominee_id", nominee_id);
    formData.append("relationship_proof", relationship_proof);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/nominee/upload/${token.trim()}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(res.data.message);
      setStatus("under_review");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-6">Nominee Access Panel</h1>

      {/* STATUS */}
      {status === "loading" && <p>Verifying...</p>}

      {status === "invalid" && (
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded">
          Invalid or expired link
        </p>
      )}

      {status === "pending" && (
        <p className="text-yellow-700 bg-yellow-100 px-4 py-2 rounded">
          Pending approval
        </p>
      )}

      {/* UPLOAD */}
      {(status === "pending" || status === "under_review") && (
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-md mt-4">

          {["death_certificate", "nominee_id", "relationship_proof"].map((key) => (
            <label
              key={key}
              className="flex items-center gap-3 p-3 border mb-3 rounded cursor-pointer"
            >
              <AiOutlineFilePdf className="text-red-500" />
              {key}
              <input
                type="file"
                name={key}
                onChange={handleFileChange}
                className="hidden"
              />
              {files[key] && <AiOutlineCheck className="text-green-500" />}
            </label>
          ))}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* RELEASED ASSETS */}
      {status === "released" && (
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg mt-4">
          <h2 className="text-xl font-semibold mb-4">Released Assets</h2>

          {assets.length === 0 ? (
            <p>No assets available</p>
          ) : (
            assets.map((a) => (
              <div
                key={a.id}
                className="flex justify-between border-b py-2"
              >
                <span>{a.will_name}</span>

                <a
                  href={`${BASE_URL}/uploads/${a.pdf_file}`}
                  target="_blank"
                  className="text-blue-600 flex items-center gap-1"
                >
                  <AiOutlineUpload /> Download
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
