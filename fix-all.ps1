# Fix all hardcoded localhost URLs in the entire src folder
$files = Get-ChildItem -Path "src" -Recurse -Include *.ts, *.tsx

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Skip if no localhost
    if ($content -notmatch "localhost:8000") { continue }
    
    Write-Host "Fixing: $($file.FullName)"
    
    # Replace patterns:
    # 1. Single quotes: 'http://localhost:8000'
    # 2. Double quotes: "http://localhost:8000"
    # 3. Backticks: `http://localhost:8000`
    # 4. In template literals: `${...}/api/...`
    
    $updated = $content -replace "'http://localhost:8000'", "import.meta.env.VITE_API_URL || 'http://localhost:8000'"
    $updated = $updated -replace '"http://localhost:8000"', 'import.meta.env.VITE_API_URL || "http://localhost:8000"'
    $updated = $updated -replace '`http://localhost:8000`', '`${import.meta.env.VITE_API_URL}`'
    
    # For template literals already using backticks
    $updated = $updated -replace 'http://localhost:8000', '`${import.meta.env.VITE_API_URL}`'
    
    # Save if changes were made
    if ($updated -ne $content) {
        $updated | Out-File $file.FullName -Encoding utf8
        Write-Host "  -> Updated" -ForegroundColor Green
    }
}

Write-Host "All files fixed!" -ForegroundColor Cyan
