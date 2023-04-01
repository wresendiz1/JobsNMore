import React, { useEffect, useState, useRef } from "react";
import { getPageData } from "../../components/Pagination/PaginationHelper";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import PaginationBar from "../../components/Pagination/Pagination";
import Sorting from "../../components/Sorting/Sorting";

function Jobs() {
  const [page, setPage] = useState();
  const [jobs, setJobs] = useState();
  const order = useRef();
  const sort = useRef();
  const items_per_page = useRef(50);
  const search_term = useRef();
  const search_by = useRef();

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
        // console.log(data["Jobs"][0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const ChangePage = (action) => {
    const url = `/api/jobs?sort_by=${sort.current.value}&order=${order.current.value}&search=${search_term.current.value.trim()}&search_by=${search_by.current.value}&per_page=${items_per_page.current.value}&page=`;
    getPageData(action, url, page).then((data) => {
      setJobs(data["Jobs"]);
      setPage(data["Page"]);
      // console.log(data["Page"][0]);
    });
  };

  const ShowPerPage = (items_per_page, search_term, search_by, e) => {
    e.preventDefault();
    {
      // console.log(items_per_page.current.value)
      fetch(
        `/api/jobs?page=1&sort_by=${sort.current.value}&order=${order.current.value}&per_page=${items_per_page.current.value}&search=${search_term.current.value.trim()}&search_by=${search_by.current.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setJobs(data["Jobs"]);
          setPage(data["Page"]);
        });
    }
  };

  const sortPage = (sort, order, search_term, search_by, e) => {
    e.preventDefault();
    fetch(
      `/api/jobs?page=${page[0].current_page}&per_page=${items_per_page.current.value}&sort_by=${sort.current.value}&order=${order.current.value}&search=${search_term.current.value.trim()}&search_by=${search_by.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
      });
  };

  const value_name = [
    { id: "Company", name: "Company" },
    { id: "DatePosted", name: "Date Posted" },
    { id: "JCityID", name: "Job Location" },
    { id: "OnetCode", name: "Occupation Code" },
    { id: "JobTitle", name: "Job Title" },
  ];

  // const handleSubmit = (sort, order) => {
  //   return (e) => {
  //     e.preventDefault();
  //     fetch(
  //       `/api/jobs?page=${page[0].current_page}&sort_by=${sort.current.value}&order=${order.current.value}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setJobs(data["Jobs"]);
  //         setPage(data["Page"]);
  //       });
  //   };
  // };

  return (
    <MainLayout>
      {page && (
        <Sorting
          page_name={"Jobs"}
          page={page}
          handler={sortPage}
          value_name={value_name}
          order={order}
          sort={sort}
          show_handler={ShowPerPage}
          items_per_page={items_per_page}
          search_term={search_term}
          search_by={search_by}
        />
      )}
      <Container className="d-flex flex-wrap justify-content-center">
        {jobs &&
          jobs.map((job) => (
            <Card key={job["Id"]} className="m-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{job.JobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.Company}
                </Card.Subtitle>
                {/* TODO: query occupation DB to get average pay or use google API in next phase */}
                <Card.Text>{job.Location}</Card.Text>
                <Button
                  variant="primary"
                  href={job.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job
                </Button>
                <Link to={`/jobs/${job.Id}`} className="btn btn-primary mx-2">
                  More Info
                </Link>
              </Card.Body>
            </Card>
          ))}
      </Container>
      <Container className="d-flex justify-content-center">
        {jobs && (
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
export default Jobs;
