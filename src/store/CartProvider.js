import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const existingItemOnCartIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );
  const existingItemOnCart = state.items[existingItemOnCartIndex];

  switch (action.type) {
    case "ADD_ITEM": {
      let updatedItems;
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.quantity;

      if (existingItemOnCart) {
        const updatedItem = {
          ...existingItemOnCart,
          quantity: existingItemOnCart.quantity + action.payload.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemOnCartIndex] = updatedItem;
      } else {
        updatedItems = [action.payload, ...state.items];
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE_ITEM": {
      let updatedItems;
      const updatedTotalAmount = state.totalAmount - existingItemOnCart.price;

      if (existingItemOnCart.quantity > 1) {
        const quantityToReduce = 1;
        const updatedItem = {
          ...existingItemOnCart,
          quantity: existingItemOnCart.quantity - quantityToReduce,
        };

        updatedItems = [...state.items];
        updatedItems[existingItemOnCartIndex] = updatedItem;
      } else {
        updatedItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD_ITEM", payload: item });
  };

  const updateItemFromCart = (item) => {
    dispatchCart({ type: "UPDATE_ITEM", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", payload: { id: id } });
  };

  const cartContext = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: addItemToCartHandler,
    updateItem: updateItemFromCart,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
