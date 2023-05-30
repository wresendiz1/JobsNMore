/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function AboutCard({ data }) {
  const [info, setInfo] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch("/api/about.json", { signal })
      .then((res) => res.json())
      .then((about) => {
        setInfo(about);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-center py-5">Meet the Team</h1>
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4 justify-content-center">
          {info &&
            info.Team.map((member) => (
              <Col key={member.Name}>
                <Card className="mb-3 h-100">
                  <Card.Body>
                    <Card.Title>{member.Name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {member.Role}
                    </Card.Subtitle>
                  </Card.Body>
                  <Card.Img
                    variant="bottom"
                    className="w-85 mx-auto rounded"
                    src={member.Image}
                  />
                  <Card.Body>
                    <Card.Text>{member.About}</Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Commits:
                      <Badge pill bg="primary" className="ms-2">
                        {data && member.Email2
                          ? data.Commits.User[member.Email] +
                            data.Commits.User[member.Email2]
                          : data.Commits.User[member.Email]}
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Issues:
                      <Badge pill bg="primary" className="ms-2">
                        {data && data.Issues.User[member.Username]
                          ? data.Issues.User[member.Username]
                          : 0}
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Unit Tests:{" "}
                      <Badge pill bg="primary" className="ms-2">
                        {data && member.Test}
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      <Container>
        <h1 className="text-center py-5">Project Stats & Info</h1>
        <ListGroup>
          {info &&
            info.Stats.map((stat, index) => (
              <ListGroup.Item
                className="d-flex justify-content-between"
                key={stat}
              >
                {`Total ${stat}`}
                <span className="badge bg-primary rounded-pill">
                  {data && index !== 2 ? data[stat].Total : 11}
                </span>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
      <div className="buttondiv">
        {info &&
          info.Repos.map((repo) => (
            <a
              key={Object.values(repo)}
              href={Object.values(repo)}
              className="btn btn-primary"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>
                <FontAwesomeIcon icon={faGitlab} /> {Object.keys(repo)}
              </span>
            </a>
          ))}
      </div>
      <div className="buttondiv">
        {info &&
          info.Extra.map((link) => (
            <a
              key={Object.values(link)}
              href={Object.values(link)}
              className="btn btn-primary"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>
                <FontAwesomeIcon icon={faLink} /> {Object.keys(link)}
              </span>
            </a>
          ))}
      </div>
      <Container>
        <h1 className="text-center py-5">Data Sources</h1>
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-5 justify-content-center">
          {info &&
            info.Data.map((link) => (
              <Col className="text-center" key={Object.keys(link)}>
                <a
                  href={Object.values(link)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    className="w-75"
                    src={Object.keys(link)}
                    style={{
                      aspectRatio: 4 / 3,
                      objectFit: "contain",
                    }}
                  />
                </a>
              </Col>
            ))}
        </Row>
      </Container>
      <Container>
        <h1 className="text-center py-5">Tools Used</h1>
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-5 justify-content-center">
          {info &&
            info.Tools.map((tool) => (
              <Col className="text-center" key={tool}>
                <Image
                  className="w-75"
                  src={tool}
                  style={{ aspectRatio: 4 / 3, objectFit: "contain" }}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default AboutCard;
