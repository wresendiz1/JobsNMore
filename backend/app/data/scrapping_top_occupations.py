import requests
import json

clustersCodes = ["4.0000", "6.0000", "8.0000", "11.0000", "15.0000"]
top_6_jobs = {}

for code in clustersCodes:
    codes = []
    codes_employed = {}
    url = "https://services.onetcenter.org/ws/online/career_clusters/" + code + "?start=0&end=200"
    payload = {}
    headers = {
        "Accept": "application/json",
        "Authorization": "Basic dXRleGFzMToyODkzY3Z1",
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.json()["occupation"]

    for onetCode in data:
        codes.append(onetCode["code"])

    for onetCode in codes:
        url = (
            "https://api.careeronestop.org/v1/occupation/1cgBjWAkajxAu5r/"
            + onetCode
            + "/0?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=false&alternateOnetTitles=false&projectedEmployment=true&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false"
        )
        payload = {}
        headers = {
            "Authorization": "Bearer h5913JTCBlAINrrwwtf+LulXF+a0DQMZ8coPXmT+pF1vlhCajU4FbMvl33gIJ0vbFRIO4XZ1EnUcjJTKp3IWIg=="
        }
        response = requests.request("GET", url, headers=headers, data=payload)
        total_employed = response.json()["OccupationDetail"][0]["Projections"][
            "Projections"
        ][0]["EstimatedEmployment"]
        codes_employed[onetCode] = int("".join(total_employed.split(",")))

    # sort the dictionary by value
    sorted_codes_employed = dict(
        sorted(codes_employed.items(), key=lambda item: item[1], reverse=True)
    )
    # get the top 6 jobs and save them as a list in the top_6_jobs dictionary
    for i in range(6):
        top_6_jobs[code] = list(sorted_codes_employed.items())[:6]

final = json.dumps(top_6_jobs, indent=2)

with open("top_6_jobs.json", "w") as f:
    f.write(final)

