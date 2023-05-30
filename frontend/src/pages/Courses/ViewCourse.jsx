/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import UseFetch from "../../utils/UseFetch";

function ViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState();

  UseFetch(`/api/courses/${id}`, { Course: setCourse });
  return (
    <>
      {course && (
        <>
          <h1 className="text-center py-5">Course Details</h1>
          <Container className="min-vh-100">
            <Row>
              <Card>
                <Card.Header className="text-center">
                  {" "}
                  Course Information{" "}
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Title>{course.Name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {course.Type}
                  </Card.Subtitle>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Provider: {course.Provider}</ListGroupItem>
                    <ListGroupItem>
                      Description: {course.Description}
                    </ListGroupItem>
                    <ListGroupItem>
                      Take Course:
                      <a
                        className="mx-2"
                        href={course.Url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link to={`/Jobs/course/${course.Id}`}>
                        <Button variant="primary">View Jobs</Button>
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default ViewCourse;
