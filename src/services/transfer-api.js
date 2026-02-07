import axios from "axios";

// Create API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple auth interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const transferAPI = {
  createTransfer: async (data) => {
    const response = await api.post("/transfers", data);
    return response.data;
  },
  
  getTransfer: async (id) => {
    const response = await api.get(`/transfers/${id}`);
    return response.data;
  },
  
  verifyTAC: async (transferId, tacCode) => {
    const response = await api.post(`/transfers/${transferId}/verify-tac`, { tac: tacCode });
    return response.data;
  },
  
  getTransfersHistory: async () => {
    const response = await api.get("/transfers/history");
    return response.data || [];
  }
};

export default transferAPI;
export const TransferStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed"
};
