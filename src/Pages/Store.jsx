import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Main from "../Components/Main/Main";
import Cart from "../Components/Cart/Cart";
import ContextProvider from "../Store/ContextProvider";
import Layout from "../Layout/Layout";

const Store = () => {
  const [showCart, setShowCart] = useState(false);
  return (
    <ContextProvider>
      <Layout onShowCart={setShowCart}>
        <Main />
        {showCart && <Cart onShowCart={setShowCart} />}
      </Layout>
    </ContextProvider>
  );
};

export default Store;
