import { useEffect, useState } from 'react';
import React from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Img from '../../images/logos/png/logo-no-slogan.png'
import Spinner from 'react-bootstrap/Spinner';

// headshots
import p1 from '../../images/About/willy.png'
import p2 from '../../images/About/javier.jpg'
import p3 from '../../images/About/cade.jpg'
import p4 from '../../images/About/jesus.jpg'

// data sources
import bls from '../../images/About/Data/bls.png'
import census from '../../images/About/Data/census.png'
import linkup from '../../images/About/Data/linkup.png'
import onet from '../../images/About/Data/onet.png'
import skills from '../../images/About/Data/skills.png'
import gitlab from '../../images/About/Tools/gitlab.png'
import janzz from '../../images/About/Data/janzz.png'
import yt from '../../images/About/Data/youtube.png'

// tools
import fl from '../../images/About/Tools/flask.png'
import pt from '../../images/About/Tools/pytest.png'
import rq from '../../images/About/Tools/requests.png'
import bs from '../../images/About/Tools/bootstrap.png'
import sl from '../../images/About/Tools/slack.png'

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';

// backend data
import axios from 'axios';



function About() {
    // fetch data from backend and store in state
    const [data, setData] = useState();
    useEffect(() => {
        axios.get('/about')
            .then(res => setData(res.data))
            .catch(err => console.log(err))

    }
        , [])
    return (
        <>
            <MainLayout>
                <Container fluid className='h-50 bg-gradient2'>
                    <Container className='align-items-center py-5'>
                        <Row>
                            <Col>
                                <Image src={Img} className='img-fluid'></Image>
                            </Col>
                            <Col>
                                <h1 className='py-4'>Simple and informative.</h1>
                                <p>JobsNMore is your one-stop shop for job search and career advancement.
                                    The website tracks the latest job listing from multiple sources, the statistics on the skills required,
                                    and recommended online courses to fulfill skills.</p>
                            </Col>

                        </Row>
                    </Container>

                </Container>
                {!data ? (
                    <Container className='d-flex align-items-center justify-content-center min-vh-100' variant='primary'>
                        <Spinner animation="border" className='mx-auto' />
                    </Container>



                ) :
                    (<Container className='align-items-center'>
                        <h1 className="text-center py-5">Meet the Team</h1>
                        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
                            <Col>
                                <div className="card mb-3 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Willy Resendiz</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Lead Frontend + Backend</h6>
                                    </div>
                                    <Image className="w-85 mx-auto rounded" src={p1} alt="Card image cap"></Image>
                                    <div className="card-body">
                                        <p className="card-text">I am a third-year student at the University of Texas at Austin,
                                            majoring in Management Information Systems and pursuing a certificate in Computer Science.</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Commits:
                                            <span className=" ms-2 badge bg-primary rounded-pill">
                                                {data && data[0][1]['wresendiz@utexas.edu']}
                                            </span>
                                        </li>
                                        <li className="list-group-item">Issues:<span className=" ms-2 badge bg-primary rounded-pill">
                                            {data && data[1][1]['wresendiz']}
                                        </span></li>
                                        <li className="list-group-item">Unit tests:<span className=" ms-2 badge bg-primary rounded-pill">
                                            1
                                        </span></li>

                                    </ul>

                                </div>
                            </Col>
                            <Col>
                                <div className="card mb-3 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Javier Ramirez</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Backend</h6>
                                    </div>
                                    <Image className="mx-auto w-72 rounded" src={p2} alt="Card image cap"></Image>
                                    <div className="card-body">
                                        <p className="card-text">I am third-year student at the University of Texas at Austin,
                                            studying mechanical engineering with a certificate in Computer Science.</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Commits: <span className=" ms-2 badge bg-primary rounded-pill">
                                            {data && data[0][1]['javier.ramirez5@utexas.edu'] + data[0][1]['javierr8906@gmail.com']}

                                        </span>
                                        </li>
                                        <li className="list-group-item">Issues: <span className=" ms-2 badge bg-primary rounded-pill">
                                            {data && data[1][1]['javier.ramirez5']}
                                        </span></li>
                                        <li className="list-group-item">Unit tests:<span className=" ms-2 badge bg-primary rounded-pill"> 1</span></li>

                                    </ul>

                                </div>
                            </Col>
                            <Col>
                                <div className="card mb-3 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Cade Taylor</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Backend</h6>
                                    </div>
                                    <Image className="w-90 mx-auto" src={p3} alt="Card image cap"></Image>
                                    <div className="card-body">
                                        <p className="card-text">I am a fourth-year student at the University of Texas at Austin,
                                            studying Mathematics with a certificate in Computer Science.</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Commits: <span className=" ms-2 badge bg-primary rounded-pill">
                                            {data && data[0][1]['cade.taylor01@gmail.com']}
                                        </span>
                                        </li>
                                        <li className="list-group-item">Issues: <span className=" ms-2 badge bg-primary rounded-pill">
                                            0
                                        </span></li>
                                        <li className="list-group-item">Unit tests:<span className=" ms-2 badge bg-primary rounded-pill"> 1</span></li>

                                    </ul>

                                </div>
                            </Col>
                            <Col>
                                <div className="card mb-3 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Jesus Munoz-Castaneda</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Backend</h6>
                                    </div>
                                    <Image className="w-72 rounded mx-auto" src={p4} alt="Card image cap"></Image>
                                    <div className="card-body">
                                        <p className="card-text">A fourth-year chemistry student with a certificate in computer science at the
                                            University of Texas at Austin.</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Commits: <span className=" ms-2 badge bg-primary rounded-pill">
                                            0
                                        </span>
                                        </li>
                                        <li className="list-group-item">Issues: <span className=" ms-2 badge bg-primary rounded-pill">
                                            0
                                        </span></li>
                                        <li className="list-group-item">Unit tests:<span className=" ms-2 badge bg-primary rounded-pill"> 1</span></li>

                                    </ul>

                                </div>
                            </Col>

                        </Row>


                    </Container>)}
                {!data ? (
                    <Container className='d-flex align-items-center justify-content-center min-vh-100' variant='primary'>
                        <Spinner animation="border" className='mx-auto' />
                    </Container>



                ) : (
                    <Container>
                        <h1 className="text-center py-5">Project Stats</h1>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between">Total Commits
                                <span className="badge bg-primary rounded-pill">{data && data[0][0]}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">Total Issues
                                <span className="badge bg-primary rounded-pill">{data && data[1][0]}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">Total Unit Tests
                                <span className="badge bg-primary rounded-pill">1</span>
                            </li>
                        </ul>
                        <div className="buttondiv">
                            <a href="https://gitlab.com/javier.ramirez5/cs331e-idb/-/boards" className="btn btn-primary" rel="noopener noreferrer" target="_blank">
                                <span><FontAwesomeIcon icon={faGitlab}></FontAwesomeIcon> Issue Tracker</span>
                            </a>
                            <a href="https://gitlab.com/javier.ramirez5/cs331e-idb" className="btn btn-primary" rel="noopener noreferrer" target="_blank">
                                <span><FontAwesomeIcon icon={faGitlab}></FontAwesomeIcon> Repo</span>
                            </a>
                            <a href="https://gitlab.com/javier.ramirez5/cs331e-idb/-/wikis/JobsNMore" className="btn btn-primary" rel="noopener noreferrer" target="_blank">
                                <span><FontAwesomeIcon icon={faGitlab}></FontAwesomeIcon> Wiki</span>
                            </a>
                        </div>
                    </Container>
                )}
                <Container className='py-5'>
                    <h1 className="text-center py-5">Data Sources</h1>
                    <Row className='py-4 align-items-center'>
                        <Col className='text-center'>
                            <a href="https://rapidapi.com/community/api/bls-public-data/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={bls}></Image>
                            </a>
                        </Col>
                        <Col className='text-center'>
                            <a href="https://www.census.gov/data/developers/data-sets.html" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={census}></Image>
                            </a>
                        </Col>
                        <Col className='text-center'>
                            <a href="https://rapidapi.com/LinkUpJobSearch/api/linkup-job-search/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={linkup}></Image>
                            </a>
                        </Col>
                    </Row>
                    <Row className='py-4 align-items-center'>
                        <Col className='text-center'>
                            <a href="https://services.onetcenter.org/v1.9/reference/mnm/career/state/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={onet}></Image>
                            </a>
                        </Col>
                        <Col className='text-center'>
                            <a href="https://rapidapi.com/ItsYourSkills/api/skills-profiler/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={skills}></Image>
                            </a>
                        </Col>
                        <Col className='text-center'>
                            <a href="https://docs.gitlab.com/ee/api/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={gitlab}></Image>
                            </a>
                        </Col>
                    </Row>
                    <Row className='py-4 align-items-center'>
                        <Col className='text-center'>
                            <a href="https://rapidapi.com/janzz-ltd-janzz-ltd-default/api/ontology1/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-75 mx-auto" src={janzz}></Image>
                            </a>
                        </Col>
                        <Col className='text-center'>
                            <a href="https://developers.google.com/youtube/v3/" rel="noopener noreferrer" target="_blank=">
                                <Image className="w-50 mx-auto" src={yt}></Image>
                            </a>
                        </Col>
                    </Row>
                </Container>
                <Container className='py-5'>
                    <h1 className="text-center py-5">Tools Used</h1>
                    <Row className="row py-4 align-items-center">
                        <Col className='text-center'>
                            <Image className="w-75 mx-auto" src={fl}></Image>
                        </Col>
                        <Col className='text-center'>
                            <Image className="w-75 mx-auto" src={pt}></Image>
                        </Col>
                        <Col className='text-center'>
                            <Image className="w-75 mx-auto" src={rq}></Image>
                        </Col>
                    </Row>
                    <Row className="row py-4  align-items-center">

                        <Col className='text-center'>
                            <Image className="w-75 mx-auto" src={bs}></Image>

                        </Col>
                        <Col className='text-center'>
                            <Image className="w-75 mx-auto" src={gitlab}></Image>

                        </Col>
                        <Col className='text-center'>
                            <Image className="w-75 mx-auto" src={sl}></Image>
                        </Col>
                    </Row>
                </Container>


            </MainLayout>

        </>
    )
}

export default About