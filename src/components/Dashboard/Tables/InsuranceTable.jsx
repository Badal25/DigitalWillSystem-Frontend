
// import { useEffect, useState } from "react";
// import API from "../../../services/api";
// import { CSVLink } from "react-csv";
// import { motion } from "framer-motion";
// import { Pencil, Trash2 } from "lucide-react";
// import AddInsurance from "./AddInsurance";

// const InsuranceTable = () => {
//   const [policies, setPolicies] = useState([]);
//   const [search, setSearch] = useState("");

//   const fetchPolicies = async () => {
//     try {
//       const res = await API.get("/insurance/get-policies");
//       setPolicies(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/insurance/delete-policy/${id}`);
//       fetchPolicies();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const filtered = policies.filter(
//     (p) =>
//       p.policy_name?.toLowerCase().includes(search.toLowerCase()) ||
//       p.nominee_name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPremium = policies.reduce(
//     (acc, curr) => acc + Number(curr.premium_amount || 0),
//     0
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="bg-slate-950 min-h-screen p-8 text-white"
//     >
//       {/* Add Form */}
//       <AddInsurance refresh={fetchPolicies} />

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10">
//         <Card title="Total Policies" value={policies.length} />
//         <Card title="Total Premium" value={`₹ ${totalPremium}`} />
//         <Card title="Active Policies" value={policies.length} />
//       </div>

//       {/* Search + Export */}
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search policy..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl"
//         />
//         <CSVLink
//           data={filtered}
//           filename="insurance_export.csv"
//           className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-700"
//         >
//           Export CSV
//         </CSVLink>
//       </div>

//       {/* Table */}
//       <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-800 text-slate-400 text-sm">
//             <tr>
//               <th className="p-4">Policy</th>
//               <th>Company</th>
//               <th>Nominee</th>
//               <th>Premium</th>
//               <th>Status</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((p) => (
//               <tr
//                 key={p.id}
//                 className="border-t border-slate-800 hover:bg-slate-800/40 transition"
//               >
//                 <td className="p-4 font-medium">{p.policy_name}</td>
//                 <td>{p.company_name}</td>
//                 <td>{p.nominee_name}</td>
//                 <td>₹ {p.premium_amount}</td>
//                 <td>
//                   <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
//                     Active
//                   </span>
//                 </td>
//                 <td className="flex justify-center gap-3 py-3">
//                   <Pencil size={16} className="cursor-pointer text-blue-400" />
//                   <Trash2
//                     size={16}
//                     onClick={() => handleDelete(p.id)}
//                     className="cursor-pointer text-red-400"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
//     <p className="text-slate-400 text-sm">{title}</p>
//     <h3 className="text-2xl font-semibold mt-2">{value}</h3>
//   </div>
// );

// export default InsuranceTable;


// import { useEffect, useState } from "react";
// import API from "../../../services/api";
// import { CSVLink } from "react-csv";
// import { motion, AnimatePresence } from "framer-motion";
// import { Pencil, Trash2, Plus, Upload } from "lucide-react";

// const InsuranceTable = () => {
//   const [policies, setPolicies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [open, setOpen] = useState(false);
//   const [file, setFile] = useState(null);

//   const [form, setForm] = useState({
//     policy_name: "",
//     company_name: "",
//     policy_number: "",
//     nominee_name: "",
//     premium_amount: "",
//     maturity_date: "",
//   });

//   const fetchPolicies = async () => {
//     try {
//       const res = await API.get("/insurance/get-policies");
//       setPolicies(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleDelete = async (id) => {
//     await API.delete(`/insurance/delete-policy/${id}`);
//     fetchPolicies();
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/insurance/add-policy", form);
//     setOpen(false);
//     fetchPolicies();
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Select PDF");

//     const formData = new FormData();
//     formData.append("file", file);

//     await API.post("/insurance/upload-policy", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setFile(null);
//     fetchPolicies();
//   };

//   const filtered = policies.filter(
//     (p) =>
//       p.policy_name?.toLowerCase().includes(search.toLowerCase()) ||
//       p.nominee_name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPremium = policies.reduce(
//     (acc, curr) => acc + Number(curr.premium_amount || 0),
//     0
//   );

