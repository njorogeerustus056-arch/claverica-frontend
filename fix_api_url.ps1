// Temporarily change API_URL for local development
$apiContent = Get-Content "src\api.ts" -Raw
$apiContent = $apiContent -replace 'const API_URL = import\.meta\.env\.VITE_API_URL \|\| "https://claverica-backend\.onrender\.com";', 'const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";'
$apiContent | Set-Content "src\api.ts" -Encoding UTF8
Write-Host "✅ Changed API_URL to localhost:8000" -ForegroundColor Green
