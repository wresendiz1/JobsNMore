import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Sorting from "../../components/Sorting/Sorting";

function Clusters() {
  const [clusters, setClusters] = useState();
  const order = useRef();
  const sort = useRef();

  useEffect(() => {
    fetch("/api/clusters")
      .then((res) => res.json())
      .then((data) => {
        setClusters(data.Clusters);
        // console.log(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const sortPage = (sort, order, e) => {
    e.preventDefault();
    fetch(
      `/api/clusters?&sort_by=${sort.current.value}&order=${order.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setClusters(data.Clusters);
      });
  };

  const value_name = [
    { id: "Code", name: "Relevance" },
    { id: "Group", name: "Group" },
    { id: "Median_wage", name: "Median Wage" },
  ];

  return (
    <MainLayout>
      {/* <h1 className="text-center py-5">Career Clusters</h1> */}
      {clusters && (
        <Sorting
          page_name={"Clusters"}
          page={clusters}
          handler={sortPage}
          value_name={value_name}
          order={order}
          sort={sort}
        />
      )}

      <Container className="min-vh-100">
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
          {clusters &&
            clusters.map((cluster) => (
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
            ))}
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Clusters;
