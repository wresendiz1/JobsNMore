import json
from app.models import Location, Job, Course, Tech_Skill, Basic_Skill, Occupation, db
import os

cities = [
    ("New York, NY", 1),
    ("Los Angeles, CA", 2),
    ("Chicago, IL", 3),
    ("Houston, TX", 4),
    ("Phoenix, AZ", 5),
    ("Philadelphia, PA", 6),
    ("San Antonio, TX", 7),
    ("San Diego, CA", 8),
    ("Dallas, TX", 9),
    ("San Jose, CA", 10),
    ("Austin, TX", 11),
    ("Jacksonville, FL", 12),
    ("Fort Worth, TX", 13),
    ("Columbus, OH", 14),
    ("Indianapolis, IN", 15),
    ("Charlotte, NC", 16),
    ("San Francisco, CA", 17),
    ("Seattle, WA", 18),
    ("Denver, CO", 19),
    ("Oklahoma City, OK", 20),
    ("Nashville, TN", 21),
    ("El Paso, TX", 22),
    ("Washington, DC", 23),
    ("Boston, MA", 24),
    ("Las Vegas, NV", 25),
    ("Portland, OR", 26),
    ("Detroit, MI", 27),
    ("Louisville, KY", 28),
    ("Memphis, TN", 29),
    ("Baltimore, MD", 30),
]


def load_json(filename):
    script_dir = os.path.dirname(__file__)
    cur = script_dir + filename
    with open(cur) as file:
        jsn = json.load(file)
        file.close()
    return jsn


def create_locations():
    locations = load_json("/data/locations.json")
    for location in locations:
        CityID = location["CityID"]
        City = location["City"]
        State = location["State"]
        Population = location["Population"]
        Budget = location["Budget"]
        Safety = location["Safety"]
        Average_rat = location["Average Rating"]
        Guide = location["Guide"]
        Photos = location["Photos"]

        newLocation = Location(
            CityID=CityID,
            City=City,
            State=State,
            Population=Population,
            Budget=Budget,
            Safety=Safety,
            Average_rat=Average_rat,
            Guide=Guide,
            Photos=Photos,
        )
        # After I create the book, I can then add it to my session.
        db.session.add(newLocation)
        # commit the session to my DB.
        db.session.commit()


def create_jobs():
    # dict is faster than list
    uniqueJobs = {}

    for city in cities:
        curr_city = load_json("/data/jobsByCity/" + city[0] + "Jobs.json")

        for job in curr_city:
            if job["JvID"] not in uniqueJobs:
                uniqueJobs[job["JvID"]] = job["JvID"]

                Id = job["JvID"]
                JobTitle = job["JobTitle"]
                Company = job["Company"]
                DatePosted = job["DatePosted"]
                Url = job["Url"]
                JobLocation = job["Location"]
                OnetCode = job["OnetCode"]
                JCityID = job["JCityID"]

                newJob = Job(
                    Id=Id,
                    JobTitle=JobTitle,
                    Company=Company,
                    DatePosted=DatePosted,
                    Url=Url,
                    JobLocation=JobLocation,
                    OnetCode=OnetCode,
                    JCityID=JCityID,
                )
                # After I create the book, I can then add it to my session.
                db.session.add(newJob)
                # commit the session to my DB.
        db.session.commit()


def create_basic_skills():
    skills = load_json("/data/basic_skills.json")
    for skill in skills:
        Id = skill["id"]
        Name = skill["name"]
        Description = skill["description"]
        OnetCodes = skill["onetcode"]
        # TODO: Figure out how to add the individual scores to the database - maybe add it as part of the OnetCodes?

        newSkill = Basic_Skill(
            Id=Id, Name=Name, Description=Description, OnetCodes=OnetCodes
        )
        # After I create the book, I can then add it to my session.
        db.session.add(newSkill)
        # commit the session to my DB.
        db.session.commit()


def create_tech_skills():
    tskills = load_json("/data/tech_skills.json")
    for skill in tskills:
        Id = skill["id"]
        Name = skill["name"]
        OnetCodes = skill["onetcode"]
        # TODO: Figure out how to add the example information to the database

        newSkill = Tech_Skill(Id=Id, Name=Name, OnetCodes=OnetCodes)
        # After I create the book, I can then add it to my session.
        db.session.add(newSkill)
        # commit the session to my DB.
        db.session.commit()


def create_courses():
    raw_courses = load_json("/data/courses.json")
    uniqueNames = []
    courses = []
    for i in raw_courses:
        if i["Id"] not in uniqueNames:
            uniqueNames.append(i["Id"])
            courses.append(i)

    for course in courses:
        Id = course["Id"]
        OnetCode = course["OnetCode"]
        Provider = course["Provider"]
        Name = course["Name"]
        Url = course["Url"]
        Type = course["Type"]
        Description = course["Description"]

        newCourse = Course(
            Id=Id,
            OnetCode=OnetCode,
            Provider=Provider,
            Name=Name,
            Url=Url,
            Type=Type,
            Description=Description,
        )
        # After I create the book, I can then add it to my session.
        db.session.add(newCourse)
        # commit the session to my DB.
        db.session.commit()


def create_occupations():
    occupations = load_json("/data/occupations.json")
    for occupation in occupations:
        onetCode = occupation["onetCode"]
        cluster = occupation["cluster"]
        title = occupation["title"]
        description = occupation["description"]
        median_wage = occupation["median_wage"]
        pct90_wage = occupation["pct90_wage"]
        outlook = occupation["outlook"]
        outlook_category = occupation["outlook_category"]
        curr_employment = occupation["curr_employment"]
        proj_openings = occupation["proj_openings"]
        percent_change = occupation["percent_change"]
        bls = occupation["bls"]

        newOccupation = Occupation(
            onetCode=onetCode,
            cluster=cluster,
            title=title,
            description=description,
            median_wage=median_wage,
            pct90_wage=pct90_wage,
            outlook=outlook,
            outlook_category=outlook_category,
            curr_employment=curr_employment,
            proj_openings=proj_openings,
            percent_change=percent_change,
            bls=bls,
        )
        # After I create the book, I can then add it to my session.
        db.session.add(newOccupation)
        # commit the session to my DB.
        db.session.commit()
