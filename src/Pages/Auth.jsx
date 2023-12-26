import { useRef, useState, useContext } from "react";
import Layout from "../Layout/Layout";
import "./ContactUs.css";
import Axios from "axios";
import AuthContext from "../Store/auth-context";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const Navigate = useNavigate();
  let apiKey = "AIzaSyA6qg3fyVWaPqPu9rCkJTDumEKvT_o_PLU";
  let url;
  if (!isLogin) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
  } else {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  }
  const loginHandler = async (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    setLoading(true);
    try {
      const response = await Axios.post(
        url,
        {
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      authCtx.login(response.data.idToken, response.data.email);
      Navigate("/store");
    } catch (error) {
      if (error && error.response) {
        alert(error.response.data.error.message);
      }
      console.log(error);
    }
    setLoading(false);
  };
  const switchAccountModeHandler = () => {
    setLogin((previousState) => !previousState);
  };

  return (
    <Layout>
      <div className="form-container container mt-5 ">
        <form action="" onSubmit={loginHandler}>
          <div>{!isLogin ? <span>SignUp</span> : <span>Login</span>}</div>
          <div>
            <label htmlFor="client-email">Email</label>
            <input
              type="email"
              name="client-email"
              id="client-email"
              ref={emailInputRef}
            />
          </div>
          <div>
            <label htmlFor="client-name">Password</label>
            <input
              type="password"
              name="client-password"
              id="client-password"
              ref={passwordInputRef}
            />
          </div>
          {isLoading && (
            <div className="status-information">
              <p>sending request...</p>
            </div>
          )}
          <div>
            <input
              type="submit"
              value={!isLogin ? "Create Account" : "Login"}
              id="client-form-submit"
            />
          </div>
          <div>
            <button type="button" onClick={switchAccountModeHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Auth;
