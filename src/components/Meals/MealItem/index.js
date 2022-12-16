import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const { addItem } = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (quantity) => {
    const newItem = {
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price,
    };

    addItem(newItem);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <span className={classes.description}>{props.description}</span>
        <h3 className={classes.price}>{price}</h3>
      </div>
      <div>
        <div>
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </div>
    </li>
  );
};

export default MealItem;
