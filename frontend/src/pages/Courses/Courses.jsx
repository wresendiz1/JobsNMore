import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";
import { Link } from "react-router-dom";
import PaginationBar from "../../components/Pagination/Pagination";

function Courses() {
  const [page, setPage] = useState();
  const [courses, setCourses] = useState();
  useEffect(() => {
    fetch("/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data["Courses"]);
        setPage(data["Page"]);
        // console.log(data["Page"][0].total);
      })
      .catch((err) => console.log(err));

    document.addEventListener("click", clickPaginate, true);

    return () => {
      document.removeEventListener("click", clickPaginate, true);
    };
  }, []);

  const clickPaginate = (e) => {
    if (e.target.className === "page-link") {
      fetch(`/courses?page=${e.target.innerText}`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(data["Courses"]);
          setPage(data["Page"]);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <MainLayout>
      <h1 className="text-center py-5">Courses</h1>

      <Container className="d-flex flex-wrap justify-content-center">
        {courses &&
          courses.map((course) => (
            <Card key={course.Id} className="m-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{course.Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {course.Type}
                </Card.Subtitle>
                {/* TODO: query occupation DB to get average pay or use google API in next phase */}
                <Button
                  variant="primary"
                  href={course.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Course
                </Button>
                <Link
                  to={`/Courses/${course.Id}`}
                  className="btn btn-primary mx-2"
                >
                  More Info
                </Link>
              </Card.Body>
            </Card>
          ))}
      </Container>
      <Container className="d-flex flex-wrap justify-content-center">
        {courses && (
          <PaginationBar
            total_pages={page[0].total}
            current_page={page[0].current_page}
          />
        )}
      </Container>
    </MainLayout>
  );
}

export default Courses;
