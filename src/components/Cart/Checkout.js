import { Fragment } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler} className={classes.form}>
        <h2>Checkout</h2>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Last Name</label>
          <input id="lastName" type="text" />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input id="phoneNumber" type="text" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input id="address" type="text" />
        </div>
        <div className={classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input id="postal" type="text" />
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            onClick={props.onCancel}
            className={classes["button--alt"]}
          >
            Cancel
          </button>
          <button type="submit" className={classes.submit}>
            Confirm
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Checkout;
