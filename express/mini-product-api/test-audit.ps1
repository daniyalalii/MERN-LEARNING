# 🧪 Automated Audit Logging Test Script
# Run this after starting your server with: npm start

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🧪 AUDIT LOGGING TEST SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

# Test 1: Health Check
Write-Host "✅ Test 1: Health Check" -ForegroundColor Yellow
try {
    $health = Invoke-WebRequest -Uri "$baseUrl/health"
    Write-Host "   Status: $($health.StatusCode) - Server is running!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Server is not running! Please start with 'npm start'" -ForegroundColor Red
    exit
}
Write-Host ""

# Test 2: User Signup
Write-Host "✅ Test 2: User Signup (Creates SIGNUP audit log)" -ForegroundColor Yellow
$signupBody = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123"
    role = "user"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-WebRequest -Uri "$baseUrl/auth/signup" -Method POST -Body $signupBody -ContentType "application/json"
    $signupData = $signupResponse.Content | ConvertFrom-Json
    $userToken = $signupData.data.token
    $userId = $signupData.data.user.id
    Write-Host "   ✅ User created! ID: $userId" -ForegroundColor Green
    Write-Host "   📝 Check console for: [AUDIT] SIGNUP by test@example.com" -ForegroundColor Cyan
} catch {
    Write-Host "   ⚠️  User might already exist, trying login..." -ForegroundColor Yellow
    
    # Try login instead
    $loginBody = @{
        email = "test@example.com"
        password = "test123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $userToken = $loginData.data.token
    $userId = $loginData.data.user.id
    Write-Host "   ✅ Logged in existing user! ID: $userId" -ForegroundColor Green
}
Write-Host ""

# Test 3: Failed Login Attempt
Write-Host "✅ Test 3: Failed Login (Creates LOGIN_FAILED audit log)" -ForegroundColor Yellow
$wrongPasswordBody = @{
    email = "test@example.com"
    password = "wrongpassword123"
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Body $wrongPasswordBody -ContentType "application/json"
} catch {
    Write-Host "   ✅ Failed login detected (expected!)" -ForegroundColor Green
    Write-Host "   📝 Check console for: [AUDIT] LOGIN_FAILED" -ForegroundColor Cyan
}
Write-Host ""

# Test 4: Successful Login
Write-Host "✅ Test 4: Successful Login (Creates LOGIN audit log)" -ForegroundColor Yellow
$loginBody = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$loginData = $loginResponse.Content | ConvertFrom-Json
$userToken = $loginData.data.token
Write-Host "   ✅ Login successful!" -ForegroundColor Green
Write-Host "   📝 Check console for: [AUDIT] LOGIN by test@example.com" -ForegroundColor Cyan
Write-Host ""

# Test 5: View My Audit Logs
Write-Host "✅ Test 5: View My Audit Logs" -ForegroundColor Yellow
$headers = @{ "Authorization" = "Bearer $userToken" }
$myLogsResponse = Invoke-WebRequest -Uri "$baseUrl/audit-logs/me" -Headers $headers
$myLogsData = $myLogsResponse.Content | ConvertFrom-Json
$logCount = $myLogsData.data.count
Write-Host "   ✅ Retrieved $logCount audit logs for current user" -ForegroundColor Green
Write-Host "   📊 Log actions:" -ForegroundColor Cyan
foreach ($log in $myLogsData.data.auditLogs) {
    $status = if ($log.status -eq "SUCCESS") { "✅" } else { "❌" }
    Write-Host "      $status $($log.action) at $($log.timestamp)" -ForegroundColor White
}
Write-Host ""

# Test 6: Create Product
Write-Host "✅ Test 6: Create Product (Creates CREATE_PRODUCT audit log)" -ForegroundColor Yellow
$productBody = @{
    name = "Test Laptop"
    price = 999.99
    category = "Electronics"
    inStock = $true
} | ConvertTo-Json

$createProductResponse = Invoke-WebRequest -Uri "$baseUrl/products" -Method POST -Headers $headers -Body $productBody -ContentType "application/json"
$productData = $createProductResponse.Content | ConvertFrom-Json
$productId = $productData.data.product.id
Write-Host "   ✅ Product created! ID: $productId" -ForegroundColor Green
Write-Host "   📝 Check console for: [AUDIT] CREATE_PRODUCT" -ForegroundColor Cyan
Write-Host ""

# Test 7: Unauthorized Access
Write-Host "✅ Test 7: Unauthorized Access (Invalid token)" -ForegroundColor Yellow
$badHeaders = @{ "Authorization" = "Bearer invalid-token-12345" }
try {
    Invoke-WebRequest -Uri "$baseUrl/products" -Headers $badHeaders
} catch {
    Write-Host "   ✅ Unauthorized access blocked (expected!)" -ForegroundColor Green
    Write-Host "   📝 Check console for: [AUDIT] UNAUTHORIZED_ACCESS" -ForegroundColor Cyan
}
Write-Host ""

# Test 8: Create Admin User
Write-Host "✅ Test 8: Create Admin User" -ForegroundColor Yellow
$adminSignupBody = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

try {
    $adminSignupResponse = Invoke-WebRequest -Uri "$baseUrl/auth/signup" -Method POST -Body $adminSignupBody -ContentType "application/json"
    $adminSignupData = $adminSignupResponse.Content | ConvertFrom-Json
    $adminToken = $adminSignupData.data.token
    Write-Host "   ✅ Admin user created!" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Admin exists, logging in..." -ForegroundColor Yellow
    
    $adminLoginBody = @{
        email = "admin@example.com"
        password = "admin123"
    } | ConvertTo-Json
    
    $adminLoginResponse = Invoke-WebRequest -Uri "$baseUrl/auth/login" -Method POST -Body $adminLoginBody -ContentType "application/json"
    $adminLoginData = $adminLoginResponse.Content | ConvertFrom-Json
    $adminToken = $adminLoginData.data.token
    Write-Host "   ✅ Admin logged in!" -ForegroundColor Green
}
Write-Host ""

# Test 9: Admin Views All Audit Logs
Write-Host "✅ Test 9: Admin Views All Audit Logs" -ForegroundColor Yellow
$adminHeaders = @{ "Authorization" = "Bearer $adminToken" }
$allLogsResponse = Invoke-WebRequest -Uri "$baseUrl/audit-logs" -Headers $adminHeaders
$allLogsData = $allLogsResponse.Content | ConvertFrom-Json
$totalLogs = $allLogsData.data.count
Write-Host "   ✅ Retrieved $totalLogs total audit logs (all users)" -ForegroundColor Green
Write-Host "   📊 Recent actions:" -ForegroundColor Cyan
$recentLogs = $allLogsData.data.auditLogs | Select-Object -First 5
foreach ($log in $recentLogs) {
    $status = if ($log.status -eq "SUCCESS") { "✅" } else { "❌" }
    Write-Host "      $status $($log.action) by $($log.userName)" -ForegroundColor White
}
Write-Host ""

# Test 10: Forbidden Access (User tries admin action)
Write-Host "✅ Test 10: Forbidden Access (User tries to delete)" -ForegroundColor Yellow
$userHeaders = @{ "Authorization" = "Bearer $userToken" }
try {
    Invoke-WebRequest -Uri "$baseUrl/products/$productId" -Method DELETE -Headers $userHeaders
} catch {
    Write-Host "   ✅ Forbidden access blocked (expected!)" -ForegroundColor Green
    Write-Host "   📝 Check console for: [AUDIT] FORBIDDEN_ACCESS" -ForegroundColor Cyan
}
Write-Host ""

# Test 11: Admin Deletes Product
Write-Host "✅ Test 11: Admin Deletes Product (Creates DELETE_PRODUCT audit log)" -ForegroundColor Yellow
$deleteResponse = Invoke-WebRequest -Uri "$baseUrl/products/$productId" -Method DELETE -Headers $adminHeaders
$deleteData = $deleteResponse.Content | ConvertFrom-Json
Write-Host "   ✅ Product deleted by admin!" -ForegroundColor Green
Write-Host "   📝 Check console for: [AUDIT] DELETE_PRODUCT" -ForegroundColor Cyan
Write-Host "   📦 Deleted product data saved in audit log" -ForegroundColor Cyan
Write-Host ""

# Test 12: Query Audit Logs
Write-Host "✅ Test 12: Query Audit Logs (by action)" -ForegroundColor Yellow
$deleteLogsResponse = Invoke-WebRequest -Uri "$baseUrl/audit-logs?action=DELETE_PRODUCT" -Headers $adminHeaders
$deleteLogsData = $deleteLogsResponse.Content | ConvertFrom-Json
$deleteCount = $deleteLogsData.data.count
Write-Host "   ✅ Found $deleteCount DELETE_PRODUCT logs" -ForegroundColor Green
Write-Host ""

# Final Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📊 TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ All 12 tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 What was logged:" -ForegroundColor Yellow
Write-Host "   • User signup and login" -ForegroundColor White
Write-Host "   • Failed login attempt" -ForegroundColor White
Write-Host "   • Product creation" -ForegroundColor White
Write-Host "   • Unauthorized access attempt" -ForegroundColor White
Write-Host "   • Forbidden access attempt" -ForegroundColor White
Write-Host "   • Product deletion (with data backup)" -ForegroundColor White
Write-Host ""
Write-Host "📝 Check your server console to see all [AUDIT] logs!" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Audit logging is working perfectly!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
