type CategoriesProps = {
  category: number;
  setCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ category, setCategory }) => {
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
        {categories.map((categoryName, i) => (
          <li
            onClick={() => {
              setCategory(i);
            }}
            className={category === i ? "active" : ""}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
