import { forwardRef } from "react";

import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const containerClasses = props.error
    ? `${classes["input-container"]} ${classes.invalid}`
    : classes["input-container"];

  const inputClasses = `${classes.input} ${
    props.className ? props.className : ""
  }`;

  return (
    <div className={containerClasses}>
      <input className={inputClasses} {...props.attr} ref={ref} />
      <span className={classes["error-text"]}>{props.errorMessage}</span>
    </div>
  );
});

export default Input;
