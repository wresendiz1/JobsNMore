from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def merge_dicts(**dict_args):
    result = {}
    for name, dictionary in dict_args.items():
        for key, value in dictionary.items():
            if key in result:
                key = name + "_" + key
                result[key] = value
            else:
                result[key] = value

    return result


basic_jobs = db.Table(
    "basic_jobs",
    db.Column(
        "onetcode",
        db.String(80),
        db.ForeignKey("occupations.onetCode"),
        primary_key=True,
    ),
    db.Column(
        "id_basic", db.String(20), db.ForeignKey("basic_skills.Id"), primary_key=True
    ),
)

tech_jobs = db.Table(
    "tech_jobs",
    db.Column("onetcode", db.String(80), db.ForeignKey("occupations.onetCode")),
    db.Column("id_tech", db.String(20), db.ForeignKey("tech_skills.Id")),
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
    # The get_query_page in __init__ assings the default parameters, there just defined here
    # for future-proofing
    def get_locations(cls, page=1, per_page=30, sort_by="CityID", order="asc"):
        sort_by = "CityID" if sort_by is None else sort_by

        total = cls.query.count()
        
        if order == "asc":
            loc_q = cls.query.order_by(getattr(cls, sort_by)).limit(per_page).offset((page - 1) * per_page).all()
        else:
            loc_q = cls.query.order_by(getattr(cls, sort_by).desc()).limit(per_page).offset((page - 1) * per_page).all()
            
            
        
        num = total // per_page
        num += 1 if total % per_page else 0
        locations = [
            {
                key: value
                for key, value in location.__dict__.items()
                if key != "_sa_instance_state"
            }
            for location in loc_q
        ]
        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": total,
                "page_items": len(loc_q),
            }
        ]

        return page, locations

    @classmethod
    def get_location(cls, id):
        return cls.query.filter_by(CityID=id).first()

    @classmethod
    def get_location_details(cls, id):
        location = cls.query.filter_by(CityID=id).first()
        jobs = Job.query.filter_by(JCityID=id).all()
        jobs = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in jobs
        ]
        location = {
            key: value
            for key, value in location.__dict__.items()
            if key != "_sa_instance_state"
        }
        return location, jobs


class Job(db.Model):
    __tablename__ = "jobs"
    Id = db.Column(db.String(80), primary_key=True)
    JobTitle = db.Column(db.String(200), nullable=False)
    Company = db.Column(db.String(80), nullable=False)
    DatePosted = db.Column(db.String(80), nullable=False)
    Url = db.Column(db.String(200), nullable=False)
    JobLocation = db.Column(db.String(80), nullable=False)
    OnetCode = db.Column(
        db.String(20), db.ForeignKey("occupations.onetCode"), nullable=False
    )
    JCityID = db.Column(db.Integer, db.ForeignKey("locations.CityID"), nullable=False)

    @classmethod
    def get_count(cls):
        return cls.query.count()

    @classmethod
    def get_jobs(cls, page=1, per_page=50, sort_by="Id", order="asc"):
        sort_by = "Id" if sort_by is None else sort_by

        # Order
        if order == "asc":
            jobs = (
                cls.query.order_by(getattr(cls, sort_by))
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        else:
            jobs = (
                cls.query.order_by(getattr(cls, sort_by).desc())
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )

        # Sort
        jobs_q = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in jobs
        ]
        num = cls.get_count() // per_page
        num += 1 if cls.get_count() % per_page else 0
        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": cls.get_count(),
                "page_items": len(jobs_q),
            }
        ]
        return page, jobs_q

    @classmethod
    def get_job(cls, id):
        return cls.query.filter_by(Id=id).first()

    @classmethod
    def get_job_details(cls, id):
        job = cls.query.filter_by(Id=id).first()
        occupation = Occupation.query.filter_by(onetCode=job.OnetCode).first()

        job = {
            key: value
            for key, value in job.__dict__.items()
            if key != "_sa_instance_state"
        }
        occupation = {
            key: value
            for key, value in occupation.__dict__.items()
            if key != "_sa_instance_state"
        }

        merged = merge_dicts(job=job, occupation=occupation)
        courses = Course.get_courses_by_onet(occupation["onetCode"])
        courses = [
            {
                key: value
                for key, value in course.__dict__.items()
                if key != "_sa_instance_state"
            }
            for course in courses
        ]

        return merged, courses

    @classmethod
    def get_jobs_by_onet(cls, onet, page=1, per_page=50, sort_by="Id", order="asc"):
        sort_by = "Id" if sort_by is None else sort_by
        total = cls.query.filter_by(OnetCode=onet)
        
        if order == "asc":
            jobs = total.order_by(getattr(cls, sort_by)).limit(per_page).offset((page - 1) * per_page).all()
            
        else:
            jobs = total.order_by(getattr(cls, sort_by).desc()).limit(per_page).offset((page - 1) * per_page).all()
        
        
        jobs_q = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in jobs
        ]
        num = (total.count()) // per_page
        num += 1 if (total.count()) % per_page else 0

        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": total.count(),
                "page_items": len(jobs_q),
            }
        ]

        return page, jobs_q

    @classmethod
    def get_jobs_by_course(cls, course, page=1, per_page=50, sort_by="Id", order="asc"):
        sort_by = "Id" if sort_by is None else sort_by
        total = cls.query.filter_by(OnetCode=course)
        if order == "asc":
            jobs = (
                total.order_by(getattr(cls, sort_by))
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        else:
            jobs = (
                total.order_by(getattr(cls, sort_by).desc())
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        # jobs = total.limit(per_page).offset((page - 1) * per_page).all()
        jobs_q = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in jobs
        ]
        num = (total.count()) // per_page
        num += 1 if (total.count()) % per_page else 0

        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": total.count(),
                "page_items": len(jobs_q),
            }
        ]
        
        return page, jobs_q

    @classmethod
    def get_jobs_by_location(cls, location, page=1, per_page=50, sort_by="Id", order="asc"):
        sort_by = "Id" if sort_by is None else sort_by
        total = cls.query.filter_by(JCityID=location)
        
        if order == "asc":
            jobs = (
                total.order_by(getattr(cls, sort_by))
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        else:
            jobs = (
                total.order_by(getattr(cls, sort_by).desc())
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
    
        jobs_q = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in jobs
        ]

        num = (total.count()) // per_page
        num += 1 if (total.count()) % per_page != 0 else 0

        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": total.count(),
                "page_items": len(jobs_q),
            }
        ]

        return page, jobs_q

    @classmethod
    def get_jobs_by_cluster(cls, cluster, page=1, per_page=50, sort_by="Id", order="asc"):
        sort_by = "Id" if sort_by is None else sort_by
        occupations = Occupation.get_occupation_by_cluster(cluster)
        onets = [occupation["onetCode"] for occupation in occupations]
        total = cls.query.filter(cls.OnetCode.in_(onets))
        if order == "asc":
            jobs = (
                total.order_by(getattr(cls, sort_by))
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        else:
            jobs = (
                total.order_by(getattr(cls, sort_by).desc())
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
            
        jobs_q = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in jobs
        ]
        num = (total.count()) // per_page
        num += 1 if (total.count() % per_page) > 0 else 0
        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": total.count(),
                "page_items": len(jobs_q),
            }
        ]
        
        cluster_name = Industry.get_cluster(cluster)

        return page, jobs_q, cluster_name


class Basic_Skill(db.Model):
    __tablename__ = "basic_skills"
    Id = db.Column(db.String(20), primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(500), nullable=True)
    OnetCodes = db.Column(db.ARRAY(db.String(30)))

    occupations = db.relationship(
        "Occupation", secondary=basic_jobs, back_populates="basic"
    )
    dbasic = db.relationship("Dbasic_Skill", backref="Basic_Skill")

    @classmethod
    def get_basic_skills(cls, page=1, per_page=20):
        basic_q = cls.query.limit(per_page).offset((page - 1) * per_page).all()
        num = (cls.query.count()) // per_page
        num += 1 if (cls.query.count()) % per_page else 0
        page = [{"current_page": page, "per_page": per_page, "total": num}]
        basic = [
            {
                key: value
                for key, value in basic.__dict__.items()
                if key != "_sa_instance_state"
            }
            for basic in basic_q
        ]
        return page, basic


class Dbasic_Skill(db.Model):
    __tablename__ = "dbasic_skills"
    Id = db.Column(db.String(20), db.ForeignKey("basic_skills.Id"), primary_key=True)
    OnetCode = db.Column(db.String(30), primary_key=True)
    Score_value = db.Column(db.INT)
    Importance = db.Column(db.String(20), nullable=True)


class Tech_Skill(db.Model):
    __tablename__ = "tech_skills"
    Id = db.Column(db.String(20), primary_key=True)
    Name = db.Column(db.String(100), nullable=False)
    Description = db.Column(db.String(500), nullable=True)
    OnetCodes = db.Column(db.ARRAY(db.String(30)))

    occupations = db.relationship(
        "Occupation", secondary=tech_jobs, back_populates="tech"
    )
    dtech = db.relationship("Dtech_Skill", backref="Tech_Skill")

    @classmethod
    def get_tech_skills(cls, page=1, per_page=20):
        tech_q = cls.query.limit(per_page).offset((page - 1) * per_page).all()
        num = (cls.query.count()) // per_page
        num += 1 if (cls.query.count()) % per_page else 0
        tech = [
            {
                key: value
                for key, value in tech.__dict__.items()
                if key != "_sa_instance_state"
            }
            for tech in tech_q
        ]
        page = [{"current_page": page, "per_page": per_page, "total": num}]

        return page, tech


class Dtech_Skill(db.Model):
    __tablename__ = "dtech_skills"
    Id = db.Column(db.String(20), db.ForeignKey("tech_skills.Id"), primary_key=True)
    OnetCode = db.Column(db.String(30), primary_key=True)
    Example = db.Column(db.String(100), primary_key=True)
    Hot_technology = db.Column(db.BOOLEAN)


