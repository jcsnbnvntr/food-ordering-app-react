import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);
  const hasItems = items.length > 0;

  const cartItemAddHandler = (item) => {
    addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cancelCheckoutHandler = () => {
    setIsCheckout(false);
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

  const cartTotalAmount = (
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{`$${totalAmount.toFixed(2)}`}</span>
    </div>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <Fragment>
      {cartItems}
      {cartTotalAmount}
      {modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCheckout && cartContent}
      {isCheckout && <Checkout onCancel={cancelCheckoutHandler} />}
    </Modal>
  );
};

export default Cart;
