import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import Cart from "./Components/Cart/Cart";

const App = () => {
  const [showCart, setShowCart] = useState(false);
  return (
    <React.Fragment>
      <Header onShowCart={setShowCart} />
      <Main />
      {showCart && <Cart onShowCart={setShowCart} />}
    </React.Fragment>
  );
};

export default App;
