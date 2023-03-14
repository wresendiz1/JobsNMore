import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import MainLayout from "../../components/Layout/MainLayout";
import Logo from "../../images/logos/png/logo-no-slogan.png";
import AboutCard from "../../components/AboutCard/AboutCard";
import Spinner from "../../components/Spinner/Spinner";

function About() {
  /*   lazy initial state, runs only once, once we have our data in session storage this
  will be the way we get our gitlab data */

  const [data, setData] = useState(() => {
    const cached = sessionStorage.getItem("about");
    return cached ? JSON.parse(cached) : null;
  });

  // fetch data from backend and store in state and cache
  useEffect(() => {
    if (!data) {
      fetch("/about")
        .then((res) => res.json())
        .then((gitlab) => {
          setData(gitlab);
          sessionStorage.setItem("about", JSON.stringify(gitlab));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <MainLayout>
      <Container fluid className="h-50 bg-gradient2">
        <Container className="align-items-center py-5">
          <Row>
            <Col>
              <Image src={Logo} className="img-fluid" />
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
        <Spinner />
      ) : (
        <AboutCard data={data} />
      )}
    </MainLayout>
  );
}

export default About;
