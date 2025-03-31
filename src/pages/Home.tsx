import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search/Search";
import Pagination from "../components/Pagination/Pagination";
import {
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice.ts";
import { fetchPizzas, selectPizzasData } from "../redux/slices/pizzasSlice.ts";
import { useMap, useWhyDidYouUpdate } from "ahooks";

interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);

const Home: React.FC = () => {
  const category: number = useSelector((state: any) => state.filter.category);
  const sortBy: string = useSelector((state: any) => state.filter.sortBy.sort);
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizzasData);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const scrollToContent = (): void => {
    if (status) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 200);
    }
  };

  const filteredPizzas = useMemo(
    () =>
      items
        .filter((item) =>
          item?.title?.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((item) => <PizzaBlock key={item.id} {...item} />),
    [items, searchValue]
  );

  const pizzas = filteredPizzas;

  const skeletons = Array.from({ length: 4 }, (_, index) => (
    <Skeleton key={index} />
  ));

  useEffect(() => {
    const getPizzas = async () => {
      await dispatch(
        fetchPizzas({
          category,
          sortBy,
          currentPage,
        })
      );
    };
    getPizzas();
  }, [category, sortBy, currentPage]);

  const onChangeCategory = useCallback(
    (id: number) => {
      dispatch(setCategory(id));
    },
    [dispatch]
  );

  const searchContextValue = useMemo(
    () => ({ searchValue, setSearchValue }),
    [searchValue, setSearchValue]
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} setCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <SearchContext.Provider value={searchContextValue}>
        <Search />
      </SearchContext.Provider>

      <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>

      <Pagination
        currentPage={currentPage}
        scrollToContent={scrollToContent}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
