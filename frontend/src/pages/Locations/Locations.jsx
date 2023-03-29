import React, { useEffect, useState, useRef } from "react";
import { ListGroup, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Sorting from "../../components/Sorting/Sorting";
import PaginationBar from "../../components/Pagination/Pagination";
import { getPageData } from "../../components/Pagination/PaginationHelper";

function Locations() {
  const [page, setPage] = useState();
  const [locations, setLocations] = useState();
  const order = useRef();
  const sort = useRef();
  const items_per_page = useRef(30);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.Locations);
        setPage(data.Page);
      })
      .catch((err) => console.log(err));
  }, []);

  const ChangePage = (action) => {
    const url = `/api/locations?sort_by=${sort.current.value}&order=${order.current.value}&per_page=${items_per_page.current.value}&page=`;
    getPageData(action, url, page).then((data) => {
      setLocations(data["Locations"]);
      setPage(data["Page"]);
      // console.log(data["Page"][0]);
    });
  };

  const ShowPerPage = (items_per_page, e) => {
    e.preventDefault();
    {
      // console.log(items_per_page.current.value)
      fetch(
        `/api/locations?page=1&sort_by=${sort.current.value}&order=${order.current.value}&per_page=${items_per_page.current.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocations(data["Locations"]);
          setPage(data["Page"]);
        });
    }
  };
  const sortPage = (sort, order, e) => {
    e.preventDefault();
    fetch(
      `/api/locations?page=${page[0].current_page}&sort_by=${sort.current.value}&order=${order.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.Locations);
        setPage(data.Page);
      });
  };

  const value_name = [
    { id: "CityID", name: "Relevance" },
    { id: "City", name: "City" },
    { id: "State", name: "State" },
    { id: "Budget", name: "Budget" },
    { id: "Safety", name: "Safety" },
    { id: "Average_rat", name: "Average Rating" },
  ];

  return (
    <MainLayout>
      {page && (
        <Sorting
          page_name="Locations"
          page={page}
          handler={sortPage}
          value_name={value_name}
          order={order}
          sort={sort}
          show_handler={ShowPerPage}
          items_per_page={items_per_page}
          default_items={30}
        />
      )}

      <Container className="d-flex flex-wrap justify-content-center">
        {locations &&
          locations.map((location) => (
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
                  Population: {location.Population}
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
          ))}
      </Container>
      <Container className="d-flex justify-content-center">
        {locations && (
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

export default Locations;
