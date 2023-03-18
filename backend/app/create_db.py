import json
from .models import Location, db
import os

def load_json(filename):
    script_dir = os.path.dirname(__file__)
    cur = script_dir + filename
    with open(cur) as file:
        jsn = json.load(file)
        file.close()
    return jsn

def create_locations():
    locations = load_json('/data/locations.json')
    for location in locations:
        City = location["City"]
        State = location["State"]
        Population = location["Population"]
        Budget = location["Budget"]
        Safety = location["Safety"]
        Average_rat = location["Average Rating"]
        Guide = location["Guide"]

        newLocation = Location(
            City=City, State=State, Population=Population, Budget=Budget, Safety=Safety, Average_rat=Average_rat, Guide=Guide)
        # After I create the book, I can then add it to my session.
        db.session.add(newLocation)
        # commit the session to my DB.
        db.session.commit()

