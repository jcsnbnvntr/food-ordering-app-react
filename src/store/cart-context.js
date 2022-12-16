import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  updateItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
