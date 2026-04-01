from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


station = [
    {
        "station_id": 1,
        "adress": "Короленко 26А",
        "connector_type":"CCS",
        "power":"100 кВт",
        "number_of_slots":4,
        "status":"работает",
        "busy": False
    },
    {
        "station_id": 2,
        "adress": "Николая Ершова 65",
        "connector_type":"CHAdeMO",
        "power":"120 кВт",
        "number_of_slots":5,
        "status":"на обслуживании",
        "busy": True
    },
    {
        "station_id": 3,
        "adress": "Рауиса Гареева 12",
        "connector_type":"Type 2 ",
        "power":"90 кВт",
        "number_of_slots":2,
        "status":"заблокирована",
        "busy": True
    }
]

class StationCreate(BaseModel):
    station_id: int
    adress: str
    connector_type:str
    power:str
    number_of_slots:int
    status: str



@app.get("/")
def root():
    return {"hello"}


# Управление станциями 
# Хранение информации о станции

@app.get("/Station_Management/receiving_stations")
def get_station():

    return station

@app.get("/Station_Management/receiving_stations/{station_id}")
def get_station_id(station_id: int):
    for i in station:
        if i["station_id"] == station_id:
            return i
    return {"такой станции нет"}

@app.post("/Station_Management/create_station")
def post_station(new_station: StationCreate):
     for i in station:
         if i["adress"] == new_station.adress:
             return {"message": "На этом адресе уже стоит станция"}
     return {
        "message": "Станция создана",
        "station": new_station
    }

@app.patch("/Station_Management/receiving_stations/{station_id}/change_station")
def update_station_partial(station_id: int, station: StationCreate):
    return {"message": f"Станция {station_id} частично обновлена", "data": station}



# Управление слотами и бронированиями 

@app.get("/View_available_slots")
def get_available_slots():
    find_station = []
    for i in station: 
        if i["busy"] == False:
            find_station.append(i)
    return find_station
    