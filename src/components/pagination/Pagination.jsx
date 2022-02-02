import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
/** Style import */
import './pagination.scss';

const Pagination = ({ pages, changePage }) => {
  if (!pages) {
    return <p>Loading...</p>;
  }
  const {
    // eslint-disable-next-line no-unused-vars
    total, current_page: current, last, first, next, per_page: perPage,
  } = pages;

  const [pageCount] = useState((Math.ceil(total / perPage)));

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    changePage(selectedPage);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
