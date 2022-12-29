import { useRef } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const quantityInputRef = useRef();

  const submitHandler = (ev) => {
    ev.preventDefault();
    const enteredQuantity = +quantityInputRef.current.value; // + converts the value into a number

    if (enteredQuantity < 1 || enteredQuantity > 5) return;

    props.onAddToCart(enteredQuantity);
    quantityInputRef.current.value = "1"; // reset input
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
