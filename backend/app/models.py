from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Location(db.Model):
    __tablename__ = "locations"

    City = db.Column(db.String(80))
    State = db.Column(db.String(80), nullable=False)
    Population = db.Column(db.Integer, nullable=False)
    Budget = db.Column(db.String(80), nullable=False)
    Safety = db.Column(db.String(80), nullable=False)
    Average_rat = db.Column(db.Integer, nullable=False)
    Guide = db.Column(db.String(200), nullable=False)
    CityID = db.Column(db.Integer, primary_key=True, nullable=False)
    Photos = db.Column(db.ARRAY(db.String(200)), nullable=False)
    job = db.relationship("Job", backref="Location")

    @classmethod
    def get_locations(cls, page=1, per_page=30):
        return cls.query.limit(per_page).offset((page - 1) * per_page).all()


class Job(db.Model):
    __tablename__ = "jobs"

    Id = db.Column(db.String(80), primary_key=True)
    JobTitle = db.Column(db.String(200), nullable=False)
    Company = db.Column(db.String(80), nullable=False)
    DatePosted = db.Column(db.String(80), nullable=False)
    Url = db.Column(db.String(200), nullable=False)
    JobLocation = db.Column(db.String(80), nullable=False)
    OnetCode = db.Column(db.String(20), nullable=False)
    JCityID = db.Column(db.Integer, db.ForeignKey("locations.CityID"), nullable=False)

    @classmethod
    def get_count(cls):
        return cls.query.count()

    # Not sure why this doesn't work
    # @classmethod
    # def get_jobs(cls, page=1, per_page=50):
    #     return cls.query.paginate(page, per_page, False)
    @classmethod
    def get_jobs(cls, page=1, per_page=50):
        return cls.query.limit(per_page).offset((page - 1) * per_page).all()


class Basic_Skill(db.Model):
    __tablename__ = "basic_skills"
    Id = db.Column(db.String(20), primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(500), nullable=True)
    OnetCodes = db.Column(db.ARRAY(db.String(30)))


class Tech_Skill(db.Model):
    __tablename__ = "tech_skills"
    Id = db.Column(db.String(20), primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(500), nullable=True)
    OnetCodes = db.Column(db.ARRAY(db.String(30)))


class Course(db.Model):
    __tablename__ = "courses"

    Id = db.Column(db.String(80), primary_key=True)
    OnetCode = db.Column(db.String(20), nullable=False)
    Provider = db.Column(db.String(200), nullable=False)
    Name = db.Column(db.String(150), nullable=False)
    Url = db.Column(db.String(200))
    Type = db.Column(db.String(80), nullable=False)
    Description = db.Column(db.Text)

    @classmethod
    def get_courses(cls, page=1, per_page=50):
        return cls.query.limit(per_page).offset((page - 1) * per_page).all()


class Occupation(db.Model):
    __tablename__ = "occupations"

    onetCode = db.Column(db.String(10), primary_key=True)
    cluster = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    median_wage = db.Column(db.Integer)
    pct90_wage = db.Column(db.String(20))
    outlook = db.Column(db.String(20))
    outlook_category = db.Column(db.String(50))
    curr_employment = db.Column(db.Integer)
    proj_openings = db.Column(db.Integer)
    percent_change = db.Column(db.Integer)
    bls = db.Column(db.Text)
