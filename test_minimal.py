import requests
import json

# Start with minimal fields
test_data = {
    "email": "minimaltest@example.com",
    "password": "Test123!",
    "confirm_password": "Test123!",
    "first_name": "Test",
    "last_name": "User"
}

print("Testing with minimal fields...")
try:
    response = requests.post(
        "http://localhost:8000/api/auth/register/",
        json=test_data,
        headers={"Content-Type": "application/json", "Origin": "http://localhost:5173"},
        timeout=5
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
