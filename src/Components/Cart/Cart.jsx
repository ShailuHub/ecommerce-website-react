import React from "react";
import CartItem from "./CartItem";
import "./CartItem.css";
import Modal from "../Modals/Modal";

const cartItems = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 2,
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 3,
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    quantity: 1,
  },
];
const Cart = ({ onShowCart }) => {
  return (
    <Modal>
      <div className="container cart-section">
        <div className="cart-container m-auto py-5">
          <div className="row w-100">
            <h2 className="mb-5 text-center">
              Your{" "}
              <span style={{ color: "var(--green-color)" }}>Cart Item</span>{" "}
              <span className="material-symbols-outlined cart-icon">
                local_mall
              </span>
              <button
                className="btn btn-danger btn-lg float-end me-4"
                onClick={() => onShowCart(false)}
              >
                X
              </button>
            </h2>
          </div>
          <div className="cart-container-item">
            {cartItems.map((item, idx) => {
              return <CartItem details={item} key={idx} />;
            })}
          </div>
          <div className="cart-total-price">
            <span>Total</span>
            <span>Rs. 50</span>
          </div>
          <button className="place-order-btn">place order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
