import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" />
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
          Checkout
        </button>
      </div>
    </form>
  );
};

export default Checkout;
