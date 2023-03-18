from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Locations(db.Model):
	__tablename__ = 'locations'
	
	City = db.Column(db.String(80), primary_key = True)
	State = db.Column(db.String(80), nullable = False)
	Population = db.Column(db.Integer, nullable = False)
	Budget = db.Column(db.String(80), nullable = False)
	Safety = db.Column(db.String(80), nullable = False)
	Average_rat = db.Column(db.Integer, nullable = False)
	Guide = db.Column(db.String(200), nullable = False)

