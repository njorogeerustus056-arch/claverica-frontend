// test-auth-flow.js - Quick test script
const testAuthFlow = async () => {
  console.log('Testing Authentication Flow...\n');
  
  // 1. Test backend connectivity
  try {
    const response = await fetch('http://localhost:8000/');
    console.log(`? Backend running: ${response.status}`);
  } catch (error) {
    console.log(`? Backend error: ${error.message}`);
    return;
  }
  
  // 2. Test API endpoints
  const endpoints = [
    '/api/auth/register/',
    '/api/auth/verify-otp/',
    '/api/auth/resend-otp/',
    '/api/auth/login/'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, { 
        method: 'OPTIONS' 
      });
      console.log(`? ${endpoint}: ${response.status}`);
    } catch (error) {
      console.log(`? ${endpoint}: ${error.message}`);
    }
  }
  
  console.log('\n=== Frontend Check ===');
  console.log('1. Open http://localhost:5173/signup');
  console.log('2. Fill out the signup form');
  console.log('3. Submit ? Should redirect to /verify-email');
  console.log('4. Check Django console for OTP (if email not configured)');
  console.log('5. Enter OTP on verification page');
  console.log('6. Success ? Redirect to /signin');
};

if (typeof window !== 'undefined') {
  testAuthFlow();
}
