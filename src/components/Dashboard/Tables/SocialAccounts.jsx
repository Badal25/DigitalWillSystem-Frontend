import { useEffect, useState } from "react";
import API from "../../../services/api";
import { CSVLink } from "react-csv";
import { motion } from "framer-motion";

// 🔥 Render BASE URL
const BASE_URL = "https://digitalwillsystem-backend.onrender.com";

const SocialAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    platform: "",
    username: "",
    password: "",
    instructions: "",
    release_to_nominee: false,
    nominee_name: "",
    nominee_email: "",
    nominee_id_file: null
  });

  // ---------------- Fetch Accounts ----------------
  const fetchAccounts = async () => {
    try {
      const res = await API.get("/social_accounts");
      setAccounts(res.data);
    } catch (err) {
      console.error("Fetch Accounts Error:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ---------------- Handle Input ----------------
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ---------------- Submit Form ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      await API.post("/social_accounts/add-social", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Social account added successfully!");

      setForm({
        platform: "",
        username: "",
        password: "",
        instructions: "",
        release_to_nominee: false,
        nominee_name: "",
        nominee_email: "",
        nominee_id_file: null
      });

      fetchAccounts();

    } catch (err) {
      console.error("Add Social Error:", err);
      alert("Failed to add social account");
    }
  };

  // ---------------- Search ----------------
  const filtered = accounts.filter((a) =>
    (a.platform || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.username || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white">

      <h2 className="text-xl font-bold mb-4">
        Social Accounts
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Input name="platform" placeholder="Platform" value={form.platform} onChange={handleChange} />
        <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <Input name="instructions" placeholder="Instructions" value={form.instructions} onChange={handleChange} />
        <Input name="nominee_name" placeholder="Nominee Name" value={form.nominee_name} onChange={handleChange} />
        <Input name="nominee_email" placeholder="Nominee Email" value={form.nominee_email} onChange={handleChange} />

        <div className="flex flex-col">
          <label className="text-sm text-slate-300 mb-1">
            Nominee ID / Proof
          </label>
          <input
            type="file"
            name="nominee_id_file"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Release to Nominee</label>
          <input
            type="checkbox"
            name="release_to_nominee"
            checked={form.release_to_nominee}
            onChange={handleChange}
          />
        </div>

        <button className="col-span-3 bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Social Account
        </button>
      </form>

      {/* SEARCH + EXPORT */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search platform / username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white"
        />

        <CSVLink
          data={filtered}
          filename="social_accounts.csv"
          className="px-3 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="py-2 px-4">Platform</th>
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Password</th>
              <th className="py-2 px-4">Instructions</th>
              <th className="py-2 px-4">Nominee Name</th>
              <th className="py-2 px-4">Nominee Email</th>
              <th className="py-2 px-4">ID Proof</th>
              <th className="py-2 px-4">Release</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                className="border-b border-slate-700 hover:bg-slate-800 transition"
              >
                <td className="py-2 px-4">{a.platform}</td>
                <td className="py-2 px-4">{a.username}</td>
                <td className="py-2 px-4">{a.password || "-"}</td>
                <td className="py-2 px-4 truncate max-w-xs">
                  {a.instructions}
                </td>
                <td className="py-2 px-4">{a.nominee_name}</td>
                <td className="py-2 px-4">{a.nominee_email}</td>

                {/* 🔥 FIXED HERE */}
                <td className="py-2 px-4">
                  {a.nominee_id_file ? (
                    <a
                      href={`${BASE_URL}/uploads/social_ids/${a.nominee_id_file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="py-2 px-4">
                  {a.release_to_nominee ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </motion.div>
  );
};

// INPUT COMPONENT
const Input = ({ ...props }) => (
  <input
    {...props}
    required
    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
  />
);

export default SocialAccounts;
