import json
from .models import Location, Job, db
import os

cities = [
    "new york, ny",
    "los-angeles",
    "chicago",
    "houston",
    "phoenix",
    "philadelphia",
    "san-antonio",
    "san-diego",
    "dallas",
    "san-jose",
    "austin",
    "jacksonville",
    "fort-worth",
    "columbus",
    "indianapolis",
    "charlotte",
    "san-francisco",
    "seattle",
    "denver",
    "oklahoma-city",
    "nashville",
    "el-paso",
    "washington-dc",
    "boston",
    "las-vegas",
    "portland",
    "detroit",
    "louisville",
    "memphis",
    "baltimore",
]

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

def create_jobs():
    uniqueNames = []
    
    for city in cities:
        new_city = load_json("/data/jobsByCity/" + city + "Jobs.json")
        
        curr_city = []
        for i in new_city:
            if(i["JvID"] not in uniqueNames):
                uniqueNames.append(i["JvID"])
                curr_city.append(i)

        for job in curr_city:
            Id = job["JvID"]
            JobTitle = job["JobTitle"]
            Company = job["Company"]
            DatePosted = job["DatePosted"]
            Url = job["Url"]
            JobLocation = job["Location"]
            OnetCode = job["OnetCode"]

            newJob = Job(
                Id=Id, JobTitle=JobTitle, Company=Company, DatePosted=DatePosted, Url=Url, JobLocation=JobLocation, OnetCode=OnetCode)
            # After I create the book, I can then add it to my session.
            db.session.add(newJob)
            # commit the session to my DB.
            db.session.commit()
