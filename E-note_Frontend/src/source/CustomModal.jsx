import React, { useEffect } from 'react';
import './CustomModal.css'; // Import the CSS file for the modal

const CustomModal = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflow = 'unset'; // Re-enable scrolling when modal is closed
    };
  }, []);

  return (
    <div className="custom-modal">
      <div className="custom-modal-content">
        <span className="close-button" onClick={closeModal}>&times;</span>
        <p>You need to log in or register</p>
        <button className="close-modal-button" onClick={closeModal}>
          Close
        </button>
      </div>
      <div className="modal-overlay" onClick={closeModal} />
    </div>
  );
};

export default CustomModal;
