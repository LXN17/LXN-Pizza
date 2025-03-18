import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  return (
    <>
      <h1 className={styles.notFound}>
        <span>😕</span>
        <br />
        404 Not Found
        <br />
        <Link to="/">
          <button>Назад</button>
        </Link>
      </h1>
    </>
  );
};

export default NotFound;
