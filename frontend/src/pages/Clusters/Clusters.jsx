import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Clusters() {
  const [clusters, setClusters] = useState();
  useEffect(() => {
    fetch("/clusters")
      .then((res) => res.json())
      .then((data) => {
        setClusters(data["Clusters"]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <MainLayout>
      <h1 className="text-center py-5">Career Clusters</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Cluster Code</th>
              <th>Cluster Title</th>
              <th>Median Wage</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            {clusters &&
              clusters.map((cluster) => (
                <tr key={cluster["code"]}>
                  <td>{cluster["code"]}</td>
                  <td>{cluster["title"]}</td>
                  <td>{cluster["median_wage"]}</td>

                  <td>
                    <a
                      href={cluster["link"]}
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

export default Clusters;
