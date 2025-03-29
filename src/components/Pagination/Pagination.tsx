import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination: React.FC = ({ scrollToContent, setCurrentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        setCurrentPage(event.selected + 1);
        scrollToContent();
      }}
      pageRangeDisplayed={8}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
