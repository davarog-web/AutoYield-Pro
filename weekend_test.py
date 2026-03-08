import requests
import json

# 1. THE MIRROR SERVER (No API key needed!)
url = "https://httpbin.org/post"

# 2. THE SYNTHSCALE MATH 
theoretical_volume = 10.0
degradation_penalty = 0.42
adjusted_volume = 10.42

# 3. THE PAYLOAD (Your Benchling folder ID is ready for Monday)
synthscale_payload = {
    "name": "SynthScale Adjustment: Fmoc-AA",
    "folderId": "lib_NANBblpq7U",  
    "fields": {
        "Theoretical Volume (mL)": {"value": str(theoretical_volume)},
        "Degradation Penalty": {"value": "+" + str(degradation_penalty)},
        "Adjusted Execution Volume (mL)": {"value": str(adjusted_volume)},
        "Status": {"value": "Requires AuditPath Verification"}
    }
}

# 4. THE DELIVERY
headers = {"Content-Type": "application/json"}
print("Sending SynthScale data to the test server...\n")

response = requests.post(url, json=synthscale_payload, headers=headers)

# 5. THE VERIFICATION
if response.status_code == 200:
    print("Success! The server caught your data. Here is exactly what it received:")
    # This prints out the mirror reflection from httpbin
    print(json.dumps(response.json()['json'], indent=2))
else:
    print(f"Error: {response.status_code}")
