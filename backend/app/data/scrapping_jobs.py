import requests
import json
import os

cities = [
    "New York, NY",
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
with open("top_6_jobs.json") as f:
    jobsCodes = json.load(f)


for city in cities:
    currentCity = []
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, "jobsByCity/" + city + "Jobs.json")

    with open(file_path, "w") as f:
        pass

    for key in jobsCodes:
        for listing in jobsCodes[key]:
            onetCode = listing[0]
            url = (
                "https://api.careeronestop.org/v1/jobsearch/1cgBjWAkajxAu5r/"
                + onetCode
                + "/"
                + city
                + "/25/date/0/0/25/40"
            )
            payload = {}
            headers = {
                "Authorization": "Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=="
            }
            response = requests.request("GET", url, headers=headers, data=payload)
            jobs = response.json()["Jobs"]

            for jobPosting in jobs:
                jvID = jobPosting["JvId"]
                jobTitle = jobPosting["JobTitle"]
                company = jobPosting["Company"]
                posted = jobPosting["AccquisitionDate"]
                url = jobPosting["URL"]
                location = jobPosting["Location"]
                posting = {
                    "JvID": jvID,
                    "JobTitle": jobTitle,
                    "Company": company,
                    "DatePosted": posted,
                    "Url": url,
                    "Location": location,
                    "OnetCode": onetCode,
                }
                currentCity.append(posting)
    final = json.dumps(currentCity, indent=2)
    with open(file_path, "w") as outfile:
        outfile.write(final)
