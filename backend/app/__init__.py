
from flask import Flask, request

# Application factory, use run.py to create an instance of the app


def create_app():
    app = Flask(__name__)
    from . import data_dict
    from . import gitlab

    @app.route('/')
    def index():
        return 'Test'

    @app.route('/about')
    def about():
        commits = gitlab.get_commits()
        issues = gitlab.get_issues()
        return [commits, issues]

    @app.route('/jobs')
    def jobs():
        return data_dict.jobs

    @app.route('/jobs/<job_id>')
    def view_job(job_id):
        job = data_dict.jobs[job_id]
        return job

    @app.route('/skills')
    def skills():
        return [data_dict.skills, data_dict.courses]

    @app.route('/skills/<skill_id>')
    def view_skill(skill_id):
        skill = data_dict.skills[skill_id]
        return [skill, data_dict.courses]

    @app.route('/courses')
    def courses():
        return data_dict.courses

    @app.route('/courses/<course_id>')
    def view_course(course_id):
        course = data_dict.courses[course_id]
        return course

    @app.route('/locations')
    def locations():
        return data_dict.locations

    @app.route('/locations/<location_id>')
    def view_location(location_id):
        location = data_dict.locations[location_id]
        return location

    @app.route('/contact', methods=['GET', 'POST'])
    def contact():
        if request.method == 'POST':
            return 'Form submitted'

    return app
