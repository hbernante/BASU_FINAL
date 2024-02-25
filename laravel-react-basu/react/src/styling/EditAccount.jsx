import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Notification from "./Notification"; // Import the Notification component

Modal.setAppElement("#root"); // Set the root element for the modal

export default function EditAccount({ account }) {
  const [editedAccount, setEditedAccount] = useState(account);
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State for showing the notification
  const [errorMessage, setErrorMessage] = useState(""); // State for holding error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Submitting form...");

    // Email validation regex patterns
    const studentEmailRegex = /^[a-zA-Z0-9._%+-]+@student\.apc\.edu\.ph$/;
    const facultyEmailRegex = /^[a-zA-Z0-9._%+-]+@faculty\.apc\.edu\.ph$/;

    // Check if the email matches the appropriate regex based on the role
    const emailRegex =
      editedAccount.role === "student" ? studentEmailRegex : facultyEmailRegex;
    if (!emailRegex.test(editedAccount.email)) {
      setErrorMessage("Email format is invalid, use APC Domain.");
      return; // Stop submission if email format is invalid
    }

    try {
      // Make an API call to update the account
      const response = await axios.put(
        `http://localhost:8000/api/accounts/${editedAccount.id}`,
        editedAccount
      );
      console.log("Account updated successfully:", response.data);
      // Show notification on successful submission
      setShowNotification(true);
      // Close the modal after submission
      setShowModal(false);
      // Reload the page after a delay
      setTimeout(() => window.location.reload(), 2000); // Reload page after 2 seconds
    } catch (error) {
      console.error("Error updating account:", error);
      console.log("Validation errors:", error.response.data);
    }
  };

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
    }
  }, [showNotification]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-xs text-blue-600 hover:text-blue-900 mr-4"
      >
        EDIT
      </button>

      {/* Modal for editing account details */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-medium mb-4 text-center text-blue-700">
              Edit Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium font-mono text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  value={editedAccount.first_name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium font-mono text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  value={editedAccount.last_name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium font-mono text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedAccount.email}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300"
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium font-mono text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={editedAccount.role}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300"
                >
                  <option value="student">Student</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              {editedAccount.role === "driver" && (
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium font-mono text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phone_number"
                    value={editedAccount.phone_number}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300"
                  />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showNotification && (
        <Notification message="Updating in Process..." /> // Render the notification
      )}
    </>
  );
}
