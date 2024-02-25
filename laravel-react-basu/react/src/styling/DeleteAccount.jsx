import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Notification from "./Notification";

Modal.setAppElement("#root");

export default function DeleteAccount({ account, onDelete, isOpen, onClose }) {
  const [showNotification, setShowNotification] = useState(false);

  // Function to handle deletion completion
  const handleDeletionComplete = () => {
    setShowNotification(false); // Hide notification when deletion is complete
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${account.id}`);
      onDelete(account.id);
      onClose();
      setShowNotification(true); // Show notification when deletion process starts
      handleDeletionComplete(); // Call when deletion is complete
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleCancelDelete = () => {
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <div className="text-red-700">
            <h2>
              <b>Confirm Deletion</b>
            </h2>
          </div>
          <p>Are you sure you want to delete this account?</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      {showNotification && <Notification message="Deleting in Process..." />}
    </>
  );
}
