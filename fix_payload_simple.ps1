// Fix the payload in SignUpForm.tsx
$filePath = "src\components\auth\SignUpForm.tsx"
$content = Get-Content $filePath -Raw

# Backup first
Copy-Item $filePath "$filePath.backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# Replace the entire payload section
$oldPayload = 'const payload = {
                  firstName: values.fname.trim(),
                  lastName: values.lname.trim(),
                  email: values.email.trim().toLowerCase(),
                  password: values.password,
                  document: {
                    type: values.docType,
                    number: values.docNumber.trim(),
                  },
                  address: {
                    street: values.street.trim(),
                    city: values.city.trim(),
                    state: values.state.trim(),
                    zip: values.zip.trim(),
                  },
                  phone: values.phone.trim() || undefined,
                  employment: showEmployment
                    ? {
                        occupation: values.occupation.trim(),
                        employer: values.employer.trim(),
                        incomeRange: values.incomeRange,
                      }
                    : undefined,
                };'

$newPayload = 'const payload = {
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

$content = $content -replace [regex]::Escape($oldPayload), $newPayload

# Save the file
$content | Set-Content $filePath -Encoding UTF8
Write-Host "✅ Frontend payload fixed!" -ForegroundColor Green
Write-Host "Changed camelCase to snake_case and removed nested objects" -ForegroundColor Cyan
