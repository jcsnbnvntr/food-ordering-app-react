import dateFormat from "dateformat";

import classes from "./OrderConfirmation.module.css";

const OrderConfirmation = (props) => {
  const formattedDate = dateFormat(props.date, "fullDate");

  return (
    <div className={classes["confirmation-dialog"]}>
      <h2>
        Your order is comlplete! <span className={classes.emoji}>🎉</span>
      </h2>
      <p>{`Order No. ${props.orderId}`}</p>
      <p>{formattedDate}</p>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default OrderConfirmation;
