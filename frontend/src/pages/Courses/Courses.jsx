import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginationBar from "../../components/Pagination/Pagination";
import Sorting from "../../components/Sorting/Sorting";
import defaultQueryParams from "../../utils/QueryParams";
import ShowItems from "../../components/Sorting/ShowItems";
import UseFetch from "../../utils/UseFetch";
import { ShowPerPage, SortPage, ChangePage } from "../../utils/QueryUtils";

function Courses() {
  const [page, setPage] = useState();
  const [courses, setCourses] = useState();
  const [query, setQuery] = useState(defaultQueryParams);

  const sortValues = [
    { id: "OnetCode", name: "Onet Code" },
    { id: "Provider", name: "Provider" },
    { id: "Name", name: "Name" },
    { id: "Type", name: "Type" },
  ];

  UseFetch("/api/courses", { Courses: setCourses, Page: setPage }, query);

  return (
    <>
      {Courses && (
        <>
          <ShowItems
            pageName="Courses"
            showHandler={(num) => ShowPerPage(num, setQuery)}
            page={page}
          />
          <Sorting
            page={page}
            handler={(form) => SortPage(form, setQuery)}
            sortValues={sortValues}
            searchValues={sortValues}
          />
        </>
      )}

      <Container className="d-flex flex-wrap justify-content-center">
        {courses && courses.length > 0
          ? courses.map((course) => (
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
            ))
          : courses && (
              <Container style={{ height: "50vh" }}>
                <h2 className="text-center fw-lighter text-muted">
                  No Results
                </h2>
              </Container>
            )}
      </Container>
      <Container className="d-flex justify-content-center">
        {page && (
          <PaginationBar
            change={(action) => ChangePage(action, page, setQuery)}
            totalPages={page.total}
            currPage={page.current_page}
          />
        )}
      </Container>
    </>
  );
}

export default Courses;
