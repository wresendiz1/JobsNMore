/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import UseFetch from "../../utils/UseFetch";

function ViewOccupation() {
  const { id } = useParams();
  const [occupation, setOccupation] = useState();
  const formatDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatComma = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

  UseFetch(`/api/occupations/${id}`, { Occupation: setOccupation });

  return (
    <>
      {occupation && (
        <>
          <h1 className="text-center py-5">Occupation Details</h1>
          <Container className="min-vh-100">
            <Row>
              <Card>
                <Card.Header className="text-center">
                  {occupation.title}
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="my-2">
                      {occupation.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="my-2">
                      Median: {formatDollar.format(occupation.median_wage)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Top 10%:{" "}
                      {occupation.pct90_wage === 208000
                        ? `${formatDollar.format(
                            occupation.pct90_wage
                          )} or more`
                        : `${formatDollar.format(occupation.pct90_wage)}`}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Outlook: {occupation.outlook}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Outlook Category: {occupation.outlook_category}
                    </ListGroup.Item>
                    <ListGroupItem>
                      Workforce:{" "}
                      {formatComma.format(occupation.curr_employment)}
                    </ListGroupItem>
                    <ListGroupItem>
                      Projected Openings:{" "}
                      {formatComma.format(occupation.proj_openings)}
                    </ListGroupItem>
                    <ListGroupItem>
                      BLS Info:
                      <a
                        className="mx-2"
                        href={occupation.bls}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link
                        to={`/Jobs/occupation/${occupation.onetCode}`}
                        className="btn btn-primary mx-2"
                      >
                        Find Jobs
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

export default ViewOccupation;
