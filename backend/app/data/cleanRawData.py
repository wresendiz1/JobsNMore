cities = [
    {"new york, ny":1},
    {"los-angeles":2},
    {"chicago":3},
    {"houston":4},
    {"phoenix": 5},
    {"philadelphia":6},
    {"san-antonio":7},
    {"san-diego":8},
    {"dallas":9},
    {"san-jose":10},
    {"austin":11},
    {"jacksonville":12},
    {"fort-worth":13},
    {"columbus":14},
    {"indianapolis":15},
    {"charlotte":16},
    {"san-francisco":17},
    {"seattle":18},
    {"denver":19},
    {"oklahoma-city":20},
    {"nashville":21},
    {"el-paso":22},
    {"washington-dc":23},
    {"boston":24},
    {"las-vegas":25},
    {"portland":26},
    {"detroit":27},
    {"louisville":28},
    {"memphis":29},
    {"baltimore":30},
]

states_id = [
    "new-york-ny",
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
    "washington",
    "boston",
    "las-vegas",
    "portland",
    "detroit",
    "louisville",
    "memphis",
    "baltimore",
]

"""
import requests
import json
import re
import os

access_key = "a6535523bd370b8f323daba25fa4b099"
secret_key = "45d8b14126edb05120cde17e7cc24c32"

states_id = [
    {"new york-ny":1},
    {"los-angeles":2},
    {"chicago":3},
    {"houston":4},
    {"phoenix": 5},
    {"philadelphia":6},
    {"san-antonio":7},
    {"san-diego":8},
    {"dallas":9},
    {"san-jose":10},
    {"austin":11},
    {"jacksonville":12},
    {"fort-worth":13},
    {"columbus":14},
    {"indianapolis":15},
    {"charlotte":16},
    {"san-francisco":17},
    {"seattle":18},
    {"denver":19},
    {"oklahoma-city":20},
    {"nashville":21},
    {"el-paso":22},
    {"washington-dc":23},
    {"boston":24},
    {"las-vegas":25},
    {"portland":26},
    {"detroit":27},
    {"louisville":28},
    {"memphis":29},
    {"baltimore":30},
]

final_json = []

for curr_city in states_id:
    city = list(curr_city.keys())[0]
    id_req = requests.get(
        "https://api.roadgoat.com/api/v2/destinations/auto_complete?q=" + city + "-usa",
        auth=(access_key, secret_key),
    )
    id = id_req.json()["data"][0]["id"]

    response = requests.get(
        "https://api.roadgoat.com/api/v2/destinations/" + id,
        auth=(access_key, secret_key),
    )
    data, links = response.json()["data"], response.json()["included"]

    city_short = data["attributes"]["short_name"]
    population = data["attributes"]["population"]
    state = data["attributes"]["long_name"].split(", ")[-2]
    budget = data["attributes"]["budget"][next(iter(data["attributes"]["budget"]))][
        "text"
    ]
    safety = data["attributes"]["safety"][next(iter(data["attributes"]["safety"]))][
        "text"
    ]
    rating = data["attributes"]["average_rating"]
    guide = data["attributes"]["getyourguide_url"]
    CityID = curr_city[city]

    filtered = [
        x
        for x in links
        if x["type"] == "photo"
        and re.search(city, x["attributes"]["image"]["large"], re.IGNORECASE)
    ]
    if len(filtered) == 0:
        photos = [x for x in links if x["type"] == "photo"][-1]["attributes"]["image"][
            "large"
        ]
    else:
        photos = [x["attributes"]["image"]["large"] for x in filtered]

    #print(population, state, budget, safety, rating, guide, photos)

    entry = {
        "City": city_short,
        "State": state,
        "Population": population,
        "Budget": budget,
        "Safety": safety,
        "Average Rating": rating,
        "Guide": guide,
        "Photos": photos,
        "CityID": CityID
    }
    final_json.append(entry)

final = json.dumps(final_json, indent=2)
script_dir = os.path.dirname(__file__)
file_path = os.path.join(script_dir, "locations.json")

with open(file_path, "w") as outfile:
    outfile.write(final)
"""
"""
import requests
import json
import os
from concurrent.futures import ThreadPoolExecutor

cities = [
    {"new york, ny":1},
    {"los-angeles":2},
    {"chicago":3},
    {"houston":4},
    {"phoenix": 5},
    {"philadelphia":6},
    {"san-antonio":7},
    {"san-diego":8},
    {"dallas":9},
    {"san-jose":10},
    {"austin":11},
    {"jacksonville":12},
    {"fort-worth":13},
    {"columbus":14},
    {"indianapolis":15},
    {"charlotte":16},
    {"san-francisco":17},
    {"seattle":18},
    {"denver":19},
    {"oklahoma-city":20},
    {"nashville":21},
    {"el-paso":22},
    {"washington-dc":23},
    {"boston":24},
    {"las-vegas":25},
    {"portland":26},
    {"detroit":27},
    {"louisville":28},
    {"memphis":29},
    {"baltimore":30},
]

script_dir = os.path.dirname(__file__)
file_occ = os.path.join(script_dir, "occupations.json")

with open(file_occ) as f:
    occupations = json.load(f)


def get_jobs(cities):
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": "Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=="
        }
    )

    for curr_city in cities:
        city = list(curr_city.keys())[0]
        currentCity = []
        script_dir = os.path.dirname(__file__)
        file_path = os.path.join(script_dir, "jobsByCity/" + city + "Jobs.json")

        for occupation in occupations:
            onetCode = occupation["onetCode"]
            url = (
                "https://api.careeronestop.org/v1/jobsearch/1cgBjWAkajxAu5r/"
                + onetCode
                + "/"
                + city
                + "/25/date/0/0/25/40"
            )
            with session.get(url) as response:
                jobs = response.json()["Jobs"]
                jobPostings = list(
                    map(get_job_details, ((job, onetCode, city, curr_city[city]) for job in jobs))
                )
                currentCity.extend(jobPostings)

        final = json.dumps(currentCity, indent=2)
        with open(file_path, "w") as outfile:
            outfile.write(final)


def get_job_details(info):
    jobPosting, onetCode, city, CityID = info
    
    posting = {
        "JvID": jobPosting["JvId"],
        "JobTitle": jobPosting["JobTitle"],
        "Company": jobPosting["Company"],
        "DatePosted": jobPosting["AccquisitionDate"],
        "Url": jobPosting["URL"],
        "Location": city,
        "OnetCode": onetCode,
        "CityID": CityID
    }
    return posting


def main():
    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(get_jobs, (cities[i::10] for i in range(10)))


if __name__ == "__main__":
    main()

"""