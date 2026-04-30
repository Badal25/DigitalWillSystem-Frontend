import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/nominee",
});

export const verifyToken = (token) => API.get(`/verify/${token}`);
export const uploadDocuments = (token, formData) =>
  API.post(`/upload/${token}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const fetchAssets = (token) => API.get(`/assets/${token}`);