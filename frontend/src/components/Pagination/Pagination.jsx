import React from "react";
import Pagination from "react-bootstrap/Pagination";

// eslint-disable-next-line react/prop-types
function PaginationBar({ change, totalPages, currPage }) {
  const pages = [];
  const tab = Math.floor(currPage / 5) * 5;

  if (currPage % 5 === 0) {
    for (let i = currPage - 4; i <= currPage; i += 1) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currPage}
          onClick={() => change(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    for (
      let i = tab + 1;
      i <= (tab + 5 > totalPages ? totalPages : tab + 5);
      i += 1
    ) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currPage}
          onClick={() => change(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  return (
    <div>
      <Pagination>
        {currPage > 1 && (
          <Pagination.First onClick={() => change("First")} title="First" />
        )}
        {currPage > 1 && (
          <Pagination.Prev onClick={() => change("Prev")} title="Previous" />
        )}
        {pages}
        {currPage < totalPages && (
          <Pagination.Next onClick={() => change("Next")} title="Next" />
        )}
        {currPage < totalPages && (
          <Pagination.Last onClick={() => change("Last")} title="Last" />
        )}
      </Pagination>
    </div>
  );
}

export default PaginationBar;
