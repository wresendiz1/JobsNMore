import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Skills() {
  const [skills, setSkills] = useState();
  useEffect(() => {
    fetch("/skills")
      .then((res) => res.json())
      .then((skills) => setSkills(skills))
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Skills</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              {skills &&
                Object.keys(skills[0].Excel).map((key) => {
                  if (key !== "Name") {
                    return <th key={key}>{key}</th>;
                  }
                })}

              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {skills &&
              Object.keys(skills[0]).map((skill) => (
                <tr key={skill}>
                  <td>{skills[0][skill].Name}</td>
                  <td>{skills[0][skill].Certifications}</td>
                  <td>
                    {skills[0][skill].Courses.map((course) => (
                      <span key={course}>
                        {skills[1][course].Name}
                        ,
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>{skills[0][skill].Industry}</td>
                  <td>{skills[0][skill].Level}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Skills;
