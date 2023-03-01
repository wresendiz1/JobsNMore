import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import MainLayout from '../../components/Layout/MainLayout'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Skills() {

    const [skills, setSkills] = useState();
    useEffect(() => {
        axios.get('/skills')
            .then(res => setSkills(res.data))
            .catch(err => console.log(err))
    }
        , [])
    return (
        <>
            <MainLayout>
                <h1 className="text-center py-5">Skills</h1>
                <Container className="align-items-center min-vh-100">
                    <Table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                {skills && Object.keys(skills[0]['Excel']).map(key => {

                                    if (key !== 'Name') {
                                        return <th key={key}>{key}</th>

                                    }

                                })}

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills && Object.keys(skills[0]).map(skill => {
                                return (
                                <tr key={skill}>
                                    <td>{skills[0][skill]['Name']}</td>
                                    <td>{skills[0][skill]['Certifications']}</td>
                                    <td>
                                    {skills[0][skill]['Courses'].map(course =>{
                                        return(
                                            <span key ={course}>{skills[1][course]['Name']},<br></br></span>
                                            )})}
                                    </td>
                                    <td>{skills[0][skill]['Industry']}</td>
                                    <td>{skills[0][skill]['Level']}</td>

                                    
                                </tr>)

                            })}
                        </tbody>
                    </Table>
                </Container>
            </MainLayout>
        </>
    )
}

export default Skills