import { useState } from "react";

const Categories = ({ pizzaCategory, setPizzaCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            onClick={() => setPizzaCategory(i)}
            className={pizzaCategory === i ? "active" : ""}
            key={i}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
