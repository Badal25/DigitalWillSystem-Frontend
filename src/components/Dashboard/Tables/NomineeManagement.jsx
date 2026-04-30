import { useEffect, useState } from "react";
import API from "../../../services/api";

// 🔥 CHANGE THIS ONLY
const BASE_URL = "https://digitalwillsystem-backend.onrender.com";

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

  // Fetch nominees
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("relationship", form.relationship);

    if (file) formData.append("id_proof_file", file);

    try {
      await API.post("/nominee-management/add", formData);

      setForm({
        name: "",
        email: "",
        phone: "",
        relationship: ""
      });

      setFile(null);
      fetchNominees();

    } catch (err) {
      console.error(err);
      alert("Failed to add nominee");
    }
  };

  const deleteNominee = async (id) => {
    try {
      await API.delete(`/nominee-management/${id}`);
      fetchNominees();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl text-white">

      <h2 className="text-xl font-bold mb-4">
        Nominee Management
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">

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

        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Add Nominee
        </button>

      </form>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : nominees.length === 0 ? (
        <p className="text-gray-400">No nominees found</p>
      ) : (

        <table className="w-full text-white">

          <thead>
            <tr className="border-b border-gray-700 text-left">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Relationship</th>
              <th>ID Proof</th>
              <th>Action</th>
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
                      className="bg-green-600 px-3 py-1 rounded"
                      onClick={() =>
                        window.open(
                          `${BASE_URL}/uploads/${n.id_proof_file}`,
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
                    className="bg-red-600 px-3 py-1 rounded"
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
