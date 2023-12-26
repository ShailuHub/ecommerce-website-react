import { useState } from "react";
import Main from "../Components/Main/Main";
import Cart from "../Components/Cart/Cart";
import Layout from "../Layout/Layout";

const Store = () => {
  const [showCart, setShowCart] = useState(false);
  return (
    <Layout onShowCart={setShowCart}>
      <Main />
      {showCart && <Cart onShowCart={setShowCart} />}
    </Layout>
  );
};

export default Store;
