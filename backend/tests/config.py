# fmt: off
import pytest
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))
from app import create_app, db


""" use session to create the app once and then use it for all tests which is faster. Switch to
function scope if you need to isolate errors between tests."""
@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.config.update(
        {
            "TESTING": True,
        }
    )
    with app.app_context():
        yield app
        # teardown
        db.session.remove()
        db.drop_all()
        


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_request_example(client):
    response = client.get("/")
    assert response.status_code == 200


def test_postgres_query():
    from app.models import Location
    city = db.session.execute(db.select(Location).filter_by(CityID = 1)).scalar_one()
    assert city.City == 'New York'
        
def test_my_feature():
    from app.models import Course
    
    s = Course(Id = "123", OnetCode = "123", Provider = "123", Name = "123", Url = "123", Type = "123", Description = "123")
    db.session.add(s)
    db.session.commit()
    r = db.session.query(Course).filter_by(Id = '123').one()
    
    assert r.Id == '123'          
    
    r = db.session.query(Course).filter_by(Id = '123').delete()
    db.session.commit()
