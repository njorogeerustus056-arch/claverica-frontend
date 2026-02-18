// src/services/dumpster.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const DUMPSTER_ENDPOINTS = {
  BASE: `${API_BASE_URL}/kyc_spec`,  // Changed from /dumpsters to /kyc_spec
  COLLECT: `${API_BASE_URL}/kyc_spec/collect/`,
  STATS: `${API_BASE_URL}/kyc_spec/stats/`,
  DASHBOARD: `${API_BASE_URL}/kyc_spec/dashboard/`,
  SEARCH: `${API_BASE_URL}/kyc_spec/search/`,
  EXPORT: `${API_BASE_URL}/kyc_spec/export/`,
};

// Submit data to dumpster (now points to kyc_spec)
export const submitToDumpster = async (data: any, token?: string): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch("/api/kyc_spec/collect/", {  // Changed endpoint
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to submit to dumpster");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error submitting to dumpster:", error);
    throw error;
  }
};

// Get dumpster statistics (now points to kyc_spec)
export const getDumpsterStats = async (token?: string): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch("/api/kyc_spec/stats/", {  // Changed endpoint
      method: "GET",
      headers,
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch dumpster stats");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching dumpster stats:", error);
    throw error;
  }
};