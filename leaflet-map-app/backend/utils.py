def process_response(response):
    if response.status_code == 200:
        data = response.json()
        print(data)
        if len(data) == 0:
            print("No forecast is made in this region")
        return data
    elif response.status_code == 204:
        print("There is no such latitude and longitude!")
        return None
    else:
        print("Error:", response.status_code)
        return None

def process_diseaseRisk_potato(val):
    val_to_risk = {'0': 'No risk', '1': 'Low risk', '2': 'High risk'}
    return val_to_risk[val]
    
def process_diseaseRisk_cereal(val):
    val_to_risk = {'0': 'No risk', '1': 'Low risk', '2': 'Medium risk', '3': 'High risk'}
    return val_to_risk[val]

def process_diseaseRisk_turf(val):
    val_to_risk = {'0': 'No risk', '1': 'Very low risk', '2': 'Low risk', '3': 'Medium risk', '4': 'High risk'}
    return val_to_risk[val]

def process_diseaseRisk_apple(val):
    return int(val)