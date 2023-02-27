import React from 'react'
import MainLayout from '../layout/MainLayout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Img from '../../images/jobsnmore-logos/png/logo-no-slogan.png'
import p1 from '../../images/About/pro.png'

function About() {
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
                <Container className='align-items-center'>
                    <h1 className="text-center py-5">Meet the Team</h1>
                        <div className="row row-cols-1 row-cols-md-3 py-4 gy-4">
                        <div className="col">
                    <div className="card mb-3 h-100">
                        <div className="card-body">
                            <h5 className="card-title">Willy Resendz</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Lead Frontend + Backend</h6>
                        </div>
                        <Image className="w-85 mx-auto rounded" src={p1} alt="Card image cap"></Image>
                        <div className="card-body">
                            <p className="card-text">I am a third-year student at the University of Texas at Austin, 
                                majoring in Management Information Systems and pursuing a certificate in Computer Science.</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li class = "list-group-item">Commits: <span className=" ms-2 badge bg-primary rounded-pill">
                                0
                            </span>
                            </li>
                            <li class = "list-group-item">Issues: <span className=" ms-2 badge bg-primary rounded-pill">
                                0
                            </span></li>
                            <li class = "list-group-item">Unit tests:<span className=" ms-2 badge bg-primary rounded-pill"> 1</span></li>

                        </ul>

                    </div>
                </div>

                        </div>


                </Container>

            </MainLayout>

        </>
    )
}

export default About