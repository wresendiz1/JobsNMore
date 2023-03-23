import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import MainLayout from "../../components/Layout/MainLayout";

function Jobs() {
  const [page, setPage] = useState();
  const [jobs, setJobs] = useState();
  useEffect(() => {
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["Jobs"]);
        setPage(data["Page"]);
        // data['Jobs'].map((job) => {
        //   console.log(job["Id"])
        //   });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainLayout>
      <h1 className="text-center py-5">Jobs</h1>
      <Container className="align-items-center min-vh-100">
        <Table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Date Posted</th>
              <th>Location</th>
              <th>Onet Code</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job) => (
                <tr key={job["Id"]}>
                  <td>{job["JobTitle"]}</td>
                  <td>{job["Company"]}</td>
                  <td>{job["DatePosted"]}</td>
                  <td>{job["Location"]}</td>
                  <td>{job["OnetCode"]}</td>
                  <td>
                    <a
                      href={job["Url"]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>

          {/* <td>
                    {jobs[Id].Skills.map((skill) => (
                      <span key={skill}>{skill}, </span>
                    ))}
                  </td>
                  <td /> */}
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Jobs;
