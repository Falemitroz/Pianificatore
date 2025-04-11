import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "../styles/Modal.css"; 

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <IoIosCloseCircleOutline className="modal-close" onClick={onClose}/>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;