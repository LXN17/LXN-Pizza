import "./scss/app.scss";
import Header from "./components/Header.js";
import Categories from "./components/Categories.js";
import Sort from "./components/Sort.js";
import PizzaBlock from "./components/PizzaBlock.js";
import pizzas from "./assets/pizzas.json";
import { useState } from "react";

function App() {
  const [cartCount,setCartCount]=useState(0)
  
  return (
    <div className="wrapper">
      <Header cartCount={cartCount} />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock cartCount={cartCount} setCartCount={setCartCount} {...pizza} key={pizza.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
