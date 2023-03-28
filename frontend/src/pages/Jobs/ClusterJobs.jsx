import React, { useEffect, useState } from "react";
import { getPageData } from "../../components/Pagination/PaginationHelper";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Button from "react-bootstrap/esm/Button";
import PaginationBar from "../../components/Pagination/Pagination";

function ClusterJobs() {
  const { id } = useParams();
  const [jobs, setJobs] = useState();
  const [page, setPage] = useState();
  useEffect(() => {
    fetch(`/api/jobs/cluster/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Change = async (action) => {
    const url = `/api/jobs/cluster/${id}?page=`;
    getPageData(action, url, page).then((data) => {
      setJobs(data["Jobs"]);
      setPage(data["Page"]);
    });
      
  };

  return (
    <MainLayout>
      <h1 className="text-center py-5">Jobs from Cluster code: {id} </h1>
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
            change={Change}
            total_pages={page[0].total}
            current_page={page[0].current_page}
          />
        )}
      </Container>
    </MainLayout>
  );
}

export default ClusterJobs;
