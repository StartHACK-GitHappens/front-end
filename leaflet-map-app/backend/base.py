from flask import Flask, request
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
    return {"humidity": ""}

@app.get("/diseaseRisk/corn")
def get_diseaseRisk_corn():
    """
    Get the disease risk of corn for a day in the future. Today's date is not accepted.
    """
    headers = {
        'ApiKey': DISEASE_RISK_API_KEY,
    }
    lat = 47
    lng = 7
    startDate = "2024-03-25"
    endDate = startDate
    modelName = request.args.get('modelName')
    response = requests.get(CORN_RISK_URL.format(lat, lng, startDate, endDate, modelName), headers=headers)
    data = process_response(response)
    if data:
        diseaseRisk = process_diseaseRisk_corn(data[0]["value"])
        return {"diseaseRisk": diseaseRisk}
    return {"diseaseRisk": ""}


if __name__ == "__main__":
    app.run()