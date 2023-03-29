import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Button } from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";
import { Link } from "react-router-dom";
import PaginationBar from "../../components/Pagination/Pagination";
import { getPageData } from "../../components/Pagination/PaginationHelper";
import Sorting from "../../components/Sorting/Sorting";

function Courses() {
  const [page, setPage] = useState();
  const [courses, setCourses] = useState();
  const order = useRef();
  const sort = useRef();
  const items_per_page = useRef(50);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data["Courses"]);
        setPage(data["Page"]);
        items_per_page.current.value = data["Page"][0].per_page;
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const ChangePage = (action) => {
    const url = `/api/courses?sort_by=${sort.current.value}&order=${order.current.value}&per_page=${items_per_page.current.value}&page=`;
    getPageData(action, url, page).then((data) => {
      setCourses(data.Courses);
      setPage(data.Page);
    });
  };

  const ShowPerPage = (items_per_page, e) => {
    e.preventDefault();
    {
      // console.log(items_per_page.current.value)
      fetch(
        `/api/courses?page=1&sort_by=${sort.current.value}&order=${order.current.value}&per_page=${items_per_page.current.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCourses(data["Courses"]);
          setPage(data["Page"]);
        });
    }
  };

  const sortPage = (sort, order, e) => {
    e.preventDefault();
    fetch(
      `/api/courses?page=${page[0].current_page}&per_page=${items_per_page.current.value}&sort_by=${sort.current.value}&order=${order.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCourses(data["Courses"]);
        setPage(data["Page"]);
      });
  };

  const value_name = [
    { id: "Id", name: "Relevance" },
    { id: "OnetCode", name: "Onet Code" },
    { id: "Provider", name: "Provider" },
    { id: "Name", name: "Name" },
    { id: "Type", name: "Type" },
  ];
  return (
    <MainLayout>
      {Courses && (
        <Sorting
          page_name={"Courses"}
          page={page}
          handler={sortPage}
          value_name={value_name}
          order={order}
          sort={sort}
          show_handler={ShowPerPage}
          items_per_page={items_per_page}
        />
      )}

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
            change={ChangePage}
            total_pages={page[0].total}
            current_page={page[0].current_page}
          />
        )}
      </Container>
    </MainLayout>
  );
}

export default Courses;
