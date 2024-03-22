FORECAST_API_KEY = "7850c5bb-4784-4636-9187-d3b41cae4c18"
HISTORICAL_API_KEY = "syn-fug2873g2p8fw"
DISEASE_RISK_API_KEY = FORECAST_API_KEY

BASE_URL = "https://services.cehub.syngenta-ais.com/api/"
HUMIDITY_DAILY_AVG_URL = "https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastDaily?latitude={}&longitude={}&startDate={}&endDate={}&supplier=Meteoblue&measureLabel=HumidityRel_DailyAvg%20%28pct%29%3B&format=json"
HUMIDITY_HOURLY_URL = "https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastHourly?latitude={}&longitude={}&startDate={}&endDate={}&supplier=Meteoblue&measureLabel=HumidityRel_Hourly%20%28pct%29&format=json"

# ConventionalSmithBlight
POTATO_RISK_URL = "https://services.cehub.syngenta-ais.com/api/DiseaseRisk/PotatoRisk?latitude={}&longitude={}&startDate={}&endDate={}&modelId=ConventionalSmithBlight&relativeHumidity={}"

# WheatSeptoriaLeafBlotchRisk
CEREAL_RISK_URL = "https://services.cehub.syngenta-ais.com/api/DiseaseRisk/CerealRisk?latitude={}&longitude={}&startDate={}&endDate={}&modelId=WheatSeptoriaLeafBlotchRisk&datasetLabel=NEMSAUTO"

TURF_RISK_URL = "https://services.cehub.syngenta-ais.com/api/DiseaseRisk/TurfRisk?latitude={}&longitude={}&startDate={}&endDate={}&modelId={}&datasetLabel=NEMSAUTO"

APPLE_RISK_URL = "https://services.cehub.syngenta-ais.com/api/DiseaseRisk/AppleRisk?latitude={}&longitude={}&startDate={}&endDate={}&modelId={}&datasetLabel=NEMSAUTO"

CORN_RISK_URL = "https://services.cehub.syngenta-ais.com/api/DiseaseRisk/CornRisk?latitude={}&longitude={}&startDate={}&endDate={}&modelId={}&datasetLabel=NEMSAUTO"