import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

function Clusters() {
  const [clusters, setClusters] = useState();
  useEffect(() => {
    fetch("/api/clusters")
      .then((res) => res.json())
      .then((data) => {
        setClusters(data["Clusters"]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Career Clusters</h1>
      <Container className="min-vh-100">
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
          {clusters &&
            clusters.map((cluster) => (
              <Col md={4} key={cluster.code} className="my-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{cluster["title"]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {cluster["code"]}
                    </Card.Subtitle>
                    <Card.Text>
                      <Link
                        to={`/Clusters/${cluster.code}`}
                        className="btn btn-info mx-2"
                      >
                        Cluster Info
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Clusters;
