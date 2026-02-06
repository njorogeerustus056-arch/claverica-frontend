// Test the fixed frontend
Write-Host "=== TESTING FRONTEND CONFIGURATION ===" -ForegroundColor Green

# Check SignUpForm.tsx for correct payload
$signupContent = Get-Content "src\components\auth\SignUpForm.tsx" -Raw

# Verify payload structure
if ($signupContent -match "first_name.*values\.fname") {
    Write-Host "✅ Payload uses snake_case: first_name" -ForegroundColor Green
} else {
    Write-Host "❌ Payload not fixed - still using camelCase" -ForegroundColor Red
}

if ($signupContent -match "confirm_password.*values\.confirmPassword") {
    Write-Host "✅ Payload has confirm_password field" -ForegroundColor Green
} else {
    Write-Host "❌ Missing confirm_password field" -ForegroundColor Red
}

# Check for mock URLs
if ($signupContent -match "localhost:3000") {
    Write-Host "❌ Still contains mock URL (localhost:3000)" -ForegroundColor Red
} else {
    Write-Host "✅ No mock URLs found" -ForegroundColor Green
}

if ($signupContent -match "localhost:8000") {
    Write-Host "✅ Points to real backend (localhost:8000)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Not pointing to localhost:8000" -ForegroundColor Yellow
}

# Check for nested objects (should be removed)
if ($signupContent -match "document\s*:\s*\{") {
    Write-Host "❌ Still has nested 'document' object" -ForegroundColor Red
} else {
    Write-Host "✅ No nested objects - using flat fields" -ForegroundColor Green
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "If all checks pass, restart the frontend dev server:" -ForegroundColor Yellow
Write-Host "1. Stop current dev server (Ctrl+C)" -ForegroundColor White
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. Test registration at: http://localhost:5173/signup" -ForegroundColor White
Write-Host "4. Watch Django console for OTP" -ForegroundColor White
