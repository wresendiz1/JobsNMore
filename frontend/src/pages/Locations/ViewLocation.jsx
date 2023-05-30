/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import UseFetch from "../../utils/UseFetch";

function ViewLocation() {
  const { id } = useParams();
  const [location, setLocation] = useState();
  const [jobs, setJobs] = useState();
  UseFetch(`/api/locations/${id}`, { Location: setLocation, Jobs: setJobs });
  return (
    <>
      {jobs && (
        <>
          <h1 className="text-center py-5">City Details</h1>

          <Container>
            <Row>
              <Card>
                <Card.Header className="text-center">
                  {location.City}, {location.State}
                </Card.Header>
                <Card.Img
                  variant="top"
                  src={
                    location.Photos[
                      Math.floor(Math.random() * location.Photos.length)
                    ]
                  }
                />
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      Rating: {location.Average_rat}
                    </ListGroupItem>
                    <ListGroupItem>
                      Population: {location.Population}
                    </ListGroupItem>
                    <ListGroupItem>Budget: {location.Budget}</ListGroupItem>
                    <ListGroupItem>Safety: {location.Safety}</ListGroupItem>
                    <ListGroupItem>
                      Guide:{" "}
                      <a
                        className="mx-2"
                        href={location.Guide}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Row>
            <Link
              to={`/Jobs/location/${location.CityID}`}
              className="btn btn-primary mx-2 my-2"
            >
              More Jobs
            </Link>
            <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
              {jobs.map((job) => (
                <Col key={job.Id}>
                  <Card>
                    <Card.Header className="text-center">
                      {job.JobTitle}
                    </Card.Header>
                    <Card.Body className="text-center">
                      <Card.Title>{job.Company}</Card.Title>
                      <Button
                        variant="primary"
                        href={job.Url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Job
                      </Button>
                      <Link
                        to={`/jobs/${job.Id}`}
                        className="btn btn-primary mx-2"
                      >
                        More Info
                      </Link>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      Posted on: {job.DatePosted}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default ViewLocation;
