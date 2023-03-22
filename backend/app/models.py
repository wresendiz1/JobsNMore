from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

basic_jobs = db.Table('basic_jobs',
                db.Column('Id_jobs', db.String(80), db.ForeignKey('jobs.Id'), primary_key=True),
                db.Column('Id_basic', db.String(20), db.ForeignKey('basic_skills.Id'), primary_key=True)
            )

tech_jobs = db.Table('tech_jobs',
                db.Column('Id_jobs', db.String(80), db.ForeignKey('jobs.Id')),
                db.Column('Id_tech', db.String(20), db.ForeignKey('tech_skills.Id'))
            )

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
    OnetCode = db.Column(db.String(20), db.ForeignKey("occupations.onetCode"), nullable=False)
    JCityID = db.Column(db.Integer, db.ForeignKey("locations.CityID"), nullable=False)
    
    basic = db.relationship('Basic_Skill', secondary=basic_jobs, back_populates="jobs")
    tech = db.relationship('Tech_Skill', secondary=tech_jobs, back_populates="jobs")
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

    jobs = db.relationship('Job', secondary=basic_jobs, back_populates="basic")
    dbasic = db.relationship("Dbasic_Skill", backref="Basic_Skill")


class Dbasic_Skill(db.Model):
    __tablename__ = "dbasic_skills"
    Id = db.Column(db.String(20), db.ForeignKey("basic_skills.Id"), primary_key=True)
    OnetCode = db.Column(db.ARRAY(db.String(30)), primary_key=True)
    Score_value = db.Column(db.INT)
    Importance = db.Column(db.String(20), nullable=True)


class Tech_Skill(db.Model):
    __tablename__ = "tech_skills"
    Id = db.Column(db.String(20), primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(500), nullable=True)
    OnetCodes = db.Column(db.ARRAY(db.String(30)))

    jobs = db.relationship('Job', secondary=tech_jobs, back_populates="tech")
    dtech = db.relationship("Dtech_Skill", backref="Tech_Skill")

class Dtech_Skill(db.Model):
    __tablename__ = "dtech_skills"
    Id = db.Column(db.String(20), db.ForeignKey("tech_skills.Id"), primary_key=True)
    OnetCode = db.Column(db.ARRAY(db.String(30)), primary_key = True)
    Example = db.Column(db.String(100), primary_key=True)
    Hot_technology = db.Column(db.BOOLEAN)

class Course(db.Model):
    __tablename__ = "courses"

    Id = db.Column(db.String(80), primary_key=True)
    OnetCode = db.Column(db.String(20), db.ForeignKey("occupations.onetCode"), nullable=False)
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

    onetCode = db.Column(db.String(10), primary_key = True)
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
    job = db.relationship("Job", backref="Occupation")
    course = db.relationship("Course", backref="Occupation")

    @classmethod
    def get_occupations(cls, page=1, per_page=50):
        return cls.query.limit(per_page).offset((page - 1) * per_page).all()

class Industry(db.Model):
    __tablename__ = "industries"
    
    Code = db.Column(db.String(10), primary_key = True)
    Group = db.Column(db.String(500))
    Median_wage = db.Column(db.INT)
    Job_codes = db.Column(db.ARRAY(db.String(500)))
    
    
