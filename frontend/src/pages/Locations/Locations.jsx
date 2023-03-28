import React, { useEffect, useState } from "react";
import { ListGroup, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

function Locations() {
  const [page, setPage] = useState();
  const [locations, setLocations] = useState();
  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data["Locations"]);
        setPage(data["Page"]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Locations</h1>

      <Container className="d-flex flex-wrap justify-content-center">
        {locations &&
          locations.map((location) => (
            <Card
              key={location.CityID}
              className="m-3"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>
                  {location.City}, {location.State}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Population: {location.Population}
                </Card.Subtitle>
                {/* TODO: query occupation DB to get average pay or use google API in next phase */}
                <Card.Text>{location.Description}</Card.Text>

                <ListGroup>
                  <ListGroup.Item>Budget: {location.Budget}</ListGroup.Item>
                  <ListGroup.Item>Safety: {location.Safety}</ListGroup.Item>
                  <ListGroup.Item>
                    Average Rating: {location.Average_rat}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                  <ListGroup.Item>
                    <Link
                      to={`/Locations/${location.CityID}`}
                      className="btn btn-primary mx-2"
                    >
                      View Info
                    </Link>
                    <Button
                      variant="primary"
                      href={location.Guide}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Guide
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </MainLayout>
  );
}

export default Locations;
