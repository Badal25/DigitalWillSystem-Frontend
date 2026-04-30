import { useState } from "react";
import API from "../../../services/api";

const AddWillForm = ({ onSuccess }) => {
  const [willName, setWillName] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [nomineeName, setNomineeName] = useState("");
  const [nomineeEmail, setNomineeEmail] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [idProofFile, setIdProofFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile || !idProofFile) {
      alert("Please upload both Will PDF and Nominee ID proof.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("will_name", willName);
      formData.append("extracted_text", extractedText);
      formData.append("pdf_file", pdfFile);
      formData.append("nominee_name", nomineeName);
      formData.append("nominee_email", nomineeEmail);
      formData.append("nominee_relation", nomineeRelation);
      formData.append("id_proof_file", idProofFile);

      await API.post("/wills/add-will-with-nominee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setWillName("");
      setExtractedText("");
      setPdfFile(null);
      setNomineeName("");
      setNomineeEmail("");
      setNomineeRelation("");
      setIdProofFile(null);

      // Trigger parent success reload
      onSuccess();

      alert("Will + Nominee added successfully!");
    } catch (err) {
      console.error("Add Will Error:", err);
      alert("Failed to add will. Check console for details.");
    }
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 mb-6">
      <h2 className="text-xl text-white font-semibold mb-6">
        Add New Will
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Will Details */}
        <input
          type="text"
          placeholder="Will Name"
          value={willName}
          onChange={(e) => setWillName(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-white"
          required
        />

        <textarea
          placeholder="Will Text / Extracted Text"
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-white"
          rows={4}
          required
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          className="text-slate-300"
          required
        />

        {/* Nominee Details */}
        <h3 className="text-white font-semibold mt-4">Nominee Details</h3>

        <input
          type="text"
          placeholder="Nominee Name"
          value={nomineeName}
          onChange={(e) => setNomineeName(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-white"
          required
        />

        <input
          type="email"
          placeholder="Nominee Email"
          value={nomineeEmail}
          onChange={(e) => setNomineeEmail(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-white"
          required
        />

        <input
          type="text"
          placeholder="Relation with Nominee"
          value={nomineeRelation}
          onChange={(e) => setNomineeRelation(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 p-3 rounded text-white"
        />

        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={(e) => setIdProofFile(e.target.files[0])}
          className="text-slate-300"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Will
        </button>
      </form>
    </div>
  );
};

export default AddWillForm;

