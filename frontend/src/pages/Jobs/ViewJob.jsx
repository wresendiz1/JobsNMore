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
  Tab,
} from "react-bootstrap";
import UseFetch from "../../utils/UseFetch";

function ViewJob() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [courses, setCourses] = useState();
  const formatDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatComma = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

  // useEffect(() => {
  //   UseFetch(`/api/jobs/${id}`).then((data) => {
  //     setJob(data["Job Info"]);
  //     setCourses(data.Courses);
  //   });
  // }, []);
  UseFetch(`/api/jobs/${id}`, { "Job Info": setJob, Courses: setCourses });
  return (
    <>
      {job && (
        <>
          <h1 className="text-center py-5">Job Details</h1>

          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="text-center">
                    Job Information
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Card.Title>{job.JobTitle}</Card.Title>
                    {job.Company}
                    <Link
                      to={`/locations/${job.JCityID}`}
                      className="btn btn-primary mx-2 my-2"
                    >
                      View {job.JobLocation}
                    </Link>
                  </Card.Body>
                  <Card.Body>
                    <Card.Title>Job Description</Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <Button
                      variant="info"
                      href={job.Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-4"
                    >
                      View Job
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Posted on : {job.DatePosted}
                  </Card.Footer>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="text-center">
                    Occupation Outlook
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="text-center">{job.title}</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="my-2">
                        Median: {formatDollar.format(job.median_wage)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Top 10%:{" "}
                        {job.pct90_wage === 208000
                          ? `${formatDollar.format(job.pct90_wage)} or more`
                          : `${formatDollar.format(job.pct90_wage)}`}
                      </ListGroup.Item>
                      <ListGroup.Item>Outlook: {job.outlook}</ListGroup.Item>
                      <ListGroup.Item>
                        Outlook Category: {job.outlook_category}
                      </ListGroup.Item>
                      <ListGroupItem>
                        Workforce: {formatComma.format(job.curr_employment)}
                      </ListGroupItem>
                      <ListGroupItem>
                        Projected Openings:{" "}
                        {formatComma.format(job.proj_openings)}
                      </ListGroupItem>
                      <ListGroupItem>
                        BLS Info:
                        <a
                          className="mx-2"
                          href={job.bls}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="text-center">
                    Courses Available
                  </Card.Header>
                  <Card.Body>
                    <Tab.Container
                      id="list-group-tabs-example"
                      defaultActiveKey="#link1"
                    >
                      <Row>
                        <Col sm={4}>
                          <ListGroup>
                            {courses.map((course) => (
                              <ListGroup.Item
                                action
                                href={`#link${course.Id}`}
                                key={course.Id}
                              >
                                {course.Name}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>
                        <Col sm={8}>
                          <Tab.Content>
                            {courses.map((course) => (
                              <Tab.Pane
                                eventKey={`#link${course.Id}`}
                                key={course.Id}
                              >
                                <Card.Title>{course.Name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {course.Provider}
                                </Card.Subtitle>
                                <Card.Text>{course.Description}</Card.Text>
                                <Card.Text>Type: {course.Type}</Card.Text>
                                <Card.Link href={course.Url}>
                                  Take Course
                                </Card.Link>
                              </Tab.Pane>
                            ))}
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default ViewJob;
