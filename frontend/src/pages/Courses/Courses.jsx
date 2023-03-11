import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Courses() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    fetch("/courses")
      .then((res) => res.json())
      .then((courses) => setCourses(courses))
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Courses</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              {courses &&
                Object.keys(courses.CourseID1).map((key) => {
                  if (key !== "Name") {
                    return <th key={key}>{key}</th>;
                  }
                })}
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              Object.keys(courses).map((course) => (
                <tr key={course}>
                  <td>{courses[course].Name}</td>
                  <td>{courses[course].Cost}</td>
                  <td>
                    <a
                      href={courses[course].Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                  <td>{courses[course].Provider}</td>
                  <td>{courses[course].Time}</td>
                  <td />
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Courses;
