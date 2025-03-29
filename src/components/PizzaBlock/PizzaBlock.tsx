import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice.js";
import { Link } from "react-router-dom";

const typeNames = ["тонкое", "традиционное"];

interface PizzaBlockProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}
interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count?: number;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const [activeType, setActiveType] = useState<number>(types[0]);
  const [activeSize, setActiveSize] = useState<number>(sizes[0]);

  const dispatch = useDispatch();

  const cartItem = useSelector(
    selectCartItemById(id, typeNames, activeType, activeSize)
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      // Уникальный ID, если пользователь выберет одну пиццу с разными свойствами
      id: `${id}_${typeNames[activeType]}_${activeSize}`,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: activeSize,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type: number, index: number) => (
            <li
              key={index}
              onClick={() => {
                setActiveType(type);
              }}
              className={activeType === type ? "active" : ""}
            >
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, index: number) => (
            <li
              key={index}
              onClick={() => {
                setActiveSize(size);
              }}
              className={activeSize === size ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
