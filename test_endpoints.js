// Test script to verify endpoints
console.log("=== TESTING ENDPOINTS ===");
console.log("API_URL from env:", import.meta.env.VITE_API_URL);

// Test the endpoints
const testEndpoints = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/accounts/register/", {
      method: "OPTIONS",
      headers: {
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "POST"
      }
    });
    console.log("? /api/accounts/register/ OPTIONS:", response.status);
    
    // Test with minimal data
    const testData = {
      email: "test@test.com",
      password: "Test123!",
      first_name: "Test",
      last_name: "User"
    };
    
    const postResponse = await fetch("http://localhost:8000/api/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:5173"
      },
      body: JSON.stringify(testData)
    });
    
    const data = await postResponse.json();
    console.log("? /api/accounts/register/ POST:", postResponse.status, data);
    
  } catch (error) {
    console.error("? Test failed:", error);
  }
};

// Run test
testEndpoints();
