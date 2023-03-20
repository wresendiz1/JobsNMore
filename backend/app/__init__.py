from flask import Flask, request, send_file
from flask_sqlalchemy import SQLAlchemy
import os
from .create_db import db, Location, Job, Course, Skill, create_locations, create_jobs, create_skills, create_courses

# Application factory, use run.py to create an instance of the app


def create_app():
    app = Flask(__name__)

    # Make sure your log info matches up with this line. You can change this line for you local machine
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DB_STRING', 'postgresql://postgres:postgre@localhost:5432/jobdb')
    # to suppress a warning message
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    db.init_app(app)
    with app.app_context():
        db.drop_all()
        db.create_all()
    with app.app_context():
        #create_locations()
        #create_jobs()
        create_skills()
        #create_courses()

    from . import data_dict
    from . import gitlab

    @app.route("/")
    def index():
        return "Test"

    @app.route("/about")
    def about():
        commits = gitlab.get_commits()
        issues = gitlab.get_issues()
        return [commits, issues]

    @app.route("/about.json")
    def about_json():
        return send_file("data/about.json")

    @app.route("/jobs")
    def jobs():
        # with open("app/jobs.json", "r") as file:
        #     data = json.load(file)
        #     jobs = data["Jobs"]
        #     return jobs
        job = data_dict.jobs
        return job

    @app.route("/jobs/<job_id>")
    def view_job(job_id):
        job = data_dict.jobs[job_id]
        return job

    @app.route("/skills")
    def skills():
        return [data_dict.skills, data_dict.courses]

    @app.route("/skills/<skill_id>")
    def view_skill(skill_id):
        skill = data_dict.skills[skill_id]
        return [skill, data_dict.courses]

    @app.route("/courses")
    def courses():
        return data_dict.courses

    @app.route("/courses/<course_id>")
    def view_course(course_id):
        course = data_dict.courses[course_id]
        return course

    @app.route("/locations")
    def locations():
        return data_dict.locations

    @app.route("/locations/<location_id>")
    def view_location(location_id):
        location = data_dict.locations[location_id]
        return location

    @app.route("/contact", methods=["GET", "POST"])
    def contact():
        if request.method == "POST":
            return "Form submitted"

    return app
