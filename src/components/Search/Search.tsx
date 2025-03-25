import styles from "./Search.module.scss";
import { useContext } from "react";
import { SearchContext } from "../../pages/Home.tsx";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const inputHandler = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.search}>
      <label className="label" id="search">
        Поиск...
      </label>
      <input
        value={searchValue}
        onChange={inputHandler}
        id="search"
        className={styles.root}
      />
    </div>
  );
};

export default Search;
