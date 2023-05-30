/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import UseFetch from "../../utils/UseFetch";

function ViewCluster() {
  const { id } = useParams();
  const [cluster, setCluster] = useState();
  const [occupations, setOccupations] = useState();

  UseFetch(`/api/clusters/${id}`, {
    Cluster: setCluster,
    Occupations: setOccupations,
  });
  return (
    <>
      {cluster && (
        <>
          <h1 className="text-center py-5">Cluster Details</h1>
          <Container>
            <Row>
              <Card>
                <Card.Header className="text-center">
                  Code: {cluster.Code}
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Title>{cluster.Group}</Card.Title>
                  {/* <Link
                    to={`/locations/${cluster["CityID"]}`}
                    className="btn btn-primary mx-2 my-2"
                  >
                    View {cluster["CityName"]}
                  </Link> */}
                  <Link
                    to={cluster.Url}
                    className="btn btn-primary mx-2 my-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ONET Link
                  </Link>
                  <Link
                    to={`/Jobs/cluster/${cluster.Code}`}
                    className="btn btn-primary mx-2 my-2"
                  >
                    View Jobs
                  </Link>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>Median Wage:</b> {cluster.Median_wage}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Row>
          </Container>
          <Container>
            <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
              {occupations &&
                occupations.map((occupation) => (
                  <Col key={occupation.onetCode}>
                    <Card className="m-3">
                      <Card.Body>
                        <Card.Title>{occupation.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {occupation.cluster}
                        </Card.Subtitle>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>
                          <b>Median Wage:</b> {occupation.median_wage}
                        </ListGroupItem>
                      </ListGroup>
                      <Card.Body>
                        <Link
                          to={`/Occupations/${occupation.onetCode}`}
                          className="btn btn-primary mx-2 my-2"
                        >
                          View {occupation.title}
                        </Link>
                      </Card.Body>
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

export default ViewCluster;
