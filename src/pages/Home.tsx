import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search/Search";
import Pagination from "../components/Pagination/Pagination";
import { useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/slices/filterSlice.js";
import { fetchPizzas } from "../redux/slices/pizzasSlice.js";

export const SearchContext = createContext("");

const Home = () => {
  const category = useSelector((state) => state.filter.category);
  const sortBy = useSelector((state) => state.filter.sortBy.sort);
  const { items, status } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToContent = () => {
    if (status) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 200);
    }
  };

  const pizzas = items
    .filter((item) =>
      item?.title?.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeletons = [...new Array(4)].map((_, index) => (
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

  return (
    <div className="container">
      <div className="content__top">
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

      <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>

      <Pagination
        scrollToContent={scrollToContent}
        pizzas={pizzas}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
