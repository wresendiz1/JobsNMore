import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import MainLayout from "../../components/Layout/MainLayout";
import Img from "../../images/logos/png/logo-no-slogan.png";
import AboutCard from "../../components/AboutCard/AboutCard";

// backend data

function About() {
  // fetch data from backend and store in state
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("/about")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <Container fluid className="h-50 bg-gradient2">
        <Container className="align-items-center py-5">
          <Row>
            <Col>
              <Image src={Img} className="img-fluid" />
            </Col>
            <Col>
              <h1 className="py-4">Simple and informative.</h1>
              <p>
                JobsNMore is your one-stop shop for job search and career
                advancement. The website tracks the latest job listing from
                multiple sources, the statistics on the skills required, and
                recommended online courses to fulfill skills.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      {!data ? (
        <Container
          className="d-flex align-items-center justify-content-center min-vh-100"
          variant="primary"
        >
          <Spinner animation="border" />
        </Container>
      ) : (
        <AboutCard data={data} />
      )}
    </MainLayout>
  );
}

export default About;
