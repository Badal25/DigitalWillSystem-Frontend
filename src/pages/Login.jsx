
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import API from "../services/api";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await API.post("/auth/login", form);

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       // Save user (AI chat ke liye important)
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Redirect to dashboard
//       navigate("/dashboard");
      

//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Invalid credentials"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-6">

//       <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-lg p-10 rounded-3xl border border-slate-800 shadow-2xl"
//       >
//         <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//           Welcome Back to DigitalWill
//         </h2>

//         {error && (
//           <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div>
//             <label className="block text-sm text-slate-400 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-slate-400 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none text-white"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition duration-300 font-semibold"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         <p className="text-center text-slate-400 mt-6 text-sm">
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-blue-400 cursor-pointer hover:underline"
//           >
//             Register
//           </span>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      if (!res.data.token) {
        setError("Login failed: No token returned");
        setLoading(false);
        return;
      }

      // ✅ Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("TOKEN SAVED:", res.data.token);

      // 🔥 HARD RELOAD to fix 403 dashboard
      window.location.href = "/dashboard";

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-6">
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-lg p-10 rounded-3xl border border-slate-800 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome Back to DigitalWill
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition duration-300 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;