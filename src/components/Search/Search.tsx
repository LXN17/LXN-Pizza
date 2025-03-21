import { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ searchValue, setSearchValue }) => {
  // const [value, setValue] = useState("");

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
