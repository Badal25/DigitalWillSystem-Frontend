

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // backend base url
// });

// // Automatically add Authorization header
// API.interceptors.request.use((config) => {
//   // Correct token key
//   // const token = localStorage.getItem("adminToken"); 
//   const token = localStorage.getItem("token"); // For user side
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;

