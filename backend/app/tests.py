# fmt: off
import pytest
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))
from app import create_app, db 
from app.models import Location, Job, Occupation, Industry, Course, Tech_Skill, Dtech_Skill, Basic_Skill, Dbasic_Skill
from sqlalchemy.exc import IntegrityError, DataError
import random
# fmt: on

""" use session to create the app once and then use it for all tests which is faster. Switch to
function scope if you need to isolate errors between tests."""


@pytest.fixture(scope="session")
def app():
    app = create_app("intialize_db")
    app.config.update(
        {
            "TESTING": True,
        }
    )
    return app


""" creates a new database session for each test. This is slower but ensures that each test is isolated from the others. """


@pytest.fixture()
def database(app):
    with app.app_context():
        yield db
        db.session.remove()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_request_example(client):
    response = client.get("/")
    assert response.status_code == 200


def test_db_inserting_course_incorrect(database):
    # Raise an error as there is a foreign key constraint from course to occupation
    # start a new session to test the error
    with pytest.raises(IntegrityError):
        s = Course(
            Id="123",
            OnetCode="123",
            Provider="123",
            Name="123",
            Url="123",
            Type="123",
            Description="123",
        )

        database.session.add(s)
        database.session.commit()

    """ NOTE: we dont have to delete the course as it will be deleted when the session is closed 
    as long as we dont commit"""


def test_db_inserting_course(database):
    # from app.models import Course

    case = Course(
        Id="1123",
        # Must give a valid occupation
        OnetCode="15-1252.00",
        Provider="123",
        Name="123",
        Url="123",
        Type="123",
        Description="123",
    )
    database.session.add(case)
    r = database.session.query(Course).filter_by(Id="1123").one()
    assert r.Id == "1123"


def test_db_querying_course(database):
    course = database.session.query(Course).filter_by(Id="3998-B").one()
    assert course.Type == "Advanced"


def test_db_vartype_course(database):
    entries = Course.query.all()
    testEntry = random.choice(entries)

    assert isinstance(testEntry.Id, str)
    assert isinstance(testEntry.OnetCode, str)
    assert isinstance(testEntry.Provider, str)
    assert isinstance(testEntry.Name, str)
    assert isinstance(testEntry.Url, str)
    assert isinstance(testEntry.Type, str)
    assert testEntry.Description == None or isinstance(testEntry.Description, str)


def test_db_inserting_location(database):
    # Case with right type of variables
    case = Location(
        City="Los Santos",
        State="San Andreas",
        Population=1234,
        Budget="Low",
        Safety="Low",
        Average_rat=5,
        Guide="fakewebsite.com",
        CityID=42,
        Photos={"photo.png"},
    )

    database.session.add(case)
    r = database.session.query(Location).filter_by(City="Los Santos").one()
    assert r.CityID == 42


def test_db_queryingType_location(database):
    with pytest.raises(DataError):
        # Indexing data by the wrong type of variable
        location = database.session.execute(
            database.select(Location).filter_by(CityID="one")
        ).one()


def test_postgres_query_location(database):
    city = database.session.execute(
        database.select(Location).filter_by(CityID=1)
    ).scalar_one()
    assert city.City == "New York"