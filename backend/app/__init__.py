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
    create_industries
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
        #if config == "intialize_db":
            db.drop_all()
            db.create_all()
            create_locations()
            create_occupations()
            create_jobs()
            create_tech_skills()
            create_dtech_skills()
            create_basic_skills()
            create_dbasic_skills()
            create_courses()
            create_industries()

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
        job_list = {
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

        return jsonify(job_list)

    # TODO: Add tech skills, basic skills, occupations, & clusters

    @app.route("/courses", methods=["GET"])
    def courses():
        page, per_page = get_query_page(request.args)

        courses = Course.get_courses(page, per_page)
        course_list = {
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
                }
                for course in courses
            ],
        }

        return jsonify(course_list)

    # @app.route("/courses/<course_id>")
    # def view_course(course_id):
    #     course = data_dict.courses[course_id]
    #     return course

    @app.route("/locations", methods=["GET"])
    def locations():
        page, per_page = get_query_page(request.args)
        locations = Location.get_locations(page, per_page)
        locations_list = {
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
                    # TODO: Wrong mapping
                    # "Job": location.job,
                }
                for location in locations
            ],
        }

        return jsonify(locations_list)

    # @app.route("/locations/<location_id>")
    # def view_location(location_id):
    #     location = data_dict.locations[location_id]
    #     return location

    @app.route("/contact", methods=["GET", "POST"])
    def contact():
        if request.method == "POST":
            return "Form submitted"

    return app
