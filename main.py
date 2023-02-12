from flask import Flask, render_template, request, redirect, url_for
from gitlab import get_commits, get_issues, get_issues_by_user

def create_app():
	
	app = Flask(__name__)

	@app.route('/')
	def index():
		return render_template('index.html')

	@app.route('/about')
	def about():
		commits = get_commits()
		total_issues = get_issues()
		user_issues = get_issues_by_user()
		return render_template('about.html', commits=commits, total_issues=total_issues, user_issues=user_issues)

	@app.route('/jobs')
	def jobs():
		return render_template('jobs.html')

	@app.route('/skills')
	def skills():
		return render_template('skills.html')

	@app.route('/courses')
	def courses():
		return render_template('courses.html')

	@app.route('/locations')
	def location():
		return render_template('locations.html')

	@app.route('/contact')
	def contact():
		return render_template('contact.html')

	@app.route('/other')
	def other():
		return render_template('other.html')
	
	return app

if __name__ == '__main__':
	app = create_app()
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)