import React from "react";
import "./CartItem.css";

const CartItem = (props) => {
  const { title, imageUrl, quantity, price } = props.details;
  return (
    <React.Fragment>
      <div className="d-flex cart-image-container">
        <div className="col-9 d-flex gap-3">
          <img src={imageUrl} alt="cart-image" className="cart-item-image" />
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            id="item-description"
          >
            <p className="mb-0 fs-5">
              {" "}
              <span style={{ color: "var(--green-color)" }}>{title}</span>
            </p>
          </div>
          <div
            className="d-flex justify-content-center gap-3 align-items-center flex-grow-1"
            id="quantity-container"
          >
            <p className="text-xl mb-0">Qty: </p>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <button className="btn btn-success ">-</button>
              <span className="badge badge-light bg-white text-black d-flex align-items-center justify-content-center">
                {quantity}
              </span>
              <button className="btn btn-success ">+</button>
            </div>
          </div>
        </div>
        <div className="col-3 d-flex flex-column justify-content-center align-items-center">
          <p className="fs-3">
            <span style={{ color: "var(--green-color)" }}>Rs. {price}</span>
          </p>
          <button id="remove-button">- remove</button>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default CartItem;
