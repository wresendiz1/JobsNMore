import { useEffect, useState } from 'react';
import React from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Img from '../../images/logos/png/logo-no-slogan.png'
import Spinner from 'react-bootstrap/Spinner';
import AboutCard from '../../components/AboutCard/AboutCard';


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
                        <Spinner animation="border" />
                    </Container>



                ) :
                    (<AboutCard data={data}></AboutCard>)}
                {!data ? (
                    <Container className='d-flex align-items-center justify-content-center min-vh-100' variant='primary'>
                        <Spinner animation="border" />
                    </Container>



                ) : (
                    
                    // TODO: Modulate this container into a component
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
                {/* TODO: Modulate this container into a component */}
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
                {/* TODO: Modulate this container into a component */}
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