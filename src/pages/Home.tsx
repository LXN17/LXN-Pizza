import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({ cartCount, setCartCount }) => {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => (
              <PizzaBlock
                cartCount={cartCount}
                setCartCount={setCartCount}
                key={item.id}
                {...item}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
