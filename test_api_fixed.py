import requests
import json

# Test data with CORRECT field names (snake_case for Django)
test_data = {
    "email": "testuser@example.com",
    "password": "TestPassword123!",
    "confirm_password": "TestPassword123!",  # Changed from confirmPassword
    "first_name": "Test",
    "last_name": "User",
    "phone": "+1234567890",
    "doc_type": "passport",  # Changed from docType
    "doc_number": "TEST123456",  # Changed from docNumber
    "street": "123 Test St",
    "city": "Test City",
    "state": "TS",
    "zip": "12345",
    "occupation": "Software Developer",
    "employer": "Test Corp",
    "income_range": "50k-100k"  # Changed from incomeRange
}

print("Testing registration endpoint with correct field names...")
print(f"URL: http://localhost:8000/api/auth/register/")

try:
    response = requests.post(
        "http://localhost:8000/api/auth/register/",
        json=test_data,
        headers={
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173"
        },
        timeout=10
    )

    print(f"\nStatus Code: {response.status_code}")

    try:
        response_json = response.json()
        print(f"Response: {json.dumps(response_json, indent=2)}")
    except:
        print(f"Response (text): {response.text}")

    if response.status_code in [200, 201]:
        print("\n✅ Registration successful!")
        if "message" in response_json:
            print(f"   Message: {response_json['message']}")
        # Check if OTP was sent
        if "otp_sent" in response_json or "otp" in response_json:
            print("   OTP should be sent to email (check Django console)")
    elif response.status_code == 400:
        print("\n❌ Validation errors:")
        for field, errors in response_json.items():
            print(f"   {field}: {errors}")
    else:
        print(f"\n❌ Registration failed with status {response.status_code}")

except requests.exceptions.ConnectionError:
    print("\n❌ Cannot connect to backend. Make sure Django is running:")
    print("   python manage.py runserver 8000")
except Exception as e:
    print(f"\n❌ Error: {type(e).__name__}: {e}")
