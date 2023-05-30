import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import PaginationBar from "../../components/Pagination/Pagination";
import ShowItems from "../../components/Sorting/ShowItems";
import Sorting from "../../components/Sorting/Sorting";
import UseFetch from "../../utils/UseFetch";
import defaultQueryParams from "../../utils/QueryParams";
import { ShowPerPage, SortPage, ChangePage } from "../../utils/QueryUtils";

const sortValues = [
  { id: "Company", name: "Company" },
  { id: "JobLocation", name: "Job Location" },
  { id: "JobTitle", name: "Job Title" },
  { id: "DatePosted", name: "Date Posted" },
];

const searchValues = sortValues.slice(0, 3);

// eslint-disable-next-line react/prop-types
function Jobs({ url = null }) {
  /* Might be unnecessary to define initial state as all the properties in the obj
  will be completely rewritten. Both page and jobs state depend on the the state change
  of the query obj state. So we only need to define the initial state of the query state. */
  // const [page, setPage] = useState({
  //   current_page: 1,
  //   per_page: 10,
  //   total: 0,
  //   total_items: 0,
  //   page_items: 0,
  // });
  // const [jobs, setJobs] = useState([
  //   {
  //     Company: "",
  //     Url: "",
  //     Id: "",
  //     OnetCode: "",
  //     DatePosted: "",
  //     JobTitle: "",
  //     JobLocation: "",
  //     JCityID: 0,
  //   },
  // ]);
  const [page, setPage] = useState();
  const [jobs, setJobs] = useState();
  const [name, setName] = useState("Jobs");
  const [query, setQuery] = useState(defaultQueryParams);
  if (!url) {
    UseFetch("/api/jobs", { Jobs: setJobs, Page: setPage }, query);
  } else {
    UseFetch(url, { Jobs: setJobs, Page: setPage, Name: setName }, query);
  }

  return (
    <>
      {page && (
        <>
          <ShowItems
            pageName={name}
            page={page}
            showHandler={(num) => ShowPerPage(num, setQuery)}
          />
          <Sorting
            sortValues={sortValues}
            searchValues={searchValues}
            page={page}
            handler={(form) => SortPage(form, setQuery)}
          />
        </>
      )}

      <Container className="d-flex flex-wrap justify-content-center">
        {jobs && jobs.length > 0
          ? jobs.map((job) => (
              <Card key={job.Id} className="m-3" style={{ width: "18rem" }}>
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
            ))
          : jobs && (
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
export default Jobs;
