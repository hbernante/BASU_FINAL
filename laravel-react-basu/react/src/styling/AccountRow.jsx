import React, { useState, useEffect } from "react";
import EditAccount from "./EditAccount";
import DeleteAccount from "./DeleteAccount";
import Modal from "react-modal";
import axios from "axios";
import Notification from "./Notification"; // Import the Notification component

Modal.setAppElement("#root"); // Set the root element for the modal

export default function AccountRow({ account, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State for showing the notification

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${account.id}`);
      onDelete(account.id);
      setIsModalOpen(false);
      setShowNotification(true); // Show notification on successful deletion
      setTimeout(() => window.location.reload(), 2000); // Reload page after 1 second
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
    }
  }, [showNotification]);

  return (
    <tr key={account.id}>
      <td className="px-6 py-4 whitespace-nowrap">{account.first_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{account.last_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
      <td
        className={`px-6 py-4 whitespace-nowrap ${
          account.role === "driver" ? "text-yellow-500" : "text-green-500"
        }`}
      >
        {account.role.toUpperCase()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <EditAccount account={account} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-red-600 hover:text-red-900"
        >
          DELETE
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              padding: "2rem",
            },
          }}
        >
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
        </Modal>
      </td>
      {showNotification && <Notification message="Deleting in Process..." />}{" "}
      {/* Render the notification */}
    </tr>
  );
}
