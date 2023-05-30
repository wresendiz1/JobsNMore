import requests
import json
import os
from concurrent.futures import ThreadPoolExecutor
from dotenv import dotenv_values
config = dotenv_values(".env")


def get_top_jobs(cluster_codes):
    jobs = []
    cluster, codes = cluster_codes
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": config["ONESTOP_TOKEN"],
        }
    )

    jobs.extend(
        list(
            map(
                get_code_details, ((onet_code, cluster, session) for onet_code in codes)
            )
        )
    )
    return jobs


def get_code_details(info):
    onet_code, cluster, session = info
    url = (
        "https://api.careeronestop.org/v1/occupation/1cgBjWAkajxAu5r/"
        + onet_code
        + "/0?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=true&alternateOnetTitles=false&projectedEmployment=true&ooh=true&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false"
    )
    with session.get(url) as response:
        data = response.json()
        wages = data["OccupationDetail"][0]["Wages"]["NationalWagesList"]
        median_wage = [
            wage["Median"] for wage in wages if wage["RateType"] == "Annual"
        ][0]
        pct90_wage = [wage["Pct90"] for wage in wages if wage["RateType"] == "Annual"][
            0
        ]
        outlook = data["OccupationDetail"][0]["BrightOutlook"]
        outlook_category = data["OccupationDetail"][0]["BrightOutlookCategory"]

        title = data["OccupationDetail"][0]["OnetTitle"]
        description = data["OccupationDetail"][0]["OnetDescription"]

        projections = data["OccupationDetail"][0]["Projections"]["Projections"][0]
        proj_openings = projections["ProjectedAnnualJobOpening"]
        percent_change = projections["PerCentChange"]
        curr_employment = projections["EstimatedEmployment"]
        total_employed = int("".join(curr_employment.split(",")))
        bls = data["OccupationDetail"][0]["OOHs"]["OOHUrl"]
        entry = {
            "onetCode": onet_code,
            "cluster": cluster,
            "title": title,
            "description": description,
            "median_wage": median_wage,
            "pct90_wage": pct90_wage,
            "outlook": outlook,
            "outlook_category": outlook_category,
            "curr_employment": total_employed,
            "proj_openings": proj_openings,
            "percent_change": percent_change,
            "bls": bls,
        }
        return entry


def main():
    jobs = []
    with open("top_6_occupations.json") as f:
        data = json.load(f)
    with ThreadPoolExecutor(max_workers=5) as executor:
        for job_list in executor.map(
            get_top_jobs, ((cluster, code) for (cluster, code) in data.items())
        ):
            jobs.extend(job_list)
    final = json.dumps(jobs, indent=2)
    with open("occupations.json", "w") as f:
        f.write(final)


if __name__ == "__main__":
    main()