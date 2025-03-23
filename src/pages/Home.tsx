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
  // Получаем текущую категорию пиццы из Redux
  const category = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  // Получаем текущий фильтр сортировки из Redux (например, 'rating', 'price&order=asc', 'title' и т. д.)
  const sortBy = useSelector((state) => state.filter.sortBy.sort);

  // Реф для плавной прокрутки к списку пицц
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Поисковая строка (локальное состояние)
  const [searchValue, setSearchValue] = useState("");

  // Список пицц (из API)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Текущая страница пагинации
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтруем пиццы по поисковому запросу
  const pizzas = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  // Заглушки (скелетоны) на время загрузки
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  // Загружаем список пицц при изменении фильтров, категории или страницы
  useEffect(() => {
    axios
      .get(
        `https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas?page=${currentPage}&limit=8&${
          category > 0 ? `category=${category}` : ""
        }&sortBy=${sortBy}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [category, sortBy, currentPage]); // Перезапускаем при изменении фильтров или страницы

  return (
    <div className="container">
      {/* Контейнер для прокрутки к списку пицц */}
      <div ref={contentRef} className="content__top">
        {/* Компонент выбора категории */}

        <Categories
          category={category}
          setCategory={(id) => dispatch(setCategory(id))}
        />
        {/* Компонент сортировки */}
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {/* Поле поиска */}
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Search />
      </SearchContext.Provider>

      {/* Отображаем либо список пицц, либо скелетоны во время загрузки */}
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      {/* Пагинация */}
      <Pagination
        scrollToContent={scrollToContent}
        pizzas={pizzas}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
