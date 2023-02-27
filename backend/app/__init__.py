
from flask import Flask, redirect, render_template, request, url_for


def create_app():
    app = Flask(__name__)
    from app import data_dict
    from app import gitlab

    @app.route('/')
    def index():
        # return render_template('index.html')
        return 'Test'

    @app.route('/about')
    def about():
        commits = gitlab.get_commits()
        issues = gitlab.get_issues()
        return render_template('about.html', commits=commits, issues=issues)

    @app.route('/jobs')
    def jobs():
        return render_template('jobs.html', jobs=data_dict.jobs)

    @app.route('/jobs/<job_id>')
    def view_job(job_id):
        job = data_dict.jobs[job_id]
        return render_template('job_details.html', job=job)

    @app.route('/skills')
    def skills():
        return render_template('skills.html', skills=data_dict.skills, courses=data_dict.courses)

    @app.route('/skills/<skill_id>')
    def view_skill(skill_id):
        skill = data_dict.skills[skill_id]
        return render_template('skill_details.html', skill=skill, courses=data_dict.courses)

    @app.route('/courses')
    def courses():
        return render_template('courses.html', courses=data_dict.courses)

    @app.route('/courses/<course_id>')
    def view_course(course_id):
        course = data_dict.courses[course_id]
        return render_template('course_details.html', course=course)

    @app.route('/locations')
    def locations():
        return render_template('locations.html',  locations=data_dict.locations)

    @app.route('/locations/<location_id>')
    def view_location(location_id):
        location = data_dict.locations[location_id]
        return render_template('location_details.html', location=location)

    @app.route('/contact', methods=['GET', 'POST'])
    def contact():
        if request.method == 'POST':
            return redirect(url_for('contact'))
        else:
            return render_template('contact.html')

    @app.route('/other')
    def other():
        return render_template('other.html')

    return app


if __name__ == '__main__':
    app = create_app()
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
