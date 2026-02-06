import json

# EXACT payload that frontend sends (based on what we saw)
frontend_payload = {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "TestPassword123!",
    "document": {
        "type": "passport",
        "number": "TEST123456"
    },
    "address": {
        "street": "123 Test St",
        "city": "Test City",
        "state": "TS",
        "zip": "12345"
    },
    "phone": "+1234567890",
    "employment": {
        "occupation": "Software Developer",
        "employer": "Test Corp",
        "incomeRange": "50k-100k"
    }
}

print("=== FRONTEND PAYLOAD STRUCTURE ===")
print(json.dumps(frontend_payload, indent=2))

print("\n=== WHAT DJANGO EXPECTS ===")
print("Based on serializer, Django expects:")
print("  - email")
print("  - first_name (not firstName)")
print("  - last_name (not lastName)")
print("  - password")
print("  - confirm_password (MISSING from frontend!)")
print("  - Flat fields, not nested objects")

print("\n=== ACTION REQUIRED ===")
print("1. Frontend MUST send 'confirm_password' field")
print("2. Frontend should flatten nested objects OR")
print("3. Django serializer should handle nested objects")
