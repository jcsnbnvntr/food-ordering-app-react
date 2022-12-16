import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);
  const hasItems = items.length > 0;

  const cartItemAddHandler = (item) => {
    addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {!hasItems && <h2>Your cart is empty</h2>}
      {hasItems &&
        items.map((item) => {
          return (
            <CartItem
              id={item.id}
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onAdd={cartItemAddHandler}
              onRemove={cartItemRemoveHandler}
            />
          );
        })}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
