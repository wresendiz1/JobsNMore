import React, { useEffect, useState } from "react";
import { Container, Card, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import PaginationBar from "../../components/Pagination/Pagination";

function Jobs() {
  const [page, setPage] = useState();
  const [jobs, setJobs] = useState();
  // const params = {
  //   current_page: 1,
  //   per_page: 20,
  // };
  // const options = {
  //   method: "GET",
  //   body: JSON.stringify(params),
  // };
  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
        // console.log(data['Page'][0].total);
      })
      .catch((err) => console.log(err));

    document.addEventListener("click", clickPaginate, true);

    return () => {
      document.removeEventListener("click", clickPaginate, true);
    };
  }, []);

  // function to check for a click on the pagination bar
  const clickPaginate = (e) => {
    if (e.target.className === "page-link") {
      fetch(`/jobs?page=${e.target.innerText}`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data["Jobs"]);
          setPage(data["Page"]);
          console.log(data["Page"][0].total);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <MainLayout>
      <h1 className="text-center py-5">Jobs</h1>
      <Container className="d-flex flex-wrap justify-content-center">
        {jobs &&
          jobs.map((job) => (
            <Card key={job["Id"]} className="m-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{job["JobTitle"]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job["Company"]}
                </Card.Subtitle>
                {/* TODO: query occupation DB to get average pay or use google API in next phase */}
                <Card.Text>{job["Location"]}</Card.Text>
                <Button
                  variant="primary"
                  href={job["Url"]}
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
      <Container className="d-flex flex-wrap justify-content-center">
        {jobs && (
          <PaginationBar
            total_pages={page[0].total}
            current_page={page[0].current_page}
          />
        )}
      </Container>
    </MainLayout>
  );
}

export default Jobs;
