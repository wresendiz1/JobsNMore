import React, { useState } from "react";
import { ListGroup, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sorting from "../../components/Sorting/Sorting";
import PaginationBar from "../../components/Pagination/Pagination";
import defaultQueryParams from "../../utils/QueryParams";
import ShowItems from "../../components/Sorting/ShowItems";
import UseFetch from "../../utils/UseFetch";
import { ShowPerPage, SortPage, ChangePage } from "../../utils/QueryUtils";

function Locations() {
  const [page, setPage] = useState();
  const [locations, setLocations] = useState();
  const [query, setQuery] = useState(defaultQueryParams);
  const formatPop = new Intl.NumberFormat("en-US");

  const sortValues = [
    { id: "City", name: "City" },
    { id: "State", name: "State" },
    { id: "Budget", name: "Budget" },
    { id: "Safety", name: "Safety" },
    { id: "Average_rat", name: "Average Rating" },
  ];

  const searchValues = sortValues.slice(0, 2);

  UseFetch("/api/locations", { Locations: setLocations, Page: setPage }, query);

  return (
    <>
      {page && (
        <>
          <ShowItems
            pageName="Locations"
            showHandler={(num) => ShowPerPage(num, setQuery)}
            page={page}
            maxItems={30}
          />
          <Sorting
            page={page}
            handler={(form) => SortPage(form, setQuery)}
            sortValues={sortValues}
            searchValues={searchValues}
          />
        </>
      )}

      <Container className="d-flex flex-wrap justify-content-center">
        {locations && locations.length > 0
          ? locations.map((location) => (
              <Card
                key={location.CityID}
                className="m-3"
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  <Card.Title>
                    {location.City}, {location.State}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Population: {formatPop.format(location.Population)}
                  </Card.Subtitle>
                  {/* TODO: query occupation DB to get average pay or use google API in next phase */}
                  {/* <Card.Text>{location.Description}</Card.Text> */}

                  <ListGroup>
                    <ListGroup.Item>Budget: {location.Budget}</ListGroup.Item>
                    <ListGroup.Item>Safety: {location.Safety}</ListGroup.Item>
                    <ListGroup.Item>
                      Average Rating: {location.Average_rat}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup>
                    <ListGroup.Item>
                      <Link
                        to={`/Locations/${location.CityID}`}
                        className="btn btn-primary mx-2"
                      >
                        View Info
                      </Link>
                      <Button
                        variant="primary"
                        href={location.Guide}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Guide
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))
          : locations && (
              <Container style={{ height: "50vh" }}>
                <h2 className="text-center fw-lighter text-muted">
                  No Results
                </h2>
              </Container>
            )}
      </Container>
      <Container className="d-flex justify-content-center">
        {locations && (
          <PaginationBar
            change={(action) => ChangePage(action, page, setQuery)}
            total_pages={page.total}
            current_page={page.current_page}
          />
        )}
      </Container>
    </>
  );
}

export default Locations;
