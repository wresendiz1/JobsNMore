from flask import Flask, render_template, request, redirect, url_for
from gitlab import get_commits, get_issues

# Dummy Data for Phase 1
job = [{'Title': 'Senior Software Engineer', 'Company': 'Google', 'Location': 'San Francisco, CA', 'Link': 'https://careers.google.com/jobs/results/116958901158453958-senior-software-engineering-manager-ar/?f=true&page=29&utm_campaign=google_jobs_apply&utm_medium=organic&utm_source=google_jobs_apply', 'Date':'2/13/2023'},\
    {'Title': 'Data Analyst', 'Company': 'Simplex', 'Location': 'Austin, TX', 'Link': 'https://jobs.myjobhelper.com/signup?prodid=9874&jobkey=558369-1031810&feedId=3113&pubId=9874&pubFeedId=426&jobType=&pubClickId=374533662&feedOverCap=N&company=Simplex&utm_medium=cpc&utm_source=9874&utm_campaign=xml-426&utm_content=Data%20Analyst&utm_term=Simplex&l=&ccuid=', 'Date':'2/12/2023'},\
    {'Title': 'SR Software Developer', 'Company': 'Spectrum', 'Location': 'Austin, TX', 'Link': 'https://spectrum.talentify.io/job/sr-software-developer-austin-texas-spectrum-charter-communications-332670br?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic', 'Date':'2/13/2023'}]

skill = [{'Name': 'Excel', 'Certifications':'Microsoft Office Specialist', 'Skill':'Hard', 'Industry':'Any'},\
    {'Name': 'Public Speaking', 'Certifications':'Expierence', 'Skill':'Soft', 'Industry':'Any'},\
    {'Name': '3D AutoCad', 'Certifications':'Inventor', 'Skill':'Hard', 'Industry':'Engineering'}]

locations = [{'City':'Austin', 'State':'TX', 'Unemployment':'6', 'Salary':'$52,500', 'Rent':'$1,100'},\
    {'City':'San Francisco', 'State':'CA', 'Unemployment':'8', 'Salary':'$63,250', 'Rent':'$1,600'},\
    {'City':'Chicago', 'State':'IL', 'Unemployment':'7.5', 'Salary':'$61,500', 'Rent':'$1,550'}]

course = [{'Name':'CS50: Introduction to Computer Science', 'Time':'10-20 hours per week', 'Cost':'$149.00', 'Provider':'Harvard', 'Link':'https://pll.harvard.edu/course/cs50-introduction-computer-science?delta=0'},\
    {'Name':'The Complete Digital Marketing Course', 'Time':'6 hours per week', 'Cost':'$149.99', 'Provider':'Udemy', 'Link':'https://www.udemy.com/course/learn-digital-marketing-course/'},\
    {'Name':'Google Project Management: Professional Certificate', 'Time':'10 hours per week', 'Cost':'$300.00', 'Provider':'Google', 'Link':'https://www.coursera.org/professional-certificates/google-project-management?utm_source=google&utm_medium=institutions&utm_campaign=gwgsite-gDigital-paidha-sem-sk-gen-exa-glp-null&_ga=2.75832981.1032362299.1676326416-957183620.1676326416&_gac=1.122856953.1676326423.CjwKCAiA3KefBhByEiwAi2LDHMn3d5dlkyBfBWUoU4Uco7Tx4O2yb-hR1ZNVxSkvggxK4tupjyDC3hoCFpIQAvD_BwE'}]

# These are the headers of the tables
job_headers = ['Job Title', 'Company', 'Location', 'Link to Application', 'Job Posting Date']
skill_headers = ['Skill Name', 'Certifications', 'Skill Type', 'Industries']
location_headers = ['City', 'State', 'Unemployment Rate', 'Average Salary', 'Average Rent']
course_headers = ['Course Name', 'Time to Complete', 'Cost', 'Provider', 'Link to Course']

def create_app():
	
	app = Flask(__name__)

	@app.route('/')
	def index():
		return render_template('index.html')

	@app.route('/about')
	def about():
		commits = get_commits()
		issues = get_issues()
		return render_template('about.html', commits=commits, issues=issues)

	@app.route('/jobs')
	def jobs():
		return render_template('jobs.html', job = job, headers = job_headers)

	@app.route('/skills')
	def skills():
		return render_template('skills.html', skill = skill, headers = skill_headers)

	@app.route('/courses')
	def courses():
		return render_template('courses.html', course = course, headers =course_headers)

	@app.route('/locations')
	def location():
		return render_template('locations.html',  locations = locations, headers = location_headers)

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
	app.run(host = '0.0.0.0', port = 5000)
