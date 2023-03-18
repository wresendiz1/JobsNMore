import requests
import json
import os
from concurrent.futures import ThreadPoolExecutor

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

    for city in cities:
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
                    map(get_job_details, ((job, onetCode, city) for job in jobs))
                )
                currentCity.extend(jobPostings)

        final = json.dumps(currentCity, indent=2)
        with open(file_path, "w") as outfile:
            outfile.write(final)


def get_job_details(info):
    jobPosting, onetCode, city = info
    posting = {
        "JvID": jobPosting["JvId"],
        "JobTitle": jobPosting["JobTitle"],
        "Company": jobPosting["Company"],
        "DatePosted": jobPosting["AccquisitionDate"],
        "Url": jobPosting["URL"],
        "Location": city,
        "OnetCode": onetCode,
    }
    return posting


def main():
    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(get_jobs, (cities[i::10] for i in range(10)))


if __name__ == "__main__":
    main()
