import { useEffect, useState, useRef } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Search from "../components/Search/Search";
import Pagination from "../components/Pagination/Pagination";

const Home = () => {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [pizzaCategory, setPizzaCategory] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState({
    name: "популярности",
    sort: "rating",
  });

  const [searchValue, setSearchValue] = useState("");

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas?page=${currentPage}&limit=8&${
        pizzaCategory > 0 ? `category=${pizzaCategory}` : ""
      }&sortBy=${selectedFilter.sort}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [pizzaCategory, selectedFilter, currentPage]);

  const pizzas = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div ref={contentRef} className="content__top">
        <Categories
          pizzaCategory={pizzaCategory}
          setPizzaCategory={setPizzaCategory}
        />
        <Sort
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination
        scrollToContent={scrollToContent}
        pizzas={pizzas}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
