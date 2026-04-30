// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus } from "lucide-react";
// import API from "../../../services/api";

// const AddInsurance = ({ refresh }) => {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     policy_name: "",
//     company_name: "",
//     policy_number: "",
//     nominee_name: "",
//     premium_amount: "",
//     maturity_date: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await API.post("/insurance/add-policy", form);
//       refresh();
//       setOpen(false);
//       setForm({
//         policy_name: "",
//         company_name: "",
//         policy_number: "",
//         nominee_name: "",
//         premium_amount: "",
//         maturity_date: "",
//       });
//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="mb-10">

//       {/* Top CTA */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-white">
//             Insurance Policies
//           </h2>
//           <p className="text-slate-400 text-sm">
//             Manage and track all your insurance policies
//           </p>
//         </div>

//         <button
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 px-5 py-2.5 
//                      bg-blue-600 hover:bg-blue-700 
//                      transition-all duration-300 
//                      rounded-xl text-white font-medium shadow-lg"
//         >
//           <Plus size={18} />
//           Add Policy
//         </button>
//       </div>

//       {/* Animated Form */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="bg-slate-900/60 backdrop-blur-xl 
//                        border border-slate-800 
//                        rounded-2xl p-8 shadow-2xl"
//           >
//             <form onSubmit={handleSubmit}>
//               <div className="grid md:grid-cols-3 gap-6">

//                 <Input label="Policy Name" name="policy_name" value={form.policy_name} onChange={handleChange} />
//                 <Input label="Company Name" name="company_name" value={form.company_name} onChange={handleChange} />
//                 <Input label="Policy Number" name="policy_number" value={form.policy_number} onChange={handleChange} />
//                 <Input label="Nominee Name" name="nominee_name" value={form.nominee_name} onChange={handleChange} />
//                 <Input label="Premium Amount" type="number" name="premium_amount" value={form.premium_amount} onChange={handleChange} />
//                 <Input label="Maturity Date" type="date" name="maturity_date" value={form.maturity_date} onChange={handleChange} />

//               </div>

//               <div className="flex justify-end mt-8">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-6 py-3 rounded-xl 
//                              bg-gradient-to-r from-blue-600 to-indigo-600
//                              hover:from-blue-700 hover:to-indigo-700
//                              transition-all duration-300 
//                              text-white font-medium shadow-lg"
//                 >
//                   {loading ? "Saving..." : "Save Policy"}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const Input = ({ label, type = "text", ...props }) => (
//   <div className="flex flex-col">
//     <label className="text-sm text-slate-400 mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       {...props}
//       required
//       className="bg-slate-950/80 border border-slate-700 
//                  rounded-xl px-4 py-3 text-white
//                  focus:outline-none focus:ring-2 focus:ring-blue-500
//                  transition-all duration-300"
//     />
//   </div>
// );

// export default AddInsurance;


import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import API from "../../../services/api";

const AddInsurance = ({ refresh }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef();

  const [idProofFile, setIdProofFile] = useState(null);

  const [form, setForm] = useState({
    policy_name: "",
    company_name: "",
    policy_number: "",
    nominee_name: "",
    nominee_email: "",
    premium_amount: "",
    maturity_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const allowed = ["application/pdf", "image/png", "image/jpeg"];

    if (!allowed.includes(file.type)) {
      setError("Only PDF, JPG, PNG files allowed");
      fileRef.current.value = "";
      return;
    }

    setError("");
    setIdProofFile(file);
  };

  const resetForm = () => {

    setForm({
      policy_name: "",
      company_name: "",
      policy_number: "",
      nominee_name: "",
      nominee_email: "",
      premium_amount: "",
      maturity_date: "",
    });

    setIdProofFile(null);

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!idProofFile) {
      setError("Nominee ID proof required");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("nominee_id", idProofFile);

      await API.post("/insurance/add-policy", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      refresh();
      resetForm();
      setOpen(false);

    } catch (err) {

      console.error(err);
      setError("Failed to add policy");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Insurance Policies
          </h2>
          <p className="text-slate-400 text-sm">
            Manage and track your insurance policies
          </p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white"
        >
          <Plus size={18}/> Add Policy
        </button>

      </div>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{opacity:0,y:-20}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-20}}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl"
          >

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

              <Input label="Policy Name" name="policy_name" value={form.policy_name} onChange={handleChange}/>
              <Input label="Company Name" name="company_name" value={form.company_name} onChange={handleChange}/>
              <Input label="Policy Number" name="policy_number" value={form.policy_number} onChange={handleChange}/>
              <Input label="Nominee Name" name="nominee_name" value={form.nominee_name} onChange={handleChange}/>
              <Input label="Nominee Email" type="email" name="nominee_email" value={form.nominee_email} onChange={handleChange}/>
              <Input label="Premium Amount" type="number" name="premium_amount" value={form.premium_amount} onChange={handleChange}/>
              <Input label="Maturity Date" type="date" name="maturity_date" value={form.maturity_date} onChange={handleChange}/>

              <div className="flex flex-col">
                <label className="text-sm text-slate-400 mb-2">
                  Nominee ID Proof (PDF/JPG/PNG)
                </label>

                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFile}
                  required
                  className="text-white"
                />

              </div>

              {error && (
                <p className="col-span-2 text-red-400 text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="col-span-2 bg-green-600 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Saving Policy..." : "Save Policy"}
              </button>

            </form>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

const Input = ({ label, type="text", ...props }) => (

  <div className="flex flex-col">

    <label className="text-sm text-slate-400 mb-2">
      {label}
    </label>

    <input
      type={type}
      {...props}
      required
      className="bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

  </div>
);

export default AddInsurance;