//   const getStatus = (date) => {
//     if (!date) return "Unknown";
//     return new Date(date) < new Date() ? "Expired" : "Active";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="bg-slate-950 min-h-screen p-8 text-white"
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-semibold">Insurance Policies</h2>
//         <button
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
//         >
//           <Plus size={18} />
//           Add Policy
//         </button>
//       </div>

//       {/* Add Section */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10"
//           >
//             {/* Manual Form */}
//             <form
//               onSubmit={handleManualSubmit}
//               className="grid md:grid-cols-3 gap-4 mb-6"
//             >
//               <Input name="policy_name" placeholder="Policy Name" onChange={handleChange} />
//               <Input name="company_name" placeholder="Company Name" onChange={handleChange} />
//               <Input name="policy_number" placeholder="Policy Number" onChange={handleChange} />
//               <Input name="nominee_name" placeholder="Nominee Name" onChange={handleChange} />
//               <Input name="premium_amount" type="number" placeholder="Premium" onChange={handleChange} />
//               <Input name="maturity_date" type="date" onChange={handleChange} />

//               <button className="col-span-3 bg-green-600 py-2 rounded-lg hover:bg-green-700 transition">
//                 Save Manually
//               </button>
//             </form>

//             {/* PDF Upload */}
//             <div className="border-t border-slate-700 pt-6">
//               <h3 className="text-sm text-slate-400 mb-3">
//                 Or Upload Policy PDF
//               </h3>
//               <div className="flex gap-4 items-center">
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//                 <button
//                   onClick={handleUpload}
//                   className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   <Upload size={16} />
//                   Upload & Extract
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10">
//         <Card title="Total Policies" value={policies.length} />
//         <Card title="Total Premium" value={`₹ ${totalPremium}`} />
//         <Card
//           title="Active Policies"
//           value={policies.filter((p) => getStatus(p.maturity_date) === "Active").length}
//         />
//       </div>

//       {/* Search + Export */}
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search policy..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl"
//         />
//         <CSVLink
//           data={filtered}
//           filename="insurance_export.csv"
//           className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-700"
//         >
//           Export CSV
//         </CSVLink>
//       </div>

//       {/* Table */}
//       <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-800 text-slate-400 text-sm">
//             <tr>
//               <th className="p-4">Policy</th>
//               <th>Company</th>
//               <th>Nominee</th>
//               <th>Premium</th>
//               <th>Status</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((p) => {
//               const status = getStatus(p.maturity_date);
//               return (
//                 <tr
//                   key={p.id}
//                   className="border-t border-slate-800 hover:bg-slate-800/40 transition"
//                 >
//                   <td className="p-4 font-medium">{p.policy_name}</td>
//                   <td>{p.company_name}</td>
//                   <td>{p.nominee_name}</td>
//                   <td>₹ {p.premium_amount}</td>
//                   <td>
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full ${
//                         status === "Active"
//                           ? "bg-green-500/20 text-green-400"
//                           : "bg-red-500/20 text-red-400"
//                       }`}
//                     >
//                       {status}
//                     </span>
//                   </td>
//                   <td className="flex justify-center gap-3 py-3">
//                     <Pencil size={16} className="cursor-pointer text-blue-400" />
//                     <Trash2
//                       size={16}
//                       onClick={() => handleDelete(p.id)}
//                       className="cursor-pointer text-red-400"
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
//     <p className="text-slate-400 text-sm">{title}</p>
//     <h3 className="text-2xl font-semibold mt-2">{value}</h3>
//   </div>
// );

// const Input = ({ ...props }) => (
//   <input
//     {...props}
//     required
//     className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2"
//   />
// );

// export default InsuranceTable;

import { useEffect, useState } from "react";
import API from "../../../services/api";
import { CSVLink } from "react-csv";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus, Upload, Eye } from "lucide-react";

