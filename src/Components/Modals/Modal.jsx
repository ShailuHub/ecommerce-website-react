import { createPortal } from "react-dom";
import React from "react";
import "./Modal.css";

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  return (
    <React.Fragment>
      <div className="modal-container">{props.children}</div>
    </React.Fragment>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
