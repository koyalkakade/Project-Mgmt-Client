import React from "react";
import { FcHighPriority } from "react-icons/fc";

const ConfirmationModal = ({
  show,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>

          <div className="modal-body text-center">
              <FcHighPriority style={{fontSize:"50px",marginBottom:"3px"}}/>
            <p>{message}</p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onCancel}
            >
              {cancelText}
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;