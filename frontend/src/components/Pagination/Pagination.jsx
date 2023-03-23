import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import "../Layout/bootstrap.css";

function PaginationBar({ total_pages, current_page }) {
  useEffect(() => {
    console.log(total_pages, current_page);
  }, [total_pages, current_page]);
  let pages = [];

  // TODO: Make this dynamic
  for (let i = 1; i <= 20; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === current_page}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{pages}</Pagination>
    </div>
  );
}

export default PaginationBar;
