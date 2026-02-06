$testLogin = @{
    email = "njorogeerustus056@gmail.com"
    password = "38876879Eruz@"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/accounts/login/" `
        -Method Post `
        -ContentType "application/json" `
        -Body $testLogin `
        -UseBasicParsing
    
    Write-Host "✅ Backend login endpoint works!" -ForegroundColor Green
    Write-Host "Response status: $($response.StatusCode)"
    $responseData = $response.Content | ConvertFrom-Json
    if ($responseData.success) {
        Write-Host "✅ Login successful via API" -ForegroundColor Green
        Write-Host "Account number: $($responseData.account.account_number)"
    }
} catch {
    Write-Host "❌ Backend login failed:" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Error: $($_.ErrorDetails.Message)"
}
