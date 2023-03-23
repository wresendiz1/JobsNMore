from flask import Flask, jsonify, request, send_file
from flask_sqlalchemy import SQLAlchemy
import os
from app.create_db import (
    db,
    Location,
    Occupation,
    Job,
    Course,
    Tech_Skill,
    Dtech_Skill,
    Basic_Skill,
    Dbasic_Skill,
    Industry,
    create_locations,
    create_jobs,
    create_basic_skills,
    create_dbasic_skills,
    create_tech_skills,
    create_dtech_skills,
    create_courses,
    create_occupations,
    create_industries,
)

# Application factory, use run.py to create an instance of the app


def create_app(config=None):
    app = Flask(__name__)

    # Make sure your log info matches up with this line. You can change this line for you local machine
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DB_STRING", "postgresql://postgres:Passkey123@localhost:5432/jobdb"
    )
    # to suppress a warning message
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JSON_SORT_KEYS"] = False

    db.init_app(app)

    with app.app_context():
        # add the string in run.py to initialize/reset the database
        if config == "intialize_db":
            db.drop_all()
            db.create_all()
            create_locations()
            create_industries()
            create_occupations()
            create_jobs()
            create_tech_skills()
            create_dtech_skills()
            create_basic_skills()
            create_dbasic_skills()
            create_courses()

    from app.gitlab import get_commits, get_issues

    @app.route("/")
    def index():
        return "Test"

    @app.route("/about")
    def about():
        commits = get_commits()
        issues = get_issues()
        return [commits, issues]

    @app.route("/about.json")
    def about_json():
        return send_file("data/about.json")

    @app.route("/test")
    def get_locations():
        location = db.get_or_404(Location, 1)
        return location.City

    def get_query_page(args):
        page = args.get("page", 1, type=int)
        per_page = args.get("per_page", 50, type=int)
        return page, per_page

    @app.route("/jobs", methods=["GET"])
    def jobs():
        # Query parameters
        # Example: http://localhost:5000/jobs?page=20&per_page=100
        pg, per_page = get_query_page(request.args)

        page, jobs = Job.get_jobs(pg, per_page)

        job_dict = {
            "Page": page,
            "Jobs": jobs,
        }

        return jsonify(job_dict)

    @app.route("/jobs/onet/<onetCode>", methods=["GET"])
    def get_jobs_by_onet(onetCode):
        pg, per_page = get_query_page(request.args)

        page, jobs = Job.get_jobs_by_onet(onetCode, pg, per_page)

        job_dict = {
            "Page": page,
            "Jobs": jobs,
        }

        return jsonify(job_dict)

    @app.route("/jobs/cluster/<cluster>", methods=["GET"])
    def get_jobs_by_cluster(cluster):
        pg, per_page = get_query_page(request.args)

        page, jobs = Job.get_jobs_by_cluster(cluster, pg, per_page)

        job_dict = {
            "Page": page,
            "Jobs": jobs,
        }

        return jsonify(job_dict)

    @app.route("/jobs/location/<location>", methods=["GET"])
    def get_jobs_by_location(location):
        pg, per_page = get_query_page(request.args)

        page, jobs = Job.get_jobs_by_location(location, pg, per_page)

        job_dict = {
            "Page": page,
            "Jobs": jobs,
        }

        return jsonify(job_dict)

    @app.route("/jobs/<Id>", methods=["GET"])
    def get_job(Id):
        job, courses = Job.get_job_details(Id)

        return jsonify(job, courses)

    # TODO: Add tech skills, basic skills
    @app.route("/clusters", methods=["GET"])
    def career_cluster():
        clusters = Industry.get_clusters()

        # TODO: Do this in the model
        cluster_dict = {
            "Clusters": [
                {
                    "code": cluster.Code,
                    "title": cluster.Group,
                    "median_wage": cluster.Median_wage,
                    "link": cluster.Url,
                }
                for cluster in clusters
            ]
        }

        return jsonify(cluster_dict)

    @app.route("/clusters/<code>", methods=["GET"])
    def get_cluster(code):
        cluster = Industry.get_cluster(code)

        return jsonify(cluster)

    @app.route("/occupations", methods=["GET"])
    def occupations():
        page, per_page = get_query_page(request.args)

        occupatiions = Occupation.get_occupations(page, per_page)

        # TODO: Do this in the model
        occupations_dict = {
            "Page": [
                {
                    "CurrentPage": page,
                    "Count": per_page,
                }
            ],
            "Occupations": [
                {
                    "OnetCode": occupation.onetCode,
                    "cluster": occupation.cluster,
                    "title": occupation.title,
                    "description": occupation.description,
                    "median_wage": occupation.median_wage,
                    "pct90_wage": occupation.pct90_wage,
                    "outlook": occupation.outlook,
                    "outlook_category": occupation.outlook_category,
                    "curr_employment": occupation.curr_employment,
                    "proj_openings": occupation.proj_openings,
                    "percent_change": occupation.percent_change,
                    "bls": occupation.bls,
                }
                for occupation in occupatiions
            ],
        }
        return jsonify(occupations_dict)

    @app.route("/occupations/<onetCode>", methods=["GET"])
    def get_ocupation(onetCode):
        occupation = Occupation.get_occupation(onetCode)
        return jsonify(occupation)

    @app.route("/courses", methods=["GET"])
    def courses():
        page, per_page = get_query_page(request.args)

        courses, num = Course.get_courses(page, per_page)
        course_dict = {
            "Page": [
                {
                    "current_page": page,
                    "per_page": per_page,
                    "total": num,
                }
            ],
            "Courses": [
                {
                    "Id": course.Id,
                    "OnetCode": course.OnetCode,
                    "Provider": course.Provider,
                    "Name": course.Name,
                    "Type": course.Type,
                    "Description": course.Description,
                    "Url": course.Url,
                }
                for course in courses
            ],
        }

        return jsonify(course_dict)

    @app.route("/courses/<Id>", methods=["GET"])
    def get_course(Id):
        course = Course.get_course(Id)
        return jsonify(course)

    @app.route("/locations", methods=["GET"])
    def locations():
        page, per_page = get_query_page(request.args)
        locations = Location.get_locations(page, per_page)
        locations_dict = {
            # TODO: Do this in the model
            "Page": [
                {
                    "current_page": page,
                    "per_page": per_page,
                }
            ],
            "Locations": [
                {
                    "CityID": location.CityID,
                    "City": location.City,
                    "State": location.State,
                    "Population": location.Population,
                    "Budget": location.Budget,
                    "Safety": location.Safety,
                    "Average_rat": location.Average_rat,
                    "Guide": location.Guide,
                    "Photos": location.Photos,
                }
                for location in locations
            ],
        }

        return jsonify(locations_dict)

    @app.route("/locations/<Id>", methods=["GET"])
    def get_location(Id):
        location, jobs = Location.get_location_details(Id)

        return jsonify(location, jobs)

    @app.route("/basic_skills", methods=["GET"])
    def basic_skils():
        page, per_page = get_query_page(request.args)

        skills = Basic_Skill.get_basic_skills(page, per_page)

        skill_dict = {
            "Page": [
                {
                    "CurrentPage ": page,
                    "Count": per_page,
                }
            ],
            "Skills": [
                {
                    "Id": skill.Id,
                    "Name": skill.Name,
                    "Description": skill.Description,
                }
                for skill in skills
            ],
        }

        return jsonify(skill_dict)

    @app.route("/tech_skills", methods=["GET"])
    def tech_skills():
        page, per_page = get_query_page(request.args)

        skills = Tech_Skill.get_tech_skills(page, per_page)

        skill_dict = {
            "Page": [
                {
                    "CurrentPage ": page,
                    "Count": per_page,
                }
            ],
            "Skills": [
                {
                    "Id": skill.Id,
                    "Name": skill.Name,
                }
                for skill in skills
            ],
        }

        return jsonify(skill_dict)

    @app.route("/contact", methods=["GET", "POST"])
    def contact():
        if request.method == "POST":
            return "Form submitted"

    return app
