
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginAdmin } from "../services/adminAPI";

// export default function AdminLogin() {

//   const navigate = useNavigate();

//   const [form,setForm] = useState({
//     email:"",
//     password:""
//   });

//   const [loading,setLoading] = useState(false);
//   const [error,setError] = useState("");

//   const handleChange = (e)=>{
//     const {name,value} = e.target;

//     setForm({
//       ...form,
//       [name]:value
//     });
//   };

//   const handleSubmit = async(e)=>{
//     e.preventDefault();

//     try{

//       setLoading(true);
//       setError("");

//       const res = await loginAdmin(form);

//       if(!res.data.token){
//         throw new Error("Token not received from server");
//       }

//       localStorage.setItem("adminToken",res.data.token);

//       navigate("/admin/dashboard");

//     }
//     catch(err){

//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Admin login failed"
//       );

//     }
//     finally{
//       setLoading(false);
//     }

//   };

//   return(

//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">

//       <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Admin Login
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-3 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>

//           {/* EMAIL */}

//           <div className="mb-5">

//             <label className="block mb-2 font-semibold text-gray-700">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter admin email"
//               className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />

//           </div>

//           {/* PASSWORD */}

//           <div className="mb-6">

//             <label className="block mb-2 font-semibold text-gray-700">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter password"
//               className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />

//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
//           >

//             {loading ? "Logging in..." : "Login"}

//           </button>

//         </form>

//       </div>

//     </div>

//   )

// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/adminAPI";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleChange = (e)=>{
    const {name,value} = e.target;

    setForm({
      ...form,
      [name]:value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

      setLoading(true);
      setError("");

      // 🔥 IMPORTANT FIX: purana token remove karo
      localStorage.removeItem("adminToken");

      const res = await loginAdmin(form);

      if(!res.data.token){
        throw new Error("Token not received from server");
      }

      // ✅ save new token
      localStorage.setItem("adminToken",res.data.token);

      navigate("/admin/dashboard");

    }
    catch(err){

      setError(
        err.response?.data?.message ||
        err.message ||
        "Admin login failed"
      );

    }
    finally{
      setLoading(false);
    }

  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter admin email"
              className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  )
}