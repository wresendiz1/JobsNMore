from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import case

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


def page_info(page, per_page, query_pag_obj, items):
    return {
        "current_page": page,
        "per_page": per_page,
        "total": query_pag_obj.pages,
        "total_items": query_pag_obj.total,
        "page_items": len(items),
    }


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

    """
    Contains information about the location, including the city, state, population, budget, safety, average rating, and guide.
    Chosen by looking at the top 30 most populated cities in the US.

    """

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

    @property
    def serialize(self):
        return {
            "City": self.City,
            "State": self.State,
            "Population": self.Population,
            "Budget": self.Budget,
            "Safety": self.Safety,
            "Average_rat": self.Average_rat,
            "Guide": self.Guide,
            "CityID": self.CityID,
            "Photos": self.Photos,
        }

    @classmethod
    # The get_query_page in __init__ assings the default parameters, there just defined here
    # for future-proofing
    def get_locations(
        cls,
        page=1,
        per_page=10,
        sort_by="CityID",
        order="asc",
        search=None,
        search_by=None,
    ):
        """
        gets all locations, query parameters are specified in postman doc: https://documenter.getpostman.com/view/25798655/2s93RZMpTL

        """
        sort_by = "CityID" if sort_by == "" else sort_by

        column = getattr(cls, sort_by)

        if search:
            search_column = getattr(cls, search_by)
            search_q = cls.query.filter(search_column.ilike(f"%{search}%"))

        else:
            search_q = cls.query

        """   Sorting
        Budget and Safety are special cases, because they are strings, but are sorted by the priority of their strings """

        budget_priority = {
            "Medium": 1,
            "Medium High": 2,
            "High": 3,
            "Very High": 4,
            "Extreme": 5,
        }
        safety_priority = {"Medium": 1, "High": 2, "Very High": 3}

        if sort_by == "Budget":
            if order == "asc":
                loc_q = search_q.order_by(
                    case(budget_priority, value=cls.Budget)
                ).paginate(page=page, per_page=per_page)
            else:
                loc_q = search_q.order_by(
                    case(budget_priority, value=cls.Budget).desc()
                ).paginate(page=page, per_page=per_page)

        elif sort_by == "Safety":
            if order == "asc":
                loc_q = search_q.order_by(
                    case(safety_priority, value=cls.Safety)
                ).paginate(page=page, per_page=per_page)
            else:
                loc_q = search_q.order_by(
                    case(safety_priority, value=cls.Safety).desc()
                ).paginate(page=page, per_page=per_page)

        else:
            if order == "asc":
                loc_q = search_q.order_by(column).paginate(page=page, per_page=per_page)
            else:
                loc_q = search_q.order_by(column.desc()).paginate(
                    page=page, per_page=per_page
                )

        locations = [location.serialize for location in loc_q.items]
        return {
            "Page": page_info(page, per_page, loc_q, locations),
            "Locations": locations,
        }

    @classmethod
    def get_location(cls, id):
        return cls.query.filter_by(CityID=id).first()

    @classmethod
    def get_location_details(cls, id):
        location = cls.query.filter_by(CityID=id).first()

        jobs = Job.query.filter_by(JCityID=id).limit(50).all()

        return {"Location": location.serialize, "Jobs": [job.serialize for job in jobs]}


class Job(db.Model):

    """
    Contains information about the job, including the job title, company, date posted, url, job location, and onet code.
    Chosen by using the ONET Code of the top 6 occupations for each cluster and querying jobs from CareerOneStop.
    """

    __tablename__ = "jobs"
    Id = db.Column(db.String(80), primary_key=True)
    JobTitle = db.Column(db.String(300), nullable=False)
    Company = db.Column(db.String(200), nullable=False)
    DatePosted = db.Column(db.String(80), nullable=False)
    Url = db.Column(db.String(200), nullable=False)
    JobLocation = db.Column(db.String(80), nullable=False)
    OnetCode = db.Column(
        db.String(20), db.ForeignKey("occupations.onetCode"), nullable=False
    )
    JCityID = db.Column(db.Integer, db.ForeignKey("locations.CityID"), nullable=False)

    @property
    def serialize(self):
        return {
            "Id": self.Id,
            "JobTitle": self.JobTitle,
            "Company": self.Company,
            "DatePosted": self.DatePosted,
            "Url": self.Url,
            "JobLocation": self.JobLocation,
            "OnetCode": self.OnetCode,
            "JCityID": self.JCityID,
        }

    @classmethod
    def get_count(cls):
        return cls.query.count()

    @classmethod
    def get_jobs(
        cls,
        page=1,
        per_page=10,
        sort_by="Company",
        order="asc",
        search=None,
        search_by=None,
    ):
        sort_by = "Company" if sort_by == "" else sort_by

        column = getattr(cls, sort_by)

        if search:
            column_search = getattr(cls, search_by)
            search_q = cls.query.filter(column_search.ilike(f"%{search}%"))
        else:
            search_q = cls.query

        # Order
        if order == "asc":
            jobs = search_q.order_by(column).paginate(page=page, per_page=per_page)
        else:
            jobs = search_q.order_by(column.desc()).paginate(
                page=page, per_page=per_page
            )

        jobs_q = [job.serialize for job in jobs.items]

        return {"Page": page_info(page, per_page, jobs, jobs_q), "Jobs": jobs_q}

    @classmethod
    def get_job(cls, id):
        return cls.query.filter_by(Id=id).first()

    @classmethod
    def get_job_details(cls, id):
        job = cls.query.filter_by(Id=id).first()
        occupation = Occupation.query.filter_by(onetCode=job.OnetCode).first()

        job = job.serialize
        occupation = occupation.serialize

        merged = merge_dicts(job=job, occupation=occupation)
        courses = Course.get_courses_by_onet(occupation["onetCode"])
        test = [course.serialize for course in courses]

        return {"Job Info": merged, "Courses": test}

    @classmethod
    def get_jobs_by_onet(
        cls,
        onet,
        page=1,
        per_page=10,
        sort_by="Id",
        order="asc",
        search=None,
        search_by=None,
    ):
        sort_by = "Id" if sort_by == "" else sort_by

        # Get query of all jobs with onet code
        total = cls.query.filter_by(OnetCode=onet)

        column = getattr(cls, sort_by)

        if search:
            column_search = getattr(cls, search_by)
            search_q = total.filter(column_search.ilike(f"%{search}%"))

        else:
            search_q = total

        if order == "asc":
            jobs = search_q.order_by(column).paginate(page=page, per_page=per_page)

        else:
            jobs = search_q.order_by(column.desc()).paginate(
                page=page, per_page=per_page
            )

        jobs_q = [job.serialize for job in jobs.items]

        occupation = Occupation.get_occupation(onet)

        return {
            "Name": occupation["Occupation"]["title"],
            "Page": page_info(page, per_page, jobs, jobs_q),
            "Jobs": jobs_q,
        }

    @classmethod
    def get_jobs_by_course(
        cls,
        Id,
        page=1,
        per_page=10,
        sort_by="Id",
        order="asc",
        search=None,
        search_by=None,
    ):
        sort_by = "Id" if sort_by == "" else sort_by
        course = Course.get_course(Id)
        total = cls.query.filter_by(OnetCode=course["Course"]["OnetCode"])

        column = getattr(cls, sort_by)

        if search:
            column_search = getattr(cls, search_by)
            search_q = total.filter(column_search.ilike(f"%{search}%"))
        else:
            search_q = total

        if order == "asc":
            jobs = search_q.order_by(column).paginate(page=page, per_page=per_page)

        else:
            jobs = search_q.order_by(column.desc()).paginate(
                page=page, per_page=per_page
            )

        jobs_q = [job.serialize for job in jobs.items]

        return {
            "Name": course["Course"]["Name"],
            "Page": page_info(page, per_page, jobs, jobs_q),
            "Jobs": jobs_q,
        }

    @classmethod
    def get_jobs_by_location(
        cls,
        location,
        page=1,
        per_page=10,
        sort_by="Id",
        order="asc",
        search=None,
        search_by=None,
    ):
        sort_by = "Id" if sort_by == "" else sort_by
        total = cls.query.filter_by(JCityID=location)

        column = getattr(cls, sort_by)

        if search:
            column_search = getattr(cls, search_by)
            search_q = total.filter(column_search.ilike(f"%{search}%"))
        else:
            search_q = total

        if order == "asc":
            jobs = search_q.order_by(column).paginate(page=page, per_page=per_page)
        else:
            jobs = search_q.order_by(column.desc()).paginate(
                page=page, per_page=per_page
            )

        jobs_q = [job.serialize for job in jobs.items]

        return {
            "Name": jobs_q[0]["JobLocation"],
            "Page": page_info(page, per_page, jobs, jobs_q),
            "Jobs": jobs_q,
        }

    @classmethod
    def get_jobs_by_cluster(
        cls,
        cluster,
        page=1,
        per_page=10,
        sort_by="Id",
        order="asc",
        search=None,
        search_by=None,
    ):
        sort_by = "Id" if sort_by == "" else sort_by
        occupations = Occupation.get_occupation_by_cluster(cluster)
        onets = [occupation["onetCode"] for occupation in occupations]

        total = cls.query.filter(cls.OnetCode.in_(onets))
        column = getattr(cls, sort_by)

        if search:
            search_column = getattr(cls, search_by)
            search_q = total.filter(search_column.ilike(f"%{search}%"))
        else:
            search_q = total

        if order == "asc":
            jobs = search_q.order_by(column).paginate(page=page, per_page=per_page)

        else:
            jobs = search_q.order_by(column.desc()).paginate(
                page=page, per_page=per_page
            )

        jobs_q = [job.serialize for job in jobs.items]

        cluster_name = Industry.get_cluster_name(cluster)

        return {
            "Name": cluster_name,
            "Page": page_info(page, per_page, jobs, jobs_q),
            "Jobs": jobs_q,
        }


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

    @property
    def serialize(self):
        return {
            "Id": self.Id,
            "Name": self.Name,
            "Description": self.Description,
            "OnetCodes": self.OnetCodes,
        }

    @classmethod
    def get_basic_skills(cls, page=1, per_page=20):
        basic_q = cls.query.limit(per_page).offset((page - 1) * per_page).all()
        num = (cls.query.count()) // per_page
        num += 1 if (cls.query.count()) % per_page else 0
        page = {"current_page": page, "per_page": per_page, "total": num}
        basic = [skill.serialize for skill in basic_q]
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

    @property
    def serialize(self):
        return {
            "Id": self.Id,
            "Name": self.Name,
            "Description": self.Description,
            "OnetCodes": self.OnetCodes,
        }

    @classmethod
    def get_tech_skills(cls, page=1, per_page=20):
        tech_q = cls.query.limit(per_page).offset((page - 1) * per_page).all()
        num = (cls.query.count()) // per_page
        num += 1 if (cls.query.count()) % per_page else 0
        tech = [skill.serialize for skill in tech_q]
        page = {"current_page": page, "per_page": per_page, "total": num}

        return page, tech


