import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import MainLayout from "../../components/Layout/MainLayout";

function Jobs() {
  const [jobs, setJobs] = useState();
  useEffect(() => {
    axios
      .get("/jobs")
      .then((res) => setJobs(res.data))
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
              {jobs &&
                Object.keys(jobs.JobID1).map((key) => {
                  if (key !== "Image" && key !== "Title") {
                    return <th key={key}>{key}</th>;
                  }
                })}
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              Object.keys(jobs).map((jobID) => (
                <tr key={jobID}>
                  <td>{jobs[jobID].Title}</td>
                  <td>{jobs[jobID].Company}</td>
                  <td>{jobs[jobID].Date}</td>
                  <td>
                    <a
                      href={jobs[jobID].Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                  <td>
                    {jobs[jobID].Locations.map((location) => (
                      <span key={location}>{location} </span>
                    ))}
                  </td>
                  <td>
                    {jobs[jobID].Skills.map((skill) => (
                      <span key={skill}>{skill}, </span>
                    ))}
                  </td>
                  <td />
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
}

export default Jobs;
