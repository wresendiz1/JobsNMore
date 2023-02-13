from flask import Flask, render_template, request, redirect, url_for
from gitlab import get_commits, get_issues, get_issues_by_user

#Dummy Data for Phase 1
job = [{'Title': 'Senior Software Engineer', 'Company': 'Google', 'Location': 'San Francisco, CA', 'Link': 'https://careers.google.com/jobs/results/116958901158453958-senior-software-engineering-manager-ar/?f=true&page=29&utm_campaign=google_jobs_apply&utm_medium=organic&utm_source=google_jobs_apply', 'Date':'2/13/2023'},\
    {'Title': 'Data Analyst', 'Company': 'Simplex', 'Location': 'Austin, TX', 'Link': 'https://jobs.myjobhelper.com/signup?prodid=9874&jobkey=558369-1031810&feedId=3113&pubId=9874&pubFeedId=426&jobType=&pubClickId=374533662&feedOverCap=N&company=Simplex&utm_medium=cpc&utm_source=9874&utm_campaign=xml-426&utm_content=Data%20Analyst&utm_term=Simplex&l=&ccuid=', 'Date':'2/12/2023'},\
    {'Title': 'SR Software Developer', 'Company': 'Spectrum', 'Location': 'Austin, TX', 'Link': 'https://spectrum.talentify.io/job/sr-software-developer-austin-texas-spectrum-charter-communications-332670br?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic', 'Date':'2/13/2023'}]

skill = [{'Name': 'Excel', 'Certifications':'Microsoft Office Specialist', 'Skill':'Hard', 'Industry':'Any'},\
    {'Name': 'Public Speaking', 'Certifications':'Expierence', 'Skill':'Soft', 'Industry':'Any'},\
    {'Name': '3D AutoCad', 'Certifications':'Inventor', 'Skill':'Hard', 'Industry':'Engineering'}]

location = [{'City':'', 'State':'', 'Unemployment':'', 'Salary':'', 'Rent':''}]
course = [{'Name':'', 'Time':'', 'Cost':'', 'Provider':'', 'Link':''}]

#These are the headers of the tables
job_headers = ['Job Title', 'Company', 'Location', 'Link to Application', 'Job Posting Date']
skill_headers = ['Skill Name', 'Certifications', 'Skill Type', 'Industries']
location_headers = ['City', 'State', 'Unemployment Rent', 'Average Salary', 'Average Rent']
cousre_headers = ['Course Name', 'Time to Complete', 'Cost', 'Provier', 'Link to Course']

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
		return render_template('jobs.html', job = job, headers = job_headers)

	@app.route('/skills')
	def skills():
		return render_template('skills.html', skill = skill, headers = skill_headers)

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
