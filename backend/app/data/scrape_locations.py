import requests
import json
import re
from dotenv import load_dotenv
load_dotenv()
import os


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

final_json = []

for number, city in enumerate(states_id):
    id_req = requests.get(
        "https://api.roadgoat.com/api/v2/destinations/auto_complete?q=" + city + "-usa",
        auth=(os.envget("ROADGOAT_ACC"), os.envget("ROADGAT_SEC")),
    )
    id = id_req.json()["data"][0]["id"]

    response = requests.get(
        "https://api.roadgoat.com/api/v2/destinations/" + id,
        auth=(os.envget("ROADGOAT_ACC"), os.envget("ROADGAT_SEC")),
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

    print(population, state, budget, safety, rating, guide, photos)

    entry = {
        "CityID": number + 1,
        "City": city_short,
        "State": state,
        "Population": population,
        "Budget": budget,
        "Safety": safety,
        "Average Rating": rating,
        "Guide": guide,
        "Photos": photos,
    }
    final_json.append(entry)

final = json.dumps(final_json, indent=2)

with open("locations.json", "w") as outfile:
    outfile.write(final)