const InsuranceTable = () => {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    policy_name: "",
    company_name: "",
    policy_number: "",
    nominee_name: "",
    nominee_email: "",
    premium_amount: "",
    maturity_date: "",
    id_proof_file: null,
  });

  const fetchPolicies = async () => {
    try {
      const res = await API.get("/insurance/get-policies");
      setPolicies(res.data);
    } catch (err) {
      console.error("Fetch policies error:", err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Delete policy
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this policy?")) return;
    try {
      await API.delete(`/insurance/delete-policy/${id}`);
      fetchPolicies();
    } catch (err) {
      console.error(err);
    }
  };

  // Manual form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/insurance/add-policy", form);
      setOpen(false);
      fetchPolicies();
      setForm({
        policy_name: "",
        company_name: "",
        policy_number: "",
        nominee_name: "",
        nominee_email: "",
        premium_amount: "",
        maturity_date: "",
        id_proof_file: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // PDF Upload
  const handleUpload = async () => {
    if (!file) return alert("Select PDF");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/insurance/upload-policy", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      fetchPolicies();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter policies by search
  const filtered = policies.filter(
    (p) =>
      p.policy_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.nominee_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.nominee_email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPremium = policies.reduce(
    (acc, curr) => acc + Number(curr.premium_amount || 0),
    0
  );

  const getStatus = (date) => {
    if (!date) return "Unknown";
    return new Date(date) < new Date() ? "Expired" : "Active";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-950 min-h-screen p-8 text-white"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Insurance Policies</h2>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Policy
        </button>
      </div>

      {/* Add Policy Form */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-10"
          >
            {/* Manual Form */}
            <form
              onSubmit={handleManualSubmit}
              className="grid md:grid-cols-3 gap-4 mb-6"
            >
              <Input label="Policy Name" name="policy_name" value={form.policy_name} onChange={handleChange} />
              <Input label="Company Name" name="company_name" value={form.company_name} onChange={handleChange} />
              <Input label="Policy Number" name="policy_number" value={form.policy_number} onChange={handleChange} />
              <Input label="Nominee Name" name="nominee_name" value={form.nominee_name} onChange={handleChange} />
              <Input label="Nominee Email" type="email" name="nominee_email" value={form.nominee_email} onChange={handleChange} />
              <Input label="Premium Amount" type="number" name="premium_amount" value={form.premium_amount} onChange={handleChange} />
              <Input label="Maturity Date" type="date" name="maturity_date" value={form.maturity_date} onChange={handleChange} />

              <button className="col-span-3 bg-green-600 py-2 rounded-lg hover:bg-green-700 transition">
                Save Manually
              </button>
            </form>

            {/* PDF Upload */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-sm text-slate-400 mb-3">
                Or Upload Policy PDF
              </h3>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  onClick={handleUpload}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  <Upload size={16} />
                  Upload & Extract
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card title="Total Policies" value={policies.length} />
        <Card title="Total Premium" value={`₹ ${totalPremium}`} />
        <Card
          title="Active Policies"
          value={policies.filter((p) => getStatus(p.maturity_date) === "Active").length}
        />
      </div>

      {/* Search + Export CSV */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by policy, nominee name, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl"
        />
        <CSVLink
          data={filtered}
          filename="insurance_export.csv"
          className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-700"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Policies Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-400 text-sm">
            <tr>
              <th className="p-4">Policy</th>
              <th>Company</th>
              <th>Nominee Name</th>
              <th>Nominee Email</th>
              <th>Premium</th>
              <th>Maturity</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const status = getStatus(p.maturity_date);
              return (
                <tr
                  key={p.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="p-4 font-medium">{p.policy_name}</td>
                  <td>{p.company_name}</td>
                  <td>{p.nominee_name}</td>
                  <td>{p.nominee_email || "-"}</td>
                  <td>₹ {p.premium_amount}</td>
                  <td>{p.maturity_date ? new Date(p.maturity_date).toLocaleDateString() : "-"}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-3 py-3">
                    {p.id_proof_file && (
                      <a
                        href={`http://localhost:5000/uploads/${p.id_proof_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye size={16} />
                      </a>
                    )}
                    <Trash2
                      size={16}
                      onClick={() => handleDelete(p.id)}
                      className="cursor-pointer text-red-400"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Card component
const Card = ({ title, value }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
    <p className="text-slate-400 text-sm">{title}</p>
    <h3 className="text-2xl font-semibold mt-2">{value}</h3>
  </div>
);

// Input component
const Input = ({ label, type = "text", ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-slate-400 mb-2">{label}</label>
    <input
      type={type}
      {...props}
      required
      className="bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
  </div>
);

export default InsuranceTable;