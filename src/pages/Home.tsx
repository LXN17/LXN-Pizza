import { useEffect, useState, useRef, createContext } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search/Search";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice.js";
import axios from "axios";

export const SearchContext = createContext("");

const Home = () => {
  const category = useSelector((state) => state.filter.category);
  const sortBy = useSelector((state) => state.filter.sortBy.sort);
  const dispatch = useDispatch();
  const contentRef = useRef(null);

  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pizzas = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  useEffect(() => {
    const fetchPizzas = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas?page=${currentPage}&limit=8&${
            category > 0 ? `category=${category}` : ""
          }&sortBy=${sortBy}`
        );

        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPizzas();
  }, [category, sortBy, currentPage]);

  return (
    <div className="container">
      <div ref={contentRef} className="content__top">
        <Categories
          category={category}
          setCategory={(id) => dispatch(setCategory(id))}
        />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Search />
      </SearchContext.Provider>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination
        scrollToContent={scrollToContent}
        pizzas={pizzas}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
