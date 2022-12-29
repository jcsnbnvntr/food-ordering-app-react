import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  updateItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
