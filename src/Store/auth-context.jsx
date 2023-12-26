import React, { createContext } from "react";

const authContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
  email: "",
  //autologout:()=>{}
});

export default authContext;
