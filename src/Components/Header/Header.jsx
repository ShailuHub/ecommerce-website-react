import React, { useContext } from "react";
import { Container, Row, Navbar, Col, Nav } from "react-bootstrap";
import "./Header.css";
import Logo from "../../UI/Logo";
import cartContext from "../../Store/cart-context";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom";

const Header = ({ onShowCart }) => {
  const cartCtx = useContext(cartContext);
  const authCtx = useContext(AuthContext);
  const userLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <React.Fragment>
      <Container fluid className="header-container">
        <Container>
          <Row>
            <Col>
              <Navbar>
                <Container>
                  <Navbar.Brand className="navbar-brand">
                    <Logo />
                  </Navbar.Brand>
                  <Nav className="nav">
                    <Nav.Link as={Link} to="/" className="nav-link">
                      <p>Home</p>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/store" className="nav-link">
                      <p>Store</p>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about" className="nav-link">
                      <p>About</p>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact-us" className="nav-link">
                      <p>Contact Us</p>
                    </Nav.Link>
                  </Nav>
                  {!userLoggedIn && (
                    <Nav.Link as={Link} to="/login" className="nav-link">
                      <p>Login</p>
                    </Nav.Link>
                  )}
                  {userLoggedIn && (
                    <div id="cart-logout-button">
                      <button
                        type="button"
                        className="btn text-white navbar-cart-button"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                      <button
                        type="button"
                        className="btn text-white navbar-cart-button"
                        id="navbar-cart-button"
                        onClick={() => onShowCart(true)}
                      >
                        Cart{" "}
                        <span
                          className="badge badge-light"
                          id="navbar-badge-count"
                        >
                          {cartCtx.items ? cartCtx.items.length : 0}
                        </span>
                      </button>
                    </div>
                  )}
                </Container>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Header;
