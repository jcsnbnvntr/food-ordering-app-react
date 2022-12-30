import Input from "../UI/Input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h2>Checkout</h2>
      <div className={classes.control}>
        <label htmlFor="firstName">First Name</label>
        <Input attr={{ id: "firstName", type: "text" }} />
      </div>
      <div className={classes.control}>
        <label htmlFor="lastName">Last Name</label>
        <Input attr={{ id: "lastName", type: "text" }} />
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <Input attr={{ id: "email", type: "text" }} />
      </div>
      <div className={classes.control}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <Input attr={{ id: "phoneNumber", type: "text" }} />
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <Input attr={{ id: "address", type: "text" }} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <Input attr={{ id: "postal", type: "text" }} />
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
  );
};

export default Checkout;
