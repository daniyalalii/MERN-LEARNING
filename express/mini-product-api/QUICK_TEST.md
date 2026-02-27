# 🎯 Quick Test Script - Audit Logging

Copy and paste these commands one by one in PowerShell to test audit logging:

## 1️⃣ Start Server
```powershell
cd "d:\My Data\Web-Dev\MERN-LEARNING\express\mini-product-api"
npm start
```

---

## 2️⃣ Signup & Login
```powershell
# Signup
$signup = @{ name="Test User"; email="test@example.com"; password="test123"; role="user" } | ConvertTo-Json
$signupRes = Invoke-WebRequest -Uri http://localhost:3000/auth/signup -Method POST -Body $signup -ContentType "application/json"
$token = ($signupRes.Content | ConvertFrom-Json).data.token
Write-Host "✅ User created! Token: $token" -ForegroundColor Green

# Login
$login = @{ email="test@example.com"; password="test123" } | ConvertTo-Json
$loginRes = Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $login -ContentType "application/json"
$token = ($loginRes.Content | ConvertFrom-Json).data.token
Write-Host "✅ Logged in! Token saved" -ForegroundColor Green
```

---

## 3️⃣ View Your Audit Logs
```powershell
$headers = @{ "Authorization" = "Bearer $token" }
$myLogs = Invoke-WebRequest -Uri http://localhost:3000/audit-logs/me -Headers $headers
$myLogs.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
Write-Host "✅ Your audit logs retrieved!" -ForegroundColor Green
```

---

## 4️⃣ Test Failed Login (Creates Audit Log)
```powershell
$wrong = @{ email="test@example.com"; password="wrongpass" } | ConvertTo-Json
try {
    Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $wrong -ContentType "application/json"
} catch {
    Write-Host "✅ Failed login logged!" -ForegroundColor Yellow
}
```

---

## 5️⃣ Create Product
```powershell
$product = @{ name="Test Product"; price=99.99; category="Test"; inStock=$true } | ConvertTo-Json
$productRes = Invoke-WebRequest -Uri http://localhost:3000/products -Method POST -Headers $headers -Body $product -ContentType "application/json"
Write-Host "✅ Product created & logged!" -ForegroundColor Green
```

---

## 6️⃣ Create Admin User
```powershell
$adminSignup = @{ name="Admin"; email="admin@example.com"; password="admin123"; role="admin" } | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3000/auth/signup -Method POST -Body $adminSignup -ContentType "application/json"

$adminLogin = @{ email="admin@example.com"; password="admin123" } | ConvertTo-Json
$adminRes = Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $adminLogin -ContentType "application/json"
$adminToken = ($adminRes.Content | ConvertFrom-Json).data.token
Write-Host "✅ Admin created! Token saved" -ForegroundColor Green
```

---

## 7️⃣ Admin Views All Logs
```powershell
$adminHeaders = @{ "Authorization" = "Bearer $adminToken" }
$allLogs = Invoke-WebRequest -Uri http://localhost:3000/audit-logs -Headers $adminHeaders
$allLogs.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
Write-Host "✅ All audit logs retrieved!" -ForegroundColor Green
```

---

## 8️⃣ Test Forbidden Access (User tries to delete)
```powershell
$headers = @{ "Authorization" = "Bearer $token" }
try {
    Invoke-WebRequest -Uri http://localhost:3000/products/1 -Method DELETE -Headers $headers
} catch {
    Write-Host "✅ Forbidden access logged!" -ForegroundColor Yellow
}
```

---

## 9️⃣ Admin Deletes Product
```powershell
$adminHeaders = @{ "Authorization" = "Bearer $adminToken" }
$deleteRes = Invoke-WebRequest -Uri http://localhost:3000/products/1 -Method DELETE -Headers $adminHeaders
Write-Host "✅ Product deleted & logged!" -ForegroundColor Green
```

---

## 🔟 Query Audit Logs
```powershell
# By user ID
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?userId=1" -Headers $adminHeaders | Select-Object -Expand Content

# By action
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?action=DELETE_PRODUCT" -Headers $adminHeaders | Select-Object -Expand Content

# Recent logs
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?limit=5" -Headers $adminHeaders | Select-Object -Expand Content
```

---

## ✅ Expected Console Output

You should see:
```
[AUDIT] SIGNUP by test@example.com (1) - SUCCESS
[AUDIT] LOGIN by test@example.com (1) - SUCCESS
[AUDIT] LOGIN_FAILED by test@example.com (1) - FAILURE
[AUDIT] CREATE_PRODUCT by test@example.com (1) - SUCCESS
[AUDIT] UNAUTHORIZED_ACCESS by anonymous (unknown) - FAILURE
[AUDIT] SIGNUP by admin@example.com (2) - SUCCESS
[AUDIT] LOGIN by admin@example.com (2) - SUCCESS
[AUDIT] FORBIDDEN_ACCESS by test@example.com (1) - FAILURE
[AUDIT] DELETE_PRODUCT by admin@example.com (2) - SUCCESS
```

---

## 🎉 Success!

If you see audit logs with:
- ✅ Timestamps
- ✅ User IDs and emails
- ✅ Actions (SIGNUP, LOGIN, DELETE, etc.)
- ✅ IP addresses and user agents
- ✅ Success/Failure status
- ✅ Details (product data, failure reasons)

**Your audit logging is working perfectly! 🚀**
