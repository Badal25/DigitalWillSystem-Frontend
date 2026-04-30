// import { useEffect, useState } from "react";
// import API from "../../../services/api";

// const NomineeManagement = () => {

//   const [nominees, setNominees] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     relationship: ""
//   });

//   const [file, setFile] = useState(null);

//   // Fetch nominees
//   const fetchNominees = async () => {
//     try {
//       const res = await API.get("/nominee-management/my");
//       setNominees(res.data);
//     } catch (err) {
//       console.error("Fetch nominees error", err);
//     }
//   };

//   useEffect(() => {
//     fetchNominees();
//   }, []);

//   // Handle input
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Add nominee
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("email", form.email);
//     formData.append("phone", form.phone);
//     formData.append("relationship", form.relationship);

//     if (file) formData.append("id_proof_file", file);

//     try {
//       await API.post("/nominee-management/add", formData);

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         relationship: ""
//       });

//       setFile(null);

//       fetchNominees();
//     } catch (err) {
//       console.error("Add nominee error", err);
//     }
//   };

//   // Delete nominee
//   const deleteNominee = async (id) => {
//     try {
//       await API.delete(`/nominee-management/${id}`);
//       fetchNominees();
//     } catch (err) {
//       console.error("Delete nominee error", err);
//     }
//   };

//   return (
//     <div className="bg-slate-900 p-6 rounded-xl">

//       <h2 className="text-xl font-bold mb-4">
//         Nominee Management
//       </h2>

//       {/* Add Nominee Form */}

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-2 gap-4 mb-6"
//       >

//         <input
//           type="text"
//           name="name"
//           placeholder="Nominee Name"
//           value={form.name}
//           onChange={handleChange}
//           className="p-2 rounded bg-slate-800"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="p-2 rounded bg-slate-800"
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={handleChange}
//           className="p-2 rounded bg-slate-800"
//         />

//         <input
//           type="text"
//           name="relationship"
//           placeholder="Relationship"
//           value={form.relationship}
//           onChange={handleChange}
//           className="p-2 rounded bg-slate-800"
//         />

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="p-2"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 p-2 rounded"
//         >
//           Add Nominee
//         </button>

//       </form>

//       {/* Nominee Table */}

//       <table className="w-full">

//         <thead>

//           <tr className="border-b border-gray-700">

//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Relationship</th>
//             <th>ID Proof</th>
//             <th>Action</th>

//           </tr>

//         </thead>

//         <tbody>

//           {nominees.map((n) => (

//             <tr key={n.id} className="border-b border-gray-700">

//               <td>{n.name}</td>
//               <td>{n.email}</td>
//               <td>{n.phone}</td>
//               <td>{n.relationship}</td>

//               <td>

//                 {n.id_proof_file ? (

//                   <button
//                     className="bg-green-600 px-2 py-1 rounded text-white"
//                     onClick={() =>
//                       window.open(
//                         // `http://localhost:5000/uploads/nominee-id/${n.id_proof_file}`,
//                         // "_blank"
//                         `http://localhost:5000/uploads/${n.id_proof_file}`,"_blank"

//                       )
                      
//                     }
//                   >
//                     Preview
//                   </button>

//                 ) : (
//                   "No File"
//                 )}

//               </td>

//               <td>

//                 <button
//                   onClick={() => deleteNominee(n.id)}
//                   className="bg-red-600 px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// };

// export default NomineeManagement;


import { useEffect, useState } from "react";
import API from "../../../services/api";

const NomineeManagement = () => {

  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    relationship: ""
  });

  const [file, setFile] = useState(null);

  // 🔄 Fetch nominees
  const fetchNominees = async () => {
    try {
      const res = await API.get("/nominee-management/my");
      setNominees(res.data);
    } catch (err) {
      console.error("Fetch nominees error", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNominees();
  }, []);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ➕ Add nominee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and Email required");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("relationship", form.relationship);

    if (file) formData.append("id_proof_file", file);

    try {
      await API.post("/nominee-management/add", formData);

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        relationship: ""
      });
      setFile(null);

      fetchNominees();

    } catch (err) {
      console.error("Add nominee error", err);
      alert("Failed to add nominee");
    }
  };

  // ❌ Delete nominee
  const deleteNominee = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await API.delete(`/nominee-management/${id}`);
      fetchNominees();
    } catch (err) {
      console.error("Delete nominee error", err);
      alert("Failed to delete nominee");
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl text-white">

      <h2 className="text-xl font-bold mb-4">
        Nominee Management
      </h2>

      {/* ➕ Add Nominee Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Nominee Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded bg-slate-800"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 rounded bg-slate-800"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="p-2 rounded bg-slate-800"
        />

        <input
          type="text"
          name="relationship"
          placeholder="Relationship"
          value={form.relationship}
          onChange={handleChange}
          className="p-2 rounded bg-slate-800"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Add Nominee
        </button>

      </form>

      {/* 📊 Table */}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : nominees.length === 0 ? (
        <p className="text-gray-400">No nominees added</p>
      ) : (

        <table className="w-full">

          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Relationship</th>
              <th className="p-2">ID Proof</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>

            {nominees.map((n) => (
              <tr key={n.id} className="border-b border-gray-700">

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
                      Preview
                    </button>
                  ) : (
                    <span className="text-gray-400">No File</span>
                  )}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => deleteNominee(n.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default NomineeManagement;