import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext);
  const initialValue = 0;
  const numberOfCartItems = items.reduce(
    (currentQuantity, item) => currentQuantity + item.quantity,
    initialValue
  );

  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    setIsButtonHighlighted(true);
    const timer = setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 300);

    // cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const buttonClasses = `${classes.button} ${
    isButtonHighlighted ? classes.bump : ""
  }`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
