import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Locations() {
  const [page, setPage] = useState();
  const [locations, setLocations] = useState();
  useEffect(() => {
    fetch("/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data["Locations"]);
        setPage(data["Page"]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Locations</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>City</th>
              <th>State</th>
              <th>Population</th>
              <th>Budget</th>
              <th>Safety</th>
              <th>Average Rating</th>
              <th>Guide</th>
            </tr>
          </thead>
          <tbody>
            {locations &&
              locations.map((location) => (
                <tr key={location["CityID"]}>
                  <td>{location["City"]}</td>
                  <td>{location["State"]}</td>
                  <td>{location["Population"]}</td>
                  <td>{location["Budget"]}</td>
                  <td>{location["Safety"]}</td>
                  <td>{location["Average_rat"]}</td>
                  <td>
                    <a
                      href={location["Guide"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Locations;
