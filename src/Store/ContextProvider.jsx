import { useReducer } from "react";
import cartContext from "./cart-context";

// All the actions used by reducer function
const ACTIONS = {
  ADD: "add-item",
  DELETE: "delete-item",
  UPDATE: "update-quantity",
};

// inital state values
const defaultCartState = {
  items: [],
  totalPrice: 0,
};

// Reducer function takes two argument currState and distatchAction
const cartReducer = (state, action) => {
  // Handle add action here
  if (action.type === ACTIONS.ADD) {
    // Check if item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.item.id === item.id
    );

    // When exist
    if (existingCartItemIndex !== -1) {
      const updatedTotalPrice = state.totalPrice + action.item.price;
      const updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      };
    } else {
      const updatedTotalPrice = state.totalPrice + action.item.price;
      return {
        items: [...state.items, { ...action.item, quantity: 1 }],
        totalPrice: updatedTotalPrice,
      };
    }
  }

  // Handle delete action here
  else if (action.type === ACTIONS.DELETE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.id === item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalPrice =
      state.totalPrice - existingCartItem.price * existingCartItem.quantity;
    const updatedItems = state.items.filter((item) => item.id != action.id);
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }
  // Implement update logic
  else if (action.type === ACTIONS.UPDATE) {
    // Handle delete action here
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.id === item.id
    );
    let existingCartItem = state.items[existingCartItemIndex];
    let updatedTotalPrice = 0;
    let updateItem;
    if (action.operator === "increment") {
      updatedTotalPrice = state.totalPrice + existingCartItem.price;
      updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
    } else if (action.operator === "decrement") {
      updatedTotalPrice = state.totalPrice - existingCartItem.price;
      updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
    } else {
      throw new Error("Inavalid operator");
    }
    state.items[existingCartItemIndex] = updateItem;
    return {
      items: [...state.items],
      totalPrice: updatedTotalPrice,
    };
  } else {
    return defaultCartState;
  }
};

// Use reducer hook useReducer(reudcerFunction,initial values of state)
// return an array first value is current state and dispatch function
const ContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: ACTIONS.ADD,
      item: item,
    });
  };

  const deleteItemHandler = (id) => {
    dispatchCartAction({
      type: ACTIONS.DELETE,
      id: id,
    });
  };

  const updateQuantityHandler = (id, operation) => {
    dispatchCartAction({
      type: ACTIONS.UPDATE,
      id: id,
      operator: operation,
    });
  };

  const contextValue = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    updateQuantity: updateQuantityHandler,
  };
  return (
    <cartContext.Provider value={contextValue}>
      {props.children}
    </cartContext.Provider>
  );
};

export default ContextProvider;
