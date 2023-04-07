import {usePagination } from './usePagination';
import styled from 'styled-components';
import { $UL } from './styles';

export const $li = styled.li<{selected: boolean}>`
  padding: 0 12px;
  height: 32px;
  width: 32px;
  text-align: center;
  margin: auto 4px;
  color: #8023f9;
  border: 2px solid #8023f9;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 15px;
  font-weight: 600;
  min-width: 32px;
  :hover {
    background-color: #8023f9;
    cursor: pointer;
    color: white;
  }
  :focus {
    background-color: #8023f9;
    color: white;
  }
  ${({selected}) => selected && `
    background-color: #8023f9;
    color: white;
  `}
`;

export interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage ,
    totalCount,
    siblingCount,
    pageSize,
    onPageChange
  });


  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }


  return (
    <$UL>
      {paginationRange.map((pageNumber, index) => {
        return (
          <$li
            onClick={() => onPageChange(pageNumber)}
            key={index}
            selected={pageNumber === currentPage}
          >
            {pageNumber}
          </$li>
        );
      })}
    </$UL>
  );
};

export default Pagination;
