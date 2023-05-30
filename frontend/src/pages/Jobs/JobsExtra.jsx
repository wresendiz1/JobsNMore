/* eslint-disable react/prop-types */
import React from "react";
import { useParams } from "react-router-dom";
import Jobs from "./Jobs";

function JobsExtra({ url }) {
  const { id } = useParams();

  return <Jobs url={`${url}/${id}`} />;
}

export default JobsExtra;
