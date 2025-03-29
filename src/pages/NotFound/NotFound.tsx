import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
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
