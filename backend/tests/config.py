# fmt: off
import pytest
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))
from app import create_app, db 
from app.models import Location, Job, Occupation, Industry, Course, Tech_Skill, Dtech_Skill, Basic_Skill, Dbasic_Skill
from sqlalchemy.exc import IntegrityError

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


def test_postgres_query(database):
    city = database.session.execute(
        database.select(Location).filter_by(CityID=1)
    ).scalar_one()
    assert city.City == "New York"


def test_db_relations(database):
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


def test_db_inserting(database):
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
