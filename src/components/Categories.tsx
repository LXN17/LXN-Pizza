import { useState } from "react";

const Categories = () => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const [pizzaCategory, setPizzaCategory] = useState(0);

  const changePizzaCategory = (index) => {
    setPizzaCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => changePizzaCategory(index)}
            className={pizzaCategory === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