class Course(db.Model):
    __tablename__ = "courses"

    Id = db.Column(db.String(80), primary_key=True)
    OnetCode = db.Column(
        db.String(20), db.ForeignKey("occupations.onetCode"), nullable=False
    )
    Provider = db.Column(db.String(200), nullable=False)
    Name = db.Column(db.String(150), nullable=False)
    Url = db.Column(db.String(200))
    Type = db.Column(db.String(80), nullable=False)
    Description = db.Column(db.Text)

    @classmethod
    def get_count(cls):
        return cls.query.count()

    @classmethod
    def get_courses(cls, page=1, per_page=50, sort_by="Id", order="asc"):
        sort_by = "Id" if sort_by is None else sort_by

        # Order
        if order == "asc":
            courses = (
                cls.query.order_by(getattr(cls, sort_by))
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        else:
            courses = (
                cls.query.order_by(getattr(cls, sort_by).desc())
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        courses_q = [
            {
                key: value
                for key, value in course.__dict__.items()
                if key != "_sa_instance_state"
            }
            for course in courses
        ]
        num = cls.get_count() // per_page
        num += 1 if cls.get_count() % per_page > 0 else 0
        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": cls.get_count(),
                "page_items": len(courses_q),
            }
        ]
        return page, courses_q

    @classmethod
    def get_course(cls, id):
        course = cls.query.filter_by(Id=id).first()
        course = {
            key: value
            for key, value in course.__dict__.items()
            if key != "_sa_instance_state"
        }
        return course

    @classmethod
    def get_courses_by_onet(cls, onet):
        return cls.query.filter_by(OnetCode=onet).all()


class Occupation(db.Model):
    __tablename__ = "occupations"

    onetCode = db.Column(db.String(10), primary_key=True)
    cluster = db.Column(db.String(10), db.ForeignKey("industries.Code"), nullable=False)
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
    basic = db.relationship(
        "Basic_Skill", secondary=basic_jobs, back_populates="occupations"
    )
    tech = db.relationship(
        "Tech_Skill", secondary=tech_jobs, back_populates="occupations"
    )

    @classmethod
    def get_occupations(cls, page=1, per_page=50, sort_by="onetCode", order="asc"):
        sort_by = "onetCode" if sort_by is None else sort_by

        if order == "asc":
            occupations_q = (
                cls.query.order_by(getattr(cls, sort_by))
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            )
        else:
            occupations_q = (
                cls.query.order_by(getattr(cls, sort_by).desc())
                .limit(per_page)
                .offset((page - 1) * per_page)
                .all()
            ) 
        
        occupations = [
            {
                key: value
                for key, value in occ.__dict__.items()
                if key != "_sa_instance_state"
            }
            for occ in occupations_q
        ]
        num = cls.query.count() // per_page
        num += 1 if cls.query.count() % per_page > 0 else 0
        page = [
            {
                "current_page": page,
                "per_page": per_page,
                "total": num,
                "total_items": cls.query.count(),
                "page_items": len(occupations_q),
            }
        ]
        return page, occupations

    @classmethod
    def get_occupation(cls, id):
        occ = cls.query.filter_by(onetCode=id).first()
        occ = {
            key: value
            for key, value in occ.__dict__.items()
            if key != "_sa_instance_state"
        }
        return occ

    @classmethod
    def get_occupation_by_cluster(cls, id):
        occupations = cls.query.filter_by(cluster=id).all()
        occupations = [
            {
                key: value
                for key, value in job.__dict__.items()
                if key != "_sa_instance_state"
            }
            for job in occupations
        ]
        return occupations


class Industry(db.Model):
    __tablename__ = "industries"

    Code = db.Column(db.String(10), primary_key=True)
    Group = db.Column(db.String(500))
    Median_wage = db.Column(db.INT)
    Job_codes = db.Column(db.ARRAY(db.String(500)))
    Url = db.Column(db.String(200))

    occupations = db.relationship("Occupation", backref="Industry")

    @classmethod
    def get_clusters(cls, sort_by="Code", order="asc"):
        sort_by = "Code" if sort_by is None else sort_by

        # clusters = cls.query.all()
        
        if order == "asc":
            clusters = cls.query.order_by(getattr(cls, sort_by)).all()
        else:
            clusters = cls.query.order_by(getattr(cls, sort_by).desc()).all()
            
        clusters = {
            "Clusters": [
                {
                    key: value
                    for key, value in cluster.__dict__.items()
                    if key != "_sa_instance_state"
                }
                for cluster in clusters
            ]
        }
        return clusters

    @classmethod
    def get_cluster(cls, id):
        cluster = cls.query.filter_by(Code=id).first()
        cluster = {
            key: value
            for key, value in cluster.__dict__.items()
            if key != "_sa_instance_state"
        }
        return cluster
