import requests
import json

print("Testing registration endpoints...")
print()

# Common registration endpoints
endpoints = [
    ("/api/auth/register/", "accounts app auth"),
    ("/api/accounts/register/", "accounts app direct"),
    ("/api/users/register/", "users app"),
    ("/auth/register/", "simple auth"),
    ("/register/", "root register"),
]

base_url = "http://localhost:8000"

for endpoint, description in endpoints:
    url = base_url + endpoint
    print(f"Testing: {description}")
    print(f"URL: {url}")
    
    # Try OPTIONS first
    try:
        response = requests.options(url, timeout=3)
        print(f"  OPTIONS: {response.status_code}")
    except:
        print("  OPTIONS: Cannot connect")
    
    # Try POST with minimal data
    test_data = {
        "email": "test@example.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    try:
        response = requests.post(
            url,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        print(f"  POST: {response.status_code}")
        
        if response.status_code == 400:
            try:
                errors = response.json()
                print(f"  Validation errors: {list(errors.keys())}")
            except:
                print(f"  Response: {response.text[:100]}")
        elif response.status_code in [200, 201]:
            print("  ✓ Registration successful!")
    except requests.exceptions.ConnectionError:
        print("  ✗ Cannot connect to server")
    except Exception as e:
        print(f"  ✗ Error: {type(e).__name__}")
    
    print()
