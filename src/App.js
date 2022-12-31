import { useState } from "react";

import Cart from "./components/Cart";
import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals";
import useLockScrollbar from "./hooks/use-lock-scrollbar";

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const { lockScrollbar, unlockScrollbar } = useLockScrollbar();

  const showCartHandler = () => {
    setCartIsShown(true);
    lockScrollbar();
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
    unlockScrollbar();
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
