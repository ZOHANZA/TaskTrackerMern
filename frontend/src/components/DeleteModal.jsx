import React from "react";
import { FaTimes } from "react-icons/fa";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="button-group">
              <button className="cancel-button" onClick={onClose}>
                <FaTimes /> Cancel
              </button>
              <button className="confirm-button" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
