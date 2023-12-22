import React from "react";
import Header from "../Components/Header/Header";

const Layout = ({ children, onShowCart }) => {
  return (
    <React.Fragment>
      <Header onShowCart={onShowCart} />
      {children}
    </React.Fragment>
  );
};

export default Layout;
