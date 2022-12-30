import { forwardRef } from "react";

import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const className = `${classes.input} ${
    props.className ? props.className : ""
  }`;
  return <input className={className} {...props.attr} ref={ref} />;
});

export default Input;
