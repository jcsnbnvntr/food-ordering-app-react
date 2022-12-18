import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const className = `${classes.input} ${
    props.className ? props.className : ""
  }`;
  return (
    <div className={className}>
      {props.label && <label>{props.label}</label>}
      <input {...props.input} ref={ref} />
    </div>
  );
});

export default Input;
