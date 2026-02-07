# FIX ALL LOCALHOST REFERENCES
Write-Host "?? FIXING ALL LOCALHOST REFERENCES..." -ForegroundColor Red

# List of files with localhost references (from search results)
$filesToFix = @(
    "src/components/EscrowList.jsx",
    "src/components/EscrowList.tsx",
    "src/config/api.js", 
    "src/config/api.ts",
    "src/layout/DashboardHeader.jsx",
    "src/layout/DashboardHeader.tsx",
    "src/lib/store/auth.js",
    "src/lib/store/auth.ts",
    "src/services/dumpster.js",
    "src/services/dumpster.ts",
    "src/services/transfer-api.js",
    "src/services/transfer-api.ts",
    "src/utils/api.ts",
    "test-auth-flow.js",
    "test_endpoints.js",
    "verification.js"
)

foreach ($file in $filesToFix) {
    if (Test-Path $file) {
        Write-Host "Fixing: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        
        # Replace localhost:8000 fallbacks with empty string or production URL
        $newContent = $content -replace '"http://localhost:8000"', 'import.meta.env.VITE_API_URL'
        $newContent = $newContent -replace "'http://localhost:8000'", "import.meta.env.VITE_API_URL"
        $newContent = $newContent -replace 'import\.meta\.env\.VITE_API_URL \|\| "http://localhost:8000"', 'import.meta.env.VITE_API_URL'
        $newContent = $newContent -replace "import\.meta\.env\.VITE_API_URL \|\| 'http://localhost:8000'", 'import.meta.env.VITE_API_URL'
        
        if ($newContent -ne $content) {
            $newContent | Set-Content $file
            Write-Host "  ? Fixed" -ForegroundColor Green
        } else {
            Write-Host "  ??  No changes needed" -ForegroundColor Gray
        }
    }
}

# Delete test files that hardcode localhost
$testFiles = @("test-auth-flow.js", "test_endpoints.js", "verification.js")
foreach ($file in $testFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "???  Deleted: $file" -ForegroundColor Cyan
    }
}

Write-Host "`n? ALL FILES FIXED!" -ForegroundColor Green
