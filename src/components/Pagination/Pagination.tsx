import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ pizzas, setCurrentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        console.log(event.selected + 1);
        setCurrentPage(event.selected + 1);
      }}
      pageRangeDisplayed={8}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
