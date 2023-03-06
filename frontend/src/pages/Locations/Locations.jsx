import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import MainLayout from "../../components/Layout/MainLayout";

function Locations() {
  const [locations, setLocations] = useState();
  useEffect(() => {
    axios
      .get("/locations")
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainLayout>
      <h1 className="text-center py-5">Locations</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              {locations &&
                Object.keys(locations.Austin).map((key) => {
                  if (key !== "Image") {
                    return <th key={key}>{key}</th>;
                  }
                })}
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {locations &&
              Object.keys(locations).map((city) => (
                <tr key={city}>
                  <td>{locations[city].City}</td>
                  <td>{locations[city].Rent}</td>
                  <td>{locations[city].Salary}</td>
                  <td>{locations[city].State}</td>
                  <td>{locations[city].Unemployment}</td>
                  <td />
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Locations;
