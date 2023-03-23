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

function ViewCluster() {
  const { id } = useParams();
  const [cluster, setCluster] = useState();
  useEffect(() => {
    fetch(`/clusters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCluster(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {cluster && (
        <MainLayout>
          <h1 className="text-center py-5">Cluster Details</h1>
          <Container className="min-vh-100">
            <Row>
              <Card>
                <Card.Header className="text-center">
                  Code: {cluster["Code"]}
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Title>{cluster["Group"]}</Card.Title>
                  {/* <Link
                    to={`/locations/${cluster["CityID"]}`}
                    className="btn btn-primary mx-2 my-2"
                  >
                    View {cluster["CityName"]}
                  </Link> */}
                  <Link to={cluster.Url} className="btn btn-primary mx-2 my-2">
                    ONET Link
                  </Link>
                  <Link
                    to={`/Jobs/cluster/${cluster["Code"]}`}
                    className="btn btn-primary mx-2 my-2"
                  >
                    View Jobs
                  </Link>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>Median Wage:</b> {cluster["Median_wage"]}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Row>
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default ViewCluster;
