# CONVERT ALL COMMONJS TO ES MODULES
Write-Host "?? CONVERTING COMMONJS FILES..." -ForegroundColor Red

$files = @(
    "src/components/common/ScrollToTop.js",
    "src/components/escrow/index.js",
    "src/config/api.js",
    "src/data/cryptoCoins.js",
    "src/data/fiatPlatforms.js",
    "src/data/globalBanks.js",
    "src/data/projects.js",
    "src/hooks/useDashboardData.js",
    "src/hooks/useExchangeRates.js",
    "src/hooks/useGoBack.js",
    "src/hooks/useKYC.js",
    "src/hooks/useModal.js",
    "src/icons/index.js",
    "src/lib/api/client.js",
    "src/lib/api/cryptoApi.js",
    "src/lib/api/kyc.js",
    "src/lib/services/notificationService.js",
    "src/lib/utils/kycCreatives.js",
    "src/lib/utils/userTiers.js",
    "src/services/dumpster.js",
    "src/utils/cn.js",
    "src/utils/cookies.js",
    "src/utils/fileValidation.js",
    "src/utils/mockData.js",
    "src/api.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Converting: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        
        # Convert CommonJS exports to ES modules
        $newContent = $content -replace 'exports\.(\w+)\s*=\s*(\w+);', 'export const $1 = $2;'
        $newContent = $newContent -replace 'module\.exports\s*=\s*(\w+);', 'export default $1;'
        $newContent = $newContent -replace 'exports\.default\s*=\s*(\w+);', 'export default $1;'
        $newContent = $newContent -replace 'exports\.__esModule\s*=\s*true;', ''
        
        # Add export statements for multiple exports
        if ($newContent -match 'export const \w+ = \w+;' -and $newContent -notmatch '^export ') {
            # Already has exports, good
        } elseif ($newContent -match 'const \w+ =') {
            # Add export before each const
            $newContent = $newContent -replace '^const (\w+) =', 'export const $1 ='
        }
        
        if ($newContent -ne $content) {
            $newContent | Set-Content $file
            Write-Host "  ? Converted" -ForegroundColor Green
        } else {
            Write-Host "  ??  No changes needed" -ForegroundColor Gray
        }
    }
}

Write-Host "`n? ALL FILES CONVERTED!" -ForegroundColor Green
