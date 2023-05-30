/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";

function Show({ page }) {
  return (
    <>
      {page &&
        (page.per_page === page.page_items ? (
          <p className="fst-italic">
            Showing {page.page_items * page.current_page - page.page_items} -{" "}
            {page.page_items * page.current_page} of {page.total_items}
          </p>
        ) : (
          <p className="fst-italic">
            Showing {(page.current_page - 1) * page.per_page} -{" "}
            {(page.current_page - 1) * page.per_page + page.page_items} of{" "}
            {page.total_items}
          </p>
        ))}
    </>
  );
}

export default Show;
