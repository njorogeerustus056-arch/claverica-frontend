# NUCLEAR CLEANUP SCRIPT
Write-Host "?? STARTING NUCLEAR CLEANUP..." -ForegroundColor Red

# 1. Delete ALL possible force-localhost files
$filesToDelete = @(
    "public/force-localhost.js",
    "force-localhost.js",
    "src/force-localhost.js",
    "force-localhost.ts",
    "src/force-localhost.ts",
    "node_modules/.cache/force-localhost*",
    ".vite/deps/force-localhost*"
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force -Recurse
        Write-Host "Deleted: $file" -ForegroundColor Green
    }
}

# 2. Clean ALL build caches
if (Test-Path "dist") { Remove-Item "dist" -Recurse -Force }
if (Test-Path ".vite") { Remove-Item ".vite" -Recurse -Force }
if (Test-Path "node_modules/.vite") { Remove-Item "node_modules/.vite" -Recurse -Force }
if (Test-Path "node_modules/.cache") { Remove-Item "node_modules/.cache" -Recurse -Force }

# 3. Search and destroy in all files
$files = Get-ChildItem -Path . -Recurse -Include *.js,*.jsx,*.ts,*.tsx,*.html,*.json,*.config.* -File | Where-Object { 
    $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.git"
}

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw
        if ($content -match "FORCE LOCALHOST OVERRIDE ACTIVE") {
            Write-Host "?? REMOVING INJECTION FROM: $($file.FullName)" -ForegroundColor Red
            # Remove the entire script block
            $cleanContent = $content -replace '(?s)// =+ FORCE LOCALHOST.*?// =+ FORCE LOCALHOST.*?\n', ''
            $cleanContent = $cleanContent -replace '(?s)function overrideBackendURL.*?\n}\n', ''
            $cleanContent = $cleanContent -replace 'exports\.__esModule = true;', ''
            $cleanContent = $cleanContent -replace 'exports\.default = ', 'export default '
            $cleanContent = $cleanContent -replace 'exports\.(\w+) = ', 'export const $1 = '
            
            $cleanContent | Set-Content $file.FullName
        }
    } catch {
        Write-Host "Could not process: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "? CLEANUP COMPLETE!" -ForegroundColor Green
