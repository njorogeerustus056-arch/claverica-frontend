// force-localhost.js - UPDATED FOR NEW RENDER URL
console.log("=== FORCE LOCALHOST OVERRIDE ACTIVE (UPDATED) ===");

const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // Convert claverica-backend-rniq.onrender.com URLs to localhost
  if (typeof url === 'string' && url.includes('claverica-backend')) {
    console.log('?? INTERCEPTED REMOTE URL:', url);
    const newUrl = url
      .replace('https://claverica-backend-rniq.onrender.com', 'http://localhost:8000')
      .replace('claverica-backend-rniq.onrender.com', 'localhost:8000')
      .replace('https://claverica-backend.onrender.com', 'http://localhost:8000')
      .replace('claverica-backend.onrender.com', 'localhost:8000');
    console.log('? REWRITTEN TO:', newUrl);
    return originalFetch.call(this, newUrl, options);
  }
  return originalFetch.call(this, url, options);
};

// Also test endpoint immediately
fetch('http://localhost:8000/api/accounts/register/', {
  method: 'OPTIONS',
  headers: { 'Origin': 'http://localhost:5173' }
})
.then(r => console.log('? Localhost test:', r.status))
.catch(e => console.error('? Localhost test failed:', e));