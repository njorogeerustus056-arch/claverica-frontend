print("=" * 60)
print("BACKEND DIAGNOSTIC")
print("=" * 60)

import os
import sys

# Add current directory to path
sys.path.append('.')

# Try to import settings
try:
    import settings
    print("✓ Settings imported")
    
    # Check AUTH_USER_MODEL
    if hasattr(settings, 'AUTH_USER_MODEL'):
        print(f"AUTH_USER_MODEL: {settings.AUTH_USER_MODEL}")
    else:
        print("✗ No AUTH_USER_MODEL in settings")
        
except Exception as e:
    print(f"✗ Cannot import settings: {e}")

print()

# Check directories
print("Directory structure:")
apps = ['accounts', 'users']
for app in apps:
    if os.path.exists(app):
        print(f"✓ {app}/ exists")
        # Check key files
        files = ['models.py', 'views.py', 'serializers.py', 'urls.py']
        for file in files:
            if os.path.exists(os.path.join(app, file)):
                print(f"  - {file}")
    else:
        print(f"✗ {app}/ does not exist")

print()
print("=" * 60)
