import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => {
  const numPages = Math.ceil(totalItems / pageSize);

  if (numPages === 1) return null;

  const pages = _.range(1, numPages + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm">
        {pages.map((p) => {
          return (
            <li
              key={p}
              className={p === currentPage ? "page-item active" : "page-item"}
              aria-current="page"
            >
              <span className="page-link" onClick={() => onPageChange(p)}>
                {p}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
