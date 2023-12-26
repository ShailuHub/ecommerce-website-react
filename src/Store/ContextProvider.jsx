import { useReducer, useState, useEffect } from "react";
import cartContext from "./cart-context";
import Axios from "axios";
import authContext from "./auth-context";
// All the actions used by reducer function
const ACTIONS = {
  ADD: "add-item",
  DELETE: "delete-item",
  UPDATE: "update-quantity",
  SETITEM: "set-item",
  TOTALPRICE: "update-price",
};

// inital state values
const defaultCartState = {
  items: [],
  totalPrice: 0,
  setItem: (items) => {},
  setTotalPrice: (totalPrice) => {},
};

// Reducer function takes two argument currState and distatchAction
const cartReducer = (state, action) => {
  // Handle add action here
  if (action.type === ACTIONS.ADD) {
    let existingCartItemIndex = state.items.findIndex(
      (item) => action.item._id === item.id
    );
    const updatedTotalPrice = state.totalPrice + action.item.itemDetails.price;
    const updatedItems = [...state.items];
    if (existingCartItemIndex !== -1) {
      updatedItems[existingCartItemIndex] = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };
    } else {
      updatedItems.push({ ...action.item });
    }
    return { items: updatedItems, totalPrice: updatedTotalPrice };
  }

  // Handle delete action here
  else if (action.type === ACTIONS.DELETE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => action.id === item._id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalPrice =
      state.totalPrice -
      existingCartItem.itemDetails.price *
        existingCartItem.itemDetails.quantity;
    const updatedItems = state.items.filter((item) => item._id != action.id);
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }
  // Implement update logic
  else if (action.type === ACTIONS.UPDATE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item._id === action.id
    );
    let previousTotalPrice = state.totalPrice;
    let updatedItems = [...state.items];
    let existingCartItem = updatedItems[existingCartItemIndex];

    if (
      action.operator === "increment" &&
      existingCartItem.itemDetails.quantity <= 10
    ) {
      previousTotalPrice += existingCartItem.itemDetails.price;
      existingCartItem = {
        ...existingCartItem,
        itemDetails: {
          ...existingCartItem.itemDetails,
          quantity: existingCartItem.itemDetails.quantity + 1,
        },
      };
    } else if (
      action.operator === "decrement" &&
      existingCartItem.itemDetails.quantity > 1
    ) {
      previousTotalPrice -= existingCartItem.itemDetails.price;
      existingCartItem = {
        ...existingCartItem,
        itemDetails: {
          ...existingCartItem.itemDetails,
          quantity: existingCartItem.itemDetails.quantity - 1,
        },
      };
    } else {
      // Invalid operator or quantity limit reached, no change
      return state;
    }

    updatedItems[existingCartItemIndex] = existingCartItem;
    return {
      items: updatedItems,
      totalPrice: previousTotalPrice,
    };
  } else if (action.type === ACTIONS.SETITEM) {
    return { ...state, items: action.items };
  } else if (action.type === ACTIONS.TOTALPRICE) {
    return { ...state, totalPrice: action.totalPrice };
  }
};

// Use reducer hook useReducer(reudcerFunction,initial values of state)
// return an array first value is current state and dispatch function
export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //Add item it will add item to the server
  const addItemHandler = async (item) => {
    const itemDetails = {
      title: item.title,
      imageUrl: item.imageUrl,
      price: item.price,
      quantity: 1,
    };

    try {
      const modifyEmail = localStorage.getItem("email").replace(/[@.]/g, "");
      const url = `https://crudcrud.com/api/d1a62a298b5f45018cb91ede78dfb93b/cart${modifyEmail}`;
      const response = await Axios.post(url, { itemDetails });
      dispatchCartAction({
        type: ACTIONS.ADD,
        item: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemHandler = async (_id) => {
    try {
      const modifyEmail = localStorage.getItem("email").replace(/[@.]/g, "");
      const url = `https://crudcrud.com/api/d1a62a298b5f45018cb91ede78dfb93b/cart${modifyEmail}/${_id}`;
      await Axios.delete(url);
    } catch (error) {
      console.log(error);
    }
    dispatchCartAction({
      type: ACTIONS.DELETE,
      id: _id,
    });
  };

  const updateQuantityHandler = async (_id, operation) => {
    try {
      const modifyEmail = localStorage.getItem("email").replace(/[@.]/g, "");
      const url = `https://crudcrud.com/api/d1a62a298b5f45018cb91ede78dfb93b/cart${modifyEmail}/${_id}`;
      const itemToUpdate = cartState.items.find((item) => item._id === _id);
      if (
        itemToUpdate &&
        itemToUpdate.itemDetails.quantity > 0 &&
        itemToUpdate.itemDetails.quantity <= 10
      ) {
        let updatedQuantity = itemToUpdate.itemDetails.quantity;
        if (operation === "increment") {
          updatedQuantity += 1;
        } else if (operation === "decrement") {
          updatedQuantity -= 1;
        }
        //Do the put request
        await Axios.put(url, {
          itemDetails: {
            ...itemToUpdate.itemDetails,
            quantity: updatedQuantity,
          },
        });
        // Dispatch an action to update the local state
        dispatchCartAction({
          type: ACTIONS.UPDATE,
          id: _id,
          operator: operation,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    async function getAllStoredCartItems() {
      const modifyEmail = email.replace(/[@.]/g, "");
      let url = `https://crudcrud.com/api/d1a62a298b5f45018cb91ede78dfb93b/cart${modifyEmail}`;

      try {
        const response = await Axios.get(url);
        const totalPrice = response.data.reduce(
          (acc, item) =>
            acc + item.itemDetails.price * item.itemDetails.quantity,
          0
        );

        // Dispatch actions to update the local state
        dispatchCartAction({
          type: ACTIONS.SETITEM,
          items: response.data,
        });

        dispatchCartAction({
          type: ACTIONS.TOTALPRICE,
          totalPrice: totalPrice,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (email) {
      getAllStoredCartItems();
    } else {
      // Dispatch an action to set items to an empty array
      dispatchCartAction({
        type: ACTIONS.SETITEM,
        items: [],
      });
    }
  }, [dispatchCartAction]);

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

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const userLoggedIn = !!token;
  //Auto logout handler
  let logoutTimer;
  // Function to reset the auto-logout timer
  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => logoutHandler(), 50000);
  };

  //Login Handler
  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    resetLogoutTimer();
  };

  const logoutHandler = async () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    clearTimeout(logoutTimer);
  };

  // Function to handle user activity and reset the timer
  const handleUserActivity = () => {
    resetLogoutTimer();
  };

  // Attach event listeners for user activity
  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    autologout: resetLogoutTimer,
    email: email,
  };
  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};
