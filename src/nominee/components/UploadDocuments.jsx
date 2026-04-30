import { useState } from "react";
import { uploadDocuments } from "../services/nomineeAPI";

export default function UploadDocuments({ token }) {
  const [files, setFiles] = useState({
    death_certificate: null,
    nominee_id: null,
    relationship_proof: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("death_certificate", files.death_certificate);
    formData.append("nominee_id", files.nominee_id);
    formData.append("relationship_proof", files.relationship_proof);

    try {
      const res = await uploadDocuments(token, formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Upload Documents</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="file" name="death_certificate" onChange={handleChange} />
        <input type="file" name="nominee_id" onChange={handleChange} />
        <input type="file" name="relationship_proof" onChange={handleChange} />
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Upload
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}