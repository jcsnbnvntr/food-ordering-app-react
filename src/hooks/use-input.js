import { useState } from "react";

const useInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const isValid = validator(enteredValue);
  const [isTouched, setIsTouched] = useState("");
  const hasError = !isValid && isTouched;

  const changeHandler = (ev) => {
    const value = ev.target.value;
    setEnteredValue(value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const submit = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    isValid,
    isTouched,
    hasError,
    changeHandler,
    blurHandler,
    submit,
    reset,
  };
};

export default useInput;
