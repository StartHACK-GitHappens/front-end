from flask import Flask
from flask_cors import CORS, cross_origin
import requests

from paths import *
from utils import *

app = Flask(__name__)
CORS(app)

@app.get("/forecast/humidityDailyAvg")
def get_humidity_daily_avg():
    headers = {
        'ApiKey': FORECAST_API_KEY,
    }
    lat = 47
    lng = 7
    startDate = "2024-03-20"
    endDate = "2024-03-21"
    response = requests.get(HUMIDITY_DAILY_AVG_URL.format(lat, lng, startDate, endDate), headers=headers)
    data = process_response(response)
    if data:
        humidity = data[0]["dailyValue"]
        return {"humidity": humidity}

# @app.get("/forecast/humidityHourly")
# def get_humidity_hourly():
#     headers = {
#         'ApiKey': FORECAST_API_KEY,
#     }
#     lat = 47
#     lng = 7
#     startDate = "2024-03-20"
#     endDate = "2024-03-21"
#     response = requests.get(HUMIDITY_HOURLY_URL.format(lat, lng, startDate, endDate), headers=headers)
#     data = process_response(response)
#     if data:
#         humidity = data[0]["dailyValue"]
#         return {"humidity": humidity}

@app.get("/diseaseRisk/potato")
def get_diseaseRisk_potato():
    """
    Get the disease risk of potato for a day in the future. Today's date is not accepted.
    """
    headers = {
        'ApiKey': DISEASE_RISK_API_KEY,
    }
    lat = 47
    lng = 7
    startDate = "2024-03-25"
    endDate = startDate
    response = requests.get(HUMIDITY_DAILY_AVG_URL.format(lat, lng, startDate, endDate), headers=headers)
    data = process_response(response)
    if data:
        relativeHumidity = data[0]["dailyValue"]
    response = requests.get(POTATO_RISK_URL.format(lat, lng, startDate, endDate, relativeHumidity), headers=headers)
    data = process_response(response)
    if data:
        diseaseRisk = process_diseaseRisk_potato(data[0]["value"])
    return {"diseaseRisk": diseaseRisk}

@app.get("/diseaseRisk/cereal")
def get_diseaseRisk_cereal():
    """
    Get the disease risk of cereal for a day in the future. Today's date is not accepted.
    """
    headers = {
        'ApiKey': DISEASE_RISK_API_KEY,
    }
    lat = 47
    lng = 7
    startDate = "2024-03-25"
    endDate = startDate
    response = requests.get(CEREAL_RISK_URL.format(lat, lng, startDate, endDate), headers=headers)
    data = process_response(response)
    if data:
        diseaseRisk = process_diseaseRisk_cereal(data[0]["value"])
    return {"diseaseRisk": diseaseRisk}

@app.get("/diseaseRisk/turf")
def get_diseaseRisk_turf():
    """
    Get the disease risk of turf for a day in the future. Today's date is not accepted.
    """
    headers = {
        'ApiKey': DISEASE_RISK_API_KEY,
    }
    lat = 47
    lng = 7
    startDate = "2024-03-25"
    endDate = startDate
    model_names = ["AnthracnoseFoliarBlight", "BrownPatchRiskIrrigated", "CrabgrassGerminationRisk"]
    disease_risks = []
    for model_name in model_names:
        response = requests.get(TURF_RISK_URL.format(lat, lng, startDate, endDate, model_name), headers=headers)
        data = process_response(response)
        if data:
            diseaseRisk = process_diseaseRisk_turf(data[0]["value"])
            disease_risks.append(diseaseRisk)
    return disease_risks

@app.get("/diseaseRisk/apple")
def get_diseaseRisk_apple():
    """
    Get the disease risk of apple for a day in the future. Today's date is not accepted.
    """
    headers = {
        'ApiKey': DISEASE_RISK_API_KEY,
    }
    lat = 47
    lng = 7
    startDate = "2024-03-25"
    endDate = startDate
    model_names = ["AppleBlossomFireBlightErwiniaamylovora", "AppleScabFusicladiumVenturiainaequalis"]
    disease_risks = []
    for model_name in model_names:
        response = requests.get(APPLE_RISK_URL.format(lat, lng, startDate, endDate, model_name), headers=headers)
        data = process_response(response)
        if data:
            diseaseRisk = process_diseaseRisk_turf(data[0]["value"])
            disease_risks.append(diseaseRisk)
    return disease_risks


if __name__ == "__main__":
    app.run()