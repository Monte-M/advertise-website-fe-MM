import React from "react";
import css from "./Pagination.module.css";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={css.pageContainer}>
        {pageNumbers.map((number) => (
          <h6 onClick={() => paginate(number)}>{number}</h6>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
