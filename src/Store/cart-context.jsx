import React from "react";
const cartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: () => {},
  deleteItem: () => {},
  updateQuantity: () => {},
});

export default cartContext;
