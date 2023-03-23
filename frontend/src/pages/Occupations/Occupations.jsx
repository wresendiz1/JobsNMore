import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Occupations() {
  const [page, setPage] = useState();
  const [occupations, setOccupations] = useState();
  useEffect(() => {
    fetch("/occupations")
      .then((res) => res.json())
      .then((data) => {
        setOccupations(data["Occupations"]);
        setPage(data["Page"]);
        // data['Occupations'].map((job) => {
        //   console.log(job["Id"])
        //   });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Occupations</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Onet Code</th>
              <th>Cluster</th>
              <th>General Title</th>
              <th>Description</th>
              <th>Median Wage</th>
              <th>90th Wage</th>
              <th>Outlook</th>
              <th>Outlook Category</th>
              <th>Current Employment</th>
              <th>Projected Employment</th>
              <th>Percent Change</th>
              <th>BLS</th>
            </tr>
          </thead>
          <tbody>
            {occupations &&
              occupations.map((occupation) => (
                <tr key={occupation["OnetCode"]}>
                  <td>{occupation["OnetCode"]}</td>
                  <td>{occupation["cluster"]}</td>
                  <td>{occupation["title"]}</td>
                  <td>{occupation["description"]}</td>
                  <td>{occupation["median_wage"]}</td>
                  <td>{occupation["pct90_wage"]}</td>
                  <td>{occupation["outlook"]}</td>
                  <td>{occupation["outlook_category"]}</td>
                  <td>{occupation["curr_employment"]}</td>
                  <td>{occupation["proj_openings"]}</td>
                  <td>{occupation["percent_change"]}</td>
                  <td>
                    <a
                      href={occupation["bls"]}
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

export default Occupations;
