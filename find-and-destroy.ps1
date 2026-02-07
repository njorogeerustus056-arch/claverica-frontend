# COMPLETE SEARCH AND DESTROY SCRIPT
Write-Host "?? HUNTING FOR FORCE-LOCALHOST INJECTION..." -ForegroundColor Red

# Files that might contain the injection
$suspectFiles = @(
    "src/api.js",
    "src/utils/api.js", 
    "src/services/api.js",
    "src/services/api.ts",
    "vite.config.ts",
    "vite.config.js",
    "package.json",
    "index.html"
)

foreach ($file in $suspectFiles) {
    if (Test-Path $file) {
        Write-Host "`n?? Checking: $file" -ForegroundColor Yellow
        $content = Get-Content $file -Raw
        
        # Check for CommonJS exports
        if ($content -match "exports\.\w+\s*=") {
            Write-Host "??  Found CommonJS exports" -ForegroundColor Red
            $content | Select-String "exports\." | ForEach-Object {
                Write-Host "  Line: $($_.Line)" -ForegroundColor Cyan
            }
        }
        
        # Check for force-localhost
        if ($content -match "force-localhost") {
            Write-Host "? Found force-localhost reference" -ForegroundColor Red
            $content | Select-String "force-localhost" | ForEach-Object {
                Write-Host "  Line $($_.LineNumber): $($_.Line)" -ForegroundColor Cyan
            }
        }
        
        # Check for localhost:8000
        if ($content -match "localhost:8000") {
            Write-Host "? Found localhost:8000 reference" -ForegroundColor Red
            $content | Select-String "localhost:8000" | ForEach-Object {
                Write-Host "  Line $($_.LineNumber): $($_.Line)" -ForegroundColor Cyan
            }
        }
    }
}

# Check built files
if (Test-Path "dist") {
    Write-Host "`n?? Checking dist folder..." -ForegroundColor Yellow
    Get-ChildItem dist -Recurse -Include *.js,*.html | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        if ($content -match "force-localhost") {
            Write-Host "? Found in build output: $($_.Name)" -ForegroundColor Red
        }
    }
}
