import requests
import json


session = requests.Session()
session.headers.update(
    {
        "Accept": "application/json",
        "Authorization": "Basic dXRleGFzMToyODkzY3Z1",
    }
)
with open("occupations.json") as f:
    occupations = json.load(f)


def scrape_basic_skills():
    skills = []
    with open("skills.json") as f:
        base_skills = json.load(f)

    for occupation in occupations:
        onetCode = occupation["onetCode"]

        url = (
            "https://services.onetcenter.org/ws/online/occupations/"
            + onetCode
            + "/details/skills"
        )
        # some onet occupations dont have basic skills I guess
        try:
            response = session.request("GET", url)
            data = response.json()["element"]
        except Exception:
            continue

        for skill in data:
            index = next(
                (
                    index
                    for (index, d) in enumerate(skills)
                    if d["name"] == skill["name"]
                ),
                None,
            )
            if skill["name"] in base_skills:
                if index is None:
                    entry = {
                        "id": skill["id"],
                        "name": skill["name"],
                        "description": skill["description"],
                        "onetcode": [onetCode],
                        "score": [{onetCode: skill["score"]}],
                    }
                    skills.append(entry)
                else:
                    skills[index]["onetcode"].append(onetCode)
                    skills[index]["score"].append({onetCode: skill["score"]})
    final = json.dumps(skills, indent=2)
    with open("basic_skills.json", "w") as f:
        f.write(final)


def scrape_tech_skills():
    skills = []
    for occupation in occupations:
        onetCode = occupation["onetCode"]

        url = (
            "https://services.onetcenter.org/ws/online/occupations/"
            + onetCode
            + "/details/technology_skills"
        )

        response = session.request("GET", url)
        data = response.json()["category"]

        for skill in data:
            index = next(
                (
                    index
                    for (index, d) in enumerate(skills)
                    if d["name"] == skill["title"]["name"]
                ),
                None,
            )

            if index is None:
                entry = {
                    "id": skill["title"]["id"],
                    "name": skill["title"]["name"],
                    "onetcode": [onetCode],
                    "example": [{onetCode: skill["example"]}],
                }
                skills.append(entry)
            else:
                skills[index]["onetcode"].append(onetCode)
                skills[index]["example"].append({onetCode: skill["example"]})

    final = json.dumps(skills, indent=2)

    with open("tech_skills.json", "w") as f:
        f.write(final)


if __name__ == "__main__":
    scrape_basic_skills()
    scrape_tech_skills()
