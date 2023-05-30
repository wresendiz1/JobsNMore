import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import PaginationBar from "../../components/Pagination/Pagination";
import UseFetch from "../../utils/UseFetch";
import defaultQueryParams from "../../utils/QueryParams";
import ShowItems from "../../components/Sorting/ShowItems";
import Sorting from "../../components/Sorting/Sorting";
import { SortPage, ChangePage, ShowPerPage } from "../../utils/QueryUtils";

function Occupations() {
  const [page, setPage] = useState();
  const [occupations, setOccupations] = useState();
  const [query, setQuery] = useState(defaultQueryParams);

  const sortValues = [
    { id: "onetCode", name: "Onet Code" },
    { id: "cluster", name: "Cluster" },
    { id: "title", name: "Job Title" },
    { id: "outlook", name: "Outlook" },
    { id: "median_wage", name: "Median Wage" },
    { id: "pct90_wage", name: "90th Wage" },
    { id: "curr_employment", name: "Current Employment" },
    { id: "proj_openings", name: "Projected Openings" },
    { id: "percent_change", name: "Percent Change in Employment" },
  ];

  const searchValues = sortValues.slice(0, 3);

  UseFetch(
    "/api/occupations",
    { Occupations: setOccupations, Page: setPage },
    query
  );

  return (
    <>
      {/* <h1 className="text-center py-5">Occupations</h1> */}
      {page && (
        <>
          <ShowItems
            pageName="Occupations"
            page={page}
            maxItems={30}
            showHandler={(num) => ShowPerPage(num, setQuery)}
          />
          <Sorting
            handler={(form) => SortPage(form, setQuery)}
            searchValues={searchValues}
            sortValues={sortValues}
            page={page}
          />
        </>
      )}
      <Container>
        <Row className="row row-cols-1 row-cols-md-3 py-4 gy-4 justify-content-center">
          {occupations && occupations.length > 0
            ? occupations.map((occupation) => (
                <Col key={occupation.onetCode}>
                  <Card className="m-3">
                    <Card.Body>
                      <Card.Title>{occupation.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {occupation.cluster}
                      </Card.Subtitle>
                      <Link
                        to={`${occupation.onetCode}`}
                        className="btn btn-primary mx-2"
                      >
                        Info
                      </Link>
                      <Link
                        to={`/Clusters/${occupation.cluster}`}
                        className="btn btn-info mx-2"
                      >
                        Cluster Info
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : occupations && (
                <Container style={{ height: "50vh" }}>
                  <h2 className="text-center fw-lighter text-muted">
                    No Results
                  </h2>
                </Container>
              )}
        </Row>
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

export default Occupations;
