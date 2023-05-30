import React, { useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sorting from "../../components/Sorting/Sorting";
import UseFetch from "../../utils/UseFetch";
import defaultQueryParams from "../../utils/QueryParams";
import ShowItems from "../../components/Sorting/ShowItems";
import { SortPage } from "../../utils/QueryUtils";

function Clusters() {
  const [clusters, setClusters] = useState();
  const [query, setQuery] = useState(defaultQueryParams);

  const sortValues = [
    { id: "Code", name: "Code" },
    { id: "Group", name: "Group" },
    { id: "Median_wage", name: "Median Wage" },
  ];

  const searchValues = sortValues.slice(0, 2);

  UseFetch("/api/clusters", { Clusters: setClusters }, query);

  return (
    <>
      {/* <h1 className="text-center py-5">Career Clusters</h1> */}
      {clusters && (
        <>
          <ShowItems pageName="Clusters" page={Clusters} />
          <Sorting
            page={clusters}
            handler={(form) => SortPage(form, setQuery)}
            sortValues={sortValues}
            searchValues={searchValues}
          />
        </>
      )}

      <Container className="min-vh-100">
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
          {clusters && clusters.length > 0
            ? clusters.map((cluster) => (
                <Col md={4} key={cluster.Code} className="my-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{cluster.Group}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {cluster.Code}
                      </Card.Subtitle>
                      <Card.Text>
                        <Link
                          to={`/Clusters/${cluster.Code}`}
                          className="btn btn-info mx-2"
                        >
                          Cluster Info
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : clusters && (
                <Container style={{ height: "50vh" }}>
                  <h2 className="text-center fw-lighter text-muted">
                    No Results
                  </h2>
                </Container>
              )}
        </Row>
      </Container>
    </>
  );
}

export default Clusters;
