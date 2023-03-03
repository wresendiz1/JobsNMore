import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import MainLayout from '../../components/Layout/MainLayout';
import Img from '../../images/logos/png/logo-no-slogan.png';
import AboutCard from '../../components/AboutCard/AboutCard';

// data sources
import bls from '../../images/About/Data/bls.png';
import census from '../../images/About/Data/census.png';
import linkup from '../../images/About/Data/linkup.png';
import onet from '../../images/About/Data/onet.png';
import skills from '../../images/About/Data/skills.png';
import gitlab from '../../images/About/Tools/gitlab.png';
import janzz from '../../images/About/Data/janzz.png';
import yt from '../../images/About/Data/youtube.png';

// tools
import fl from '../../images/About/Tools/flask.png';
import pt from '../../images/About/Tools/pytest.png';
import rq from '../../images/About/Tools/requests.png';
import bs from '../../images/About/Tools/bootstrap.png';
import sl from '../../images/About/Tools/slack.png';

// icons

// backend data

function About() {
  // fetch data from backend and store in state
  const [data, setData] = useState();
  useEffect(
    () => {
      axios.get('/about')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    },
    [],
  );
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
                JobsNMore is your one-stop shop for job search and career advancement.
                The website tracks the latest job listing from multiple sources,
                the statistics on the skills required,
                and recommended online courses to fulfill skills.
              </p>
            </Col>

          </Row>
        </Container>

      </Container>
      {!data ? (
        <Container className="d-flex align-items-center justify-content-center min-vh-100" variant="primary">
          <Spinner animation="border" />
        </Container>

      )
        : (<AboutCard data={data} />)}
      {!data ? (
        <Container className="d-flex align-items-center justify-content-center min-vh-100" variant="primary">
          <Spinner animation="border" />
        </Container>

      ) : (

      // TODO: Modulate this container into a component
        <Container>
          <h1 className="text-center py-5">Project Stats</h1>
          <ListGroup>
            <ListGroupItem className="d-flex justify-content-between">
              Total Commits
              <span className="badge bg-primary rounded-pill">{data && data[0][0]}</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between">
              Total Issues
              <span className="badge bg-primary rounded-pill">{data && data[1][0]}</span>
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between">
              Total Unit Tests
              <span className="badge bg-primary rounded-pill">1</span>
            </ListGroupItem>
          </ListGroup>
          <div className="buttondiv">
            <a href="https://gitlab.com/javier.ramirez5/cs331e-idb/-/boards" className="btn btn-primary" rel="noopener noreferrer" target="_blank">
              <span>
                <FontAwesomeIcon icon={faGitlab} />
                {' '}
                Issue Tracker
              </span>
            </a>
            <a href="https://gitlab.com/javier.ramirez5/cs331e-idb" className="btn btn-primary" rel="noopener noreferrer" target="_blank">
              <span>
                <FontAwesomeIcon icon={faGitlab} />
                {' '}
                Repo
              </span>
            </a>
            <a href="https://gitlab.com/javier.ramirez5/cs331e-idb/-/wikis/JobsNMore" className="btn btn-primary" rel="noopener noreferrer" target="_blank">
              <span>
                <FontAwesomeIcon icon={faGitlab} />
                {' '}
                Wiki
              </span>
            </a>
          </div>
        </Container>
      )}
      {/* TODO: Modulate this container into a component */}
      <Container className="py-5">
        <h1 className="text-center py-5">Data Sources</h1>
        <Row className="py-4 align-items-center">
          <Col className="text-center">
            <a href="https://rapidapi.com/community/api/bls-public-data/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={bls} />
            </a>
          </Col>
          <Col className="text-center">
            <a href="https://www.census.gov/data/developers/data-sets.html" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={census} />
            </a>
          </Col>
          <Col className="text-center">
            <a href="https://rapidapi.com/LinkUpJobSearch/api/linkup-job-search/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={linkup} />
            </a>
          </Col>
        </Row>
        <Row className="py-4 align-items-center">
          <Col className="text-center">
            <a href="https://services.onetcenter.org/v1.9/reference/mnm/career/state/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={onet} />
            </a>
          </Col>
          <Col className="text-center">
            <a href="https://rapidapi.com/ItsYourSkills/api/skills-profiler/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={skills} />
            </a>
          </Col>
          <Col className="text-center">
            <a href="https://docs.gitlab.com/ee/api/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={gitlab} />
            </a>
          </Col>
        </Row>
        <Row className="py-4 align-items-center">
          <Col className="text-center">
            <a href="https://rapidapi.com/janzz-ltd-janzz-ltd-default/api/ontology1/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-75 mx-auto" src={janzz} />
            </a>
          </Col>
          <Col className="text-center">
            <a href="https://developers.google.com/youtube/v3/" rel="noopener noreferrer" target="_blank=">
              <Image className="w-50 mx-auto" src={yt} />
            </a>
          </Col>
        </Row>
      </Container>
      {/* TODO: Modulate this container into a component */}
      <Container className="py-5">
        <h1 className="text-center py-5">Tools Used</h1>
        <Row className="row py-4 align-items-center">
          <Col className="text-center">
            <Image className="w-75 mx-auto" src={fl} />
          </Col>
          <Col className="text-center">
            <Image className="w-75 mx-auto" src={pt} />
          </Col>
          <Col className="text-center">
            <Image className="w-75 mx-auto" src={rq} />
          </Col>
        </Row>
        <Row className="row py-4  align-items-center">

          <Col className="text-center">
            <Image className="w-75 mx-auto" src={bs} />

          </Col>
          <Col className="text-center">
            <Image className="w-75 mx-auto" src={gitlab} />

          </Col>
          <Col className="text-center">
            <Image className="w-75 mx-auto" src={sl} />
          </Col>
        </Row>
      </Container>

    </MainLayout>
  );
}

export default About;
