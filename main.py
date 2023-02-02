from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
	return render_template('about.html')

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

if __name__ == '__main__':
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)