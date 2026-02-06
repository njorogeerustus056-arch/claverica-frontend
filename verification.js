// verification.js - Test endpoint
console.log("=== VERIFICATION ===");

// Check what URL is being used
const testAPI = async () => {
  console.log("Testing endpoint...");
  
  try {
    // Test OPTIONS
    const optionsResponse = await fetch("http://localhost:8000/api/accounts/register/", {
      method: "OPTIONS",
      headers: { "Origin": "http://localhost:5173" }
    });
    console.log("OPTIONS Status:", optionsResponse.status);
    console.log("CORS Headers:", {
      "Access-Control-Allow-Origin": optionsResponse.headers.get("Access-Control-Allow-Origin"),
      "Access-Control-Allow-Methods": optionsResponse.headers.get("Access-Control-Allow-Methods")
    });
    
    // Test simple data
    const testData = {
      email: "verify@test.com",
      password: "Test123!",
      first_name: "Verify",
      last_name: "Test"
    };
    
    const postResponse = await fetch("http://localhost:8000/api/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:5173"
      },
      body: JSON.stringify(testData)
    });
    
    console.log("POST Status:", postResponse.status);
    const data = await postResponse.json();
    console.log("Response:", data);
    
  } catch (error) {
    console.error("Error:", error);
  }
};

testAPI();
