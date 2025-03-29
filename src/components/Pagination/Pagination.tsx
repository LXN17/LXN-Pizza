import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  scrollToContent: any;
  setCurrentPage: any;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  scrollToContent,
  setCurrentPage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => {
        setCurrentPage(event.selected + 1);
        scrollToContent();
      }}
      pageRangeDisplayed={8}
      pageCount={2}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
