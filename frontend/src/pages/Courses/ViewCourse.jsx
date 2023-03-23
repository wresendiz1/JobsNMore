import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

function ViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState();

  useEffect(() => {
    fetch(`/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {course && (
        <MainLayout>
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
                  </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default ViewCourse;
