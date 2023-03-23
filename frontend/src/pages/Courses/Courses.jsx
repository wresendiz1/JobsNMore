import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Courses() {
  const [page, setPage] = useState();
  const [courses, setCourses] = useState();
  useEffect(() => {
    fetch("/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data["Courses"]);
        setPage(data["Page"]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Courses</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Onet Code</th>
              <th>Provider</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => (
                <tr key={course["OnetCode"]}>
                  <td>{course["OnetCode"]}</td>
                  <td>{course["Provider"]}</td>
                  <td>{course["Name"]}</td>
                  <td>{course["Type"]}</td>
                  <td>{course["Description"]}</td>
                  <td>
                    <a
                      href={course["Url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Courses;
