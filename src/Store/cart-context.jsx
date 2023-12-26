import React from "react";
const cartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: () => {},
  deleteItem: () => {},
  updateQuantity: () => {},
  setItem: (items) => {},
  setTotalPrice: (totalPrice) => {},
});

export default cartContext;
