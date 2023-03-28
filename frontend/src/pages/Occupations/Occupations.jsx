import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import MainLayout from "../../components/Layout/MainLayout";

function Occupations() {
  const [page, setPage] = useState();
  const [occupations, setOccupations] = useState();
  useEffect(() => {
    fetch("/api/occupations")
      .then((res) => res.json())
      .then((data) => {
        setOccupations(data["Occupations"]);
        setPage(data["Page"]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Occupations</h1>
      <Container>
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
          {occupations &&
            occupations.map((occupation) => (
              <Col key={occupation["OnetCode"]}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Title>{occupation["title"]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {occupation["cluster"]}
                    </Card.Subtitle>

                    {/* <Card.Text>{occupation["description"]}</Card.Text> */}
                    {/* <Card.Text>
                    Median Wage: {occupation["median_wage"]}
                  </Card.Text>
                  <Card.Text>90th Wage: {occupation["pct90_wage"]}</Card.Text>
                  <Card.Text>Outlook: {occupation["outlook"]}</Card.Text>
                  <Card.Text>
                    Outlook Category: {occupation["outlook_category"]}
                  </Card.Text>
                  <Card.Text>
                    Current Employment: {occupation["curr_employment"]}
                  </Card.Text>
                  <Card.Text>
                    Projected Employment: {occupation["proj_openings"]}
                  </Card.Text>
                  <Card.Text>
                    Percent Change: {occupation["percent_change"]}
                  </Card.Text>
                  <Card.Text>
                    <a
                      href={occupation["bls"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BLS
                    </a>
                  </Card.Text> */}
                    {/* <Link to={`/jobs/occupation/${occupation.OnetCode}`} className="btn btn-primary mx-2">
                  Find Jobs
                </Link> */}
                    <Link
                      to={`/Occupations/${occupation.OnetCode}`}
                      className="btn btn-primary mx-2"
                    >
                      Info
                    </Link>
                    <Link
                      to={`/Clusters/${occupation.cluster}`}
                      className="btn btn-info mx-2"
                    >
                      Cluster Info
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Occupations;
