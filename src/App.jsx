import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Store from "./Pages/Store";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Auth from "./Pages/Auth";
import AuthContext from "./Store/auth-context";
import { Navigate } from "react-router-dom";

const App = () => {
  const authCtx = useContext(AuthContext);
  const userLoggedIn = authCtx.isLoggedIn;
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/store"
          element={userLoggedIn ? <Store /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact-us" element={<ContactUs />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route
          path="*"
          element={!userLoggedIn ? <Auth /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
