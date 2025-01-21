import React from 'react';
import './ConfirmationModal.css';
import CustomerButton from '../../CustomerButton/CustomerButton'; // Ensure to import your CustomerButton component

export default function ConfirmationModal({
    title = "Confirm?",
    message = "Need confirm",
    confirmButtonText = "Confirm",
    cancelButtonText = "Close",
    onConfirm,
    onCancel,
    isOpen = false,
}) {
    if (!isOpen) {
        return null; // Don't render anything if the modal is not open
    }

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal-content">
                <h2 className="confirmation-modal-title">{title}</h2>
                <p className="confirmation-modal-message">{message}</p>
                <div className="confirmation-modal-button-group">
                    <CustomerButton textValue={confirmButtonText} onClick={onConfirm} />
                    <CustomerButton textValue={cancelButtonText} onClick={onCancel} />
                </div>
            </div>
        </div>
    );
}