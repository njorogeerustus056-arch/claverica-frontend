# First, let's see what we need to add
import sys
sys.path.append('.')
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
import django
django.setup()

from accounts.models import Account

# Fields frontend will send
frontend_fields = {
    'phone': 'CharField',
    'doc_type': 'CharField', 
    'doc_number': 'CharField',
    'street': 'CharField',
    'city': 'CharField',
    'state': 'CharField',
    'zip_code': 'CharField',
    'occupation': 'CharField',
    'employer': 'CharField',
    'income_range': 'CharField',
}

print("Checking which fields to add...")
existing_fields = [f.name for f in Account._meta.fields]

fields_to_add = []
for field_name, field_type in frontend_fields.items():
    if field_name not in existing_fields:
        fields_to_add.append((field_name, field_type))
        print(f"  Need to add: {field_name} ({field_type})")

if fields_to_add:
    print(f"\nTotal fields to add: {len(fields_to_add)}")
else:
    print("\n✓ All fields already exist in model!")
