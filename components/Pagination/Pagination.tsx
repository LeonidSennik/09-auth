import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}