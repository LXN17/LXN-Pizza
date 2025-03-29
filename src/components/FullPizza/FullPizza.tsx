import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import styles from "./FullPizza.module.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://67d9701c00348dd3e2ab1401.mockapi.io/Pizzas/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button>Назад</button>
      </Link>
    </div>
  );
};

export default FullPizza;
