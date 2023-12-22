import { useContext } from "react";
import CartItem from "./CartItem";
import "./CartItem.css";
import Modal from "../Modals/Modal";
import cartContext from "../../Store/cart-context";

const Cart = ({ onShowCart }) => {
  const cartCtx = useContext(cartContext);
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
            {cartCtx.items.map((item, idx) => {
              console.log(item);
              return <CartItem details={item} key={idx} />;
            })}
          </div>
          <div className="cart-total-price">
            <span>Total</span>
            <span>Rs. {cartCtx.totalPrice}</span>
          </div>
          <button className="place-order-btn">place order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
