import { DOTS, usePagination } from './usePagination';

import "./Pagination.css";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-container">
      <li
        className={` ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={index} >&#8230;</li>;
        }

        return (
          <li
            className={`pagination-item ${pageNumber === currentPage ? "selected" : ""}`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${currentPage === lastPage ? "disabled" : ""}`}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
