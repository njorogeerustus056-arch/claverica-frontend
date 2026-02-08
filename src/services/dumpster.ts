// src/services/dumpster.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL;

export const DUMPSTER_ENDPOINTS = {
  BASE: `${API_BASE_URL}/dumpsters`,
  // ... rest of your code
};

// Submit data to dumpster
export const submitToDumpster = async (data: any): Promise<any> => {
  try {
    const response = await fetch("/api/dumpster/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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




// Get dumpster statistics
export const getDumpsterStats = async (): Promise<any> => {
  try {
    const response = await fetch("/api/dumpster/stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

