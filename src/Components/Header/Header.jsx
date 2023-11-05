import React from "react";
import { Container, Row, Navbar, Col, Nav } from "react-bootstrap";
import "./Header.css";
import Logo from "../../UI/Logo";

const Header = ({ onShowCart }) => {
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
                    <Nav.Link className="nav-link">
                      <p>Home</p>
                    </Nav.Link>
                    <Nav.Link className="nav-link">
                      <p>Home</p>
                    </Nav.Link>
                    <Nav.Link className="nav-link">
                      <p>Home</p>
                    </Nav.Link>
                    <Nav.Link className="nav-link">
                      <p>Home</p>
                    </Nav.Link>
                  </Nav>
                  <button
                    type="button"
                    className="btn text-white"
                    id="navbar-cart-button"
                    onClick={() => onShowCart(true)}
                  >
                    Cart{" "}
                    <span className="badge badge-light" id="navbar-badge-count">
                      100
                    </span>
                  </button>
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
