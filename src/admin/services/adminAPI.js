import axios from "axios";

const API = axios.create({
  baseURL: "https://digitalwillsystem-backend.onrender.com/api/admin",
});

// 🔥 TOKEN INTERCEPTOR FIXED
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  // ❌ LOGIN pe token mat bhej
  if (token && !config.url.includes("/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AUTH =================
export const loginAdmin = (data) => API.post("/login", data);

// ================= DASHBOARD =================
export const getDashboard = () => API.get("/death-overview");

// ================= DEATH =================
export const getDeathList = () => API.get("/death-list");

// ================= ACTIONS =================
export const verifyDocuments = (id) => API.post(`/verify/${id}`);
export const approveCase = (id) => API.post(`/approve/${id}`);
export const releaseCase = (id) => API.post(`/release/${id}`);
export const rejectCase = (id) => API.post(`/reject/${id}`);

// ================= INACTIVE USERS =================
export const getInactiveUsers = () => API.get("/inactive-users");

// ================= NOMINEE =================
export const notifyNominee = (id) =>
  API.post(`/notify-nominee/${id}`);

// ================= NOMINEE MONITOR =================
export const getNomineeAccess = () => API.get("/nominee-access");

// ================= AUDIT =================
export const getAuditLogs = () => API.get("/audit-logs");

// ================= NOMINEES =================
export const getAllNominees = () => API.get("/nominees");

export default API;
