import { Fragment, useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import OrderConfirmation from "./OrderConfirmation";
import classes from "./Cart.module.css";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const {
    isLoading,
    sendRequest: sendOrderRequest,
    success: didSubmit,
  } = useHttp();

  const [date, setDate] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { items, totalAmount, addItem, removeItem, clearItems } =
    useContext(CartContext);

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

  const applyData = (date, data) => {
    const orderId = data.name; // firebase-specific => "name" contains generated id
    setOrderId(orderId);
    setDate(date);
  };

  const submitOrderHandler = (userData, date) => {
    const requestConfig = {
      url: "https://food-ordering-app-react-3cdd7-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        date: date,
        user: userData,
        orderedItems: items,
      },
    };
    sendOrderRequest(requestConfig, applyData.bind(null, date)); // applyData is preconfigured
    clearItems();
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

  const cartModalContent = (
    <Fragment>
      {cartItems}
      {cartTotalAmount}
      {modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCheckout && cartModalContent}
      {isCheckout && !didSubmit && (
        <Checkout
          onCancel={cancelCheckoutHandler}
          onConfirm={submitOrderHandler}
          isSubmitting={isLoading}
        />
      )}
      {didSubmit && (
        <OrderConfirmation
          orderId={orderId}
          date={date}
          onClose={props.onClose}
        />
      )}
    </Modal>
  );
};

export default Cart;
