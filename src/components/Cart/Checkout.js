import Input from "../UI/Input";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const textValidator = (text) => text.trim() !== "";
  const emailValidator = (email) => email.trim().includes("@");
  const phoneNumberValidator = (number) => number.trim().length === 11;
  const postalCodeValidator = (postalCode) => postalCode.trim().length === 4;

  const firstName = useInput(textValidator);
  const lastName = useInput(textValidator);
  const email = useInput(emailValidator);
  const phoneNumber = useInput(phoneNumberValidator);
  const address = useInput(textValidator);
  const postalCode = useInput(postalCodeValidator);

  const setInputClasses = (condition) => {
    return condition
      ? `${classes.control} ${classes.invalid}`
      : classes.control;
  };

  const firstNameClasses = setInputClasses(firstName.hasError);
  const lastNameClasses = setInputClasses(lastName.hasError);
  const emailClasses = setInputClasses(email.hasError);
  const phoneNumberClasses = setInputClasses(phoneNumber.hasError);
  const addressClasses = setInputClasses(address.hasError);
  const postalCodeClasses = setInputClasses(postalCode.hasError);

  const isFormValid =
    firstName.isValid &&
    lastName.isValid &&
    email.isValid &&
    phoneNumber.isValid &&
    address.isValid &&
    postalCode.isValid;

  const resetForm = () => {
    firstName.reset();
    lastName.reset();
    email.reset();
    phoneNumber.reset();
    address.reset();
    postalCode.reset();
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    firstName.submit();
    lastName.submit();
    email.submit();
    phoneNumber.submit();
    address.submit();
    postalCode.submit();

    if (!isFormValid) return;

    resetForm();
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h2>Checkout</h2>
      <div className={firstNameClasses}>
        <label htmlFor="firstName">First Name</label>
        <Input
          attr={{
            id: "firstName",
            type: "text",
            value: firstName.value,
            onChange: firstName.changeHandler,
            onBlur: firstName.blurHandler,
          }}
          error={firstName.hasError}
          errorMessage="First name must not be empty"
        />
      </div>
      <div className={lastNameClasses}>
        <label htmlFor="lastName">Last Name</label>
        <Input
          attr={{
            id: "lastName",
            type: "text",
            value: lastName.value,
            onChange: lastName.changeHandler,
            onBlur: lastName.blurHandler,
          }}
          error={lastName.hasError}
          errorMessage="Last name must not be empty"
        />
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">Email</label>
        <Input
          attr={{
            id: "email",
            type: "text",
            value: email.value,
            onChange: email.changeHandler,
            onBlur: email.blurHandler,
          }}
          error={email.hasError}
          errorMessage="Invalid email address"
        />
      </div>
      <div className={phoneNumberClasses}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <Input
          attr={{
            id: "phoneNumber",
            type: "text",
            value: phoneNumber.value,
            onChange: phoneNumber.changeHandler,
            onBlur: phoneNumber.blurHandler,
          }}
          error={phoneNumber.hasError}
          errorMessage="Invalid phone number"
        />
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <Input
          attr={{
            id: "address",
            type: "text",
            value: address.value,
            onChange: address.changeHandler,
            onBlur: address.blurHandler,
          }}
          error={address.hasError}
          errorMessage="Address must not be empty"
        />
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <Input
          attr={{
            id: "postal",
            type: "text",
            value: postalCode.value,
            onChange: postalCode.changeHandler,
            onBlur: postalCode.blurHandler,
          }}
          error={postalCode.hasError}
          errorMessage="Invalid postal code"
        />
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