class Dtech_Skill(db.Model):
    __tablename__ = "dtech_skills"
    Id = db.Column(db.String(20), db.ForeignKey("tech_skills.Id"), primary_key=True)
    OnetCode = db.Column(db.String(30), primary_key=True)
    Example = db.Column(db.String(100), primary_key=True)
    Hot_technology = db.Column(db.BOOLEAN)


class Course(db.Model):

    """
    This class represents the courses table which contains the courses that are available for the occupations

    """

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

    @property
    def serialize(self):
        return {
            "Id": self.Id,
            "OnetCode": self.OnetCode,
            "Provider": self.Provider,
            "Name": self.Name,
            "Url": self.Url,
            "Type": self.Type,
            "Description": self.Description,
        }

    @classmethod
    def get_count(cls):
        return cls.query.count()

    @classmethod
    def get_courses(
        cls, page=1, per_page=10, sort_by="Id", order="asc", search=None, search_by=None
    ):
        sort_by = "Id" if sort_by == "" else sort_by

        column = getattr(cls, sort_by)

        if search:
            search_column = getattr(cls, search_by)
            search_q = cls.query.filter(search_column.ilike(f"%{search}%"))
        else:
            search_q = cls.query

        # Order
        if order == "asc":
            courses = search_q.order_by(column).paginate(page=page, per_page=per_page)

        else:
            courses = search_q.order_by(column.desc()).paginate(
                page=page, per_page=per_page
            )

        courses_q = [course.serialize for course in courses.items]

        return {
            "Page": page_info(page, per_page, courses, courses_q),
            "Courses": courses_q,
        }

    @classmethod
    def get_course(cls, id):
        course = cls.query.filter_by(Id=id).first()
        return {"Course": course.serialize}

    @classmethod
    def get_courses_by_onet(cls, onet):
        return cls.query.filter_by(OnetCode=onet).all()


