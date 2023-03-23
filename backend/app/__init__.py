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

    # @app.route("/jobs", methods=["GET"], defaults={"page": 1, "per_page": 50})
    # @app.route("/jobs/<int:page>/<int:per_page>", methods=["GET"])
    @app.route("/jobs", methods=["GET"])
    def jobs():
        # Query parameters
        # Example: http://localhost:5000/jobs?page=20&per_page=100
        page, per_page = get_query_page(request.args)

        jobs = Job.get_jobs(page, per_page)
        job_dict = {
            "Page": [
                {
                    "CurrentPage": page,
                    "Count": per_page,
                }
            ],
            "Jobs": [
                {
                    "Id": job.Id,
                    "JobTitle": job.JobTitle,
                    "Company": job.Company,
                    "DatePosted": job.DatePosted,
                    "Url": job.Url,
                    "Location": job.JobLocation,
                    "OnetCode": job.OnetCode,
                    "JCityID": job.JCityID,
                }
                for job in jobs
            ],
        }

        return jsonify(job_dict)

    # TODO: Add tech skills, basic skills
    @app.route("/clusters", methods=["GET"])
    def career_cluster():
        clusters = Industry.get_clusters()

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

    @app.route("/occupations", methods=["GET"])
    def occupations():
        page, per_page = get_query_page(request.args)

        occupatiions = Occupation.get_occupations(page, per_page)

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

    @app.route("/courses", methods=["GET"])
    def courses():
        page, per_page = get_query_page(request.args)

        courses = Course.get_courses(page, per_page)
        course_dict = {
            "Page": [
                {
                    "CurrentPage": page,
                    "Count": per_page,
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

    # @app.route("/courses/<course_id>")
    # def view_course(course_id):
    #     course = data_dict.courses[course_id]
    #     return course

    @app.route("/locations", methods=["GET"])
    def locations():
        page, per_page = get_query_page(request.args)
        locations = Location.get_locations(page, per_page)
        locations_dict = {
            "Page": [
                {
                    "CurrentPage": page,
                    "Count": per_page,
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
                    # TODO: Figure out how I will display this data as it returns a list of job objects
                    # "Job": location.job,
                }
                for location in locations
            ],
        }

        return jsonify(locations_dict)

    # @app.route("/locations/<location_id>")
    # def view_location(location_id):
    #     location = data_dict.locations[location_id]
    #     return location

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
                    # ONETCODES
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
                    # "Description": skill.Description,
                    # ONETCODES
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
