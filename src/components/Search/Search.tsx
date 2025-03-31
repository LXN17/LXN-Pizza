import styles from "./Search.module.scss";
import { useContext, ChangeEvent } from "react";
import { SearchContext } from "../../pages/Home.tsx";

const Search: React.FC = () => {
  const { searchValue, setSearchValue } = useContext<any>(SearchContext);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.search}>
      <label className="label" htmlFor="search">
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
