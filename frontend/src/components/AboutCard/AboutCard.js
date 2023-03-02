import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
// import info from './about.json';
import '../Layout/bootstrap.css';
import '../Layout/custom.css';

function AboutCard({ data }) {

    const [info, setInfo] = useState();

    useEffect(() => {
        fetch('/about.json').then(res => res.json()).then(data => setInfo(data))
    }, [])


    return (
        <>
            <Container className='align-items-center'>
                <h1 className="text-center py-5">Meet the Team</h1>
                <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4">
                    {info && info['Team'].map(member => {
                        return (
                            <Col key={member['Name']}>
                                <Card className='mb-3 h-100'>
                                    <Card.Body>
                                        <Card.Title>{member['Name']}</Card.Title>
                                        <Card.Subtitle className='mb-2 text-muted'>{member['Role']}</Card.Subtitle>
                                    </Card.Body>
                                    <Card.Img variant="bottom" className='w-85 mx-auto rounded' src={member['Image']} />
                                    <Card.Body>
                                        <Card.Text>
                                            {member['About']}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            Commits:
                                            <Badge pill bg='primary' className='ms-2'>
                                                {data && data[0][1][member['Email']] ? data[0][1][member['Email']] : 0}
                                            </Badge>

                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Issues:
                                            <Badge pill bg='primary' className='ms-2'>
                                                {data && data[1][1][member['Username']] ? data[1][1][member['Username']] : 0}
                                            </Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Unit Tests:
                                            <Badge pill bg='primary' className='ms-2'> 1</Badge>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>
                        )
                    }
                    )}
                </Row>


            </Container>
        </>

    )
}

export default AboutCard