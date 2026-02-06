# Clean fix for SignUpForm.tsx - Remove mock data, fix payload
cd D:\Erustus\claverica-frontend

$filePath = "src\components\auth\SignUpForm.tsx"

# Backup the original file
$backupPath = "$filePath.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item $filePath $backupPath
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

# Read the file
$content = Get-Content $filePath -Raw

# First, find and remove ANY mock API URLs or mock data
Write-Host "Removing mock data..." -ForegroundColor Cyan

# Remove mock API URLs (common patterns)
$content = $content -replace 'http://localhost:3000/api', 'http://localhost:8000/api'
$content = $content -replace "'/mock/", "'/api/"
$content = $content -replace '"/mock/', '"/api/'

# Remove any hardcoded test/mock responses
$content = $content -replace '// Mock response.*?\n', ''
$content = $content -replace '// For testing.*?\n', ''
$content = $content -replace 'console\.log\(.*mock.*\)', ''
$content = $content -replace 'console\.log\(.*test.*\)', ''

# Now fix the payload to match Django backend
Write-Host "Fixing payload structure..." -ForegroundColor Cyan

# Define the correct payload structure
$correctPayload = '                const payload = {
                  email: values.email.trim().toLowerCase(),
                  first_name: values.fname.trim(),
                  last_name: values.lname.trim(),
                  password: values.password,
                  confirm_password: values.confirmPassword,
                  phone: values.phone.trim() || "",
                  doc_type: values.docType,
                  doc_number: values.docNumber.trim(),
                  street: values.street.trim(),
                  city: values.city.trim(),
                  state: values.state.trim(),
                  zip_code: values.zip.trim(),
                  occupation: showEmployment ? values.occupation.trim() : "",
                  employer: showEmployment ? values.employer.trim() : "",
                  income_range: showEmployment ? values.incomeRange : "",
                };'

# Find and replace ANY payload definition
if ($content -match "const payload\s*=\s*\{") {
    $startIndex = $content.IndexOf("const payload = {")
    $endIndex = $content.IndexOf("};", $startIndex) + 2
    $oldPayload = $content.Substring($startIndex, $endIndex - $startIndex)
    
    Write-Host "Replacing old payload:" -ForegroundColor Red
    Write-Host $oldPayload -ForegroundColor DarkYellow
    
    $content = $content.Replace($oldPayload, $correctPayload)
    
    Write-Host "`nWith new payload:" -ForegroundColor Green
    Write-Host $correctPayload -ForegroundColor Cyan
}

# Also check for fetch/axios calls and fix URLs
$content = $content -replace "fetch\('/auth/", "fetch('/api/auth/"
$content = $content -replace 'fetch\("/auth/', 'fetch("/api/auth/'
$content = $content -replace 'axios\.post\('/auth/', 'axios.post('/api/auth/'

# Save the fixed file
$content | Set-Content $filePath -Encoding UTF8

Write-Host "`n✅ File cleaned and fixed!" -ForegroundColor Green
Write-Host "Changes made:" -ForegroundColor Yellow
Write-Host "1. Removed mock API URLs" -ForegroundColor Cyan
Write-Host "2. Fixed payload to snake_case flat fields" -ForegroundColor Cyan
Write-Host "3. Updated API endpoints to real backend" -ForegroundColor Cyan

# Show the fixed payload section
Write-Host "`n=== VERIFYING FIXED PAYLOAD ===" -ForegroundColor Green
Get-Content $filePath -Raw | Select-String -Pattern "const payload.*=.*\{[\s\S]*?\n\s*\};" | ForEach-Object {
    Write-Host $_.Matches[0].Value -ForegroundColor White
}
