import { useState } from "react";

const useInput = (validator) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // validate input whenever this custom hook is re-run
  const isValid = validator(enteredValue);
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