class Occupation(db.Model):
    """
    Occupations found by looking at the chosen clusters from ONET and then looking at the top 6 occupations that are in those clusters
    """

    __tablename__ = "occupations"

    onetCode = db.Column(db.String(10), primary_key=True)
    cluster = db.Column(db.String(10), db.ForeignKey("industries.Code"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    median_wage = db.Column(db.Integer)
    pct90_wage = db.Column(db.Integer)
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

    @property
    def serialize(self):
        return {
            "onetCode": self.onetCode,
            "cluster": self.cluster,
            "title": self.title,
            "description": self.description,
            "median_wage": self.median_wage,
            "pct90_wage": self.pct90_wage,
            "outlook": self.outlook,
            "outlook_category": self.outlook_category,
            "curr_employment": self.curr_employment,
            "proj_openings": self.proj_openings,
            "percent_change": self.percent_change,
            "bls": self.bls,
        }

    @classmethod
    def get_occupations(
        cls,
        page=1,
        per_page=10,
        sort_by="onetCode",
        order="asc",
        search=None,
        search_by=None,
    ):
        sort_by = "onetCode" if sort_by == "" else sort_by

        column = getattr(cls, sort_by)

        if search:
            search_column = getattr(cls, search_by)
            search_q = cls.query.filter(search_column.ilike(f"%{search}%"))
        else:
            search_q = cls.query

        outlook_priority = {"Below Average": 1, "Average": 2, "Bright": 3}
        cluster_priority = {
            "4.0000": 1,
            "6.0000": 2,
            "8.0000": 3,
            "11.0000": 4,
            "15.0000": 5,
        }

        if sort_by == "outlook":
            if order == "asc":
                occupations_q = search_q.order_by(
                    case(outlook_priority, value=cls.outlook)
                ).paginate(page=page, per_page=per_page)
            else:
                occupations_q = search_q.order_by(
                    case(outlook_priority, value=cls.outlook).desc()
                ).paginate(page=page, per_page=per_page)

        elif sort_by == "cluster":
            if order == "asc":
                occupations_q = search_q.order_by(
                    case(cluster_priority, value=cls.cluster)
                ).paginate(page=page, per_page=per_page)
            else:
                occupations_q = search_q.order_by(
                    case(cluster_priority, value=cls.cluster).desc()
                ).paginate(page=page, per_page=per_page)

        else:
            if order == "asc":
                occupations_q = search_q.order_by(column).paginate(
                    page=page, per_page=per_page
                )
            else:
                occupations_q = search_q.order_by(column.desc()).paginate(
                    page=page, per_page=per_page
                )

        occupations = [occupation.serialize for occupation in occupations_q.items]

        query_d = {
            "Page": page_info(page, per_page, occupations_q, occupations),
            "Occupations": occupations,
        }

        return query_d

    @classmethod
    def get_occupation(cls, id):
        occ = cls.query.filter_by(onetCode=id).first()
        return {"Occupation": occ.serialize}

    @classmethod
    def get_occupation_by_cluster(cls, id):
        occupations = cls.query.filter_by(cluster=id).all()

        return [occupation.serialize for occupation in occupations]


class Industry(db.Model):

    """
    Derived from onet clusters and chosen by picking the clusters that are most relvent to the college students.
    """

    __tablename__ = "industries"

    Code = db.Column(db.String(10), primary_key=True)
    Group = db.Column(db.String(500))
    Median_wage = db.Column(db.INT)
    Job_codes = db.Column(db.ARRAY(db.String(500)))
    Url = db.Column(db.String(200))

    occupations = db.relationship("Occupation", backref="Industry")

    @property
    def serialize(self):
        return {
            "Code": self.Code,
            "Group": self.Group,
            "Median_wage": self.Median_wage,
            "Job_codes": self.Job_codes,
            "Url": self.Url,
        }

    @classmethod
    def get_clusters(cls, sort_by="Code", order="asc", search=None, search_by=None):
        sort_by = "Code" if sort_by == "" else sort_by

        # clusters = cls.query.all() <-- all() converts the query object to a list

        # specifiy the column to sort by
        column = getattr(cls, sort_by)

        if search:
            # speciy the column to search by
            column_search = getattr(cls, search_by)
            clusters_q = cls.query.filter(column_search.ilike(f"%{search}%"))
        else:
            clusters_q = cls.query

        cluster_priority = {
            "4.0000": 1,
            "6.0000": 2,
            "8.0000": 3,
            "11.0000": 4,
            "15.0000": 5,
        }

        if sort_by == "Code":
            if order == "asc":
                order_q = clusters_q.order_by(case(cluster_priority, value=cls.Code))
            else:
                order_q = clusters_q.order_by(
                    case(cluster_priority, value=cls.Code).desc()
                )
        else:
            if order == "asc":
                order_q = clusters_q.order_by(column).all()
            else:
                order_q = clusters_q.order_by(column.desc()).all()

        return {"Clusters": [cluster.serialize for cluster in order_q]}

    @classmethod
    def get_cluster(cls, id):
        cluster = cls.query.filter_by(Code=id).first()
        cluster = {
            key: value
            for key, value in cluster.__dict__.items()
            if key != "_sa_instance_state"
        }

        occupations = Occupation.get_occupation_by_cluster(id)

        return {"Cluster": cluster, "Occupations": occupations}

    @classmethod
    def get_cluster_name(cls, id):
        cluster = cls.query.filter_by(Code=id).first()
        cluster = cluster.serialize
        return cluster["Group"]
