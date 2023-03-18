from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Location(db.Model):
	__tablename__ = 'locations'
	
	City = db.Column(db.String(80), primary_key = True)
	State = db.Column(db.String(80), nullable = False)
	Population = db.Column(db.Integer, nullable = False)
	Budget = db.Column(db.String(80), nullable = False)
	Safety = db.Column(db.String(80), nullable = False)
	Average_rat = db.Column(db.Integer, nullable = False)
	Guide = db.Column(db.String(200), nullable = False)


class Job(db.Model):
	__tablename__ = 'job'

	Id = db.Column(db.String(80), primary_key = True)
	JobTitle = db.Column(db.String(200), nullable = False)
	Company = db.Column(db.String(80), nullable = False)
	DatePosted = db.Column(db.String(80), nullable = False)
	Url = db.Column(db.String(200), nullable = False)
	JobLocation = db.Column(db.String(80), nullable = False)
	OnetCode = db.Column(db.String(20), nullable = False)