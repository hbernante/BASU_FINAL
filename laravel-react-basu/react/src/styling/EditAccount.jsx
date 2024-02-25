import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Notification from "./Notification";

Modal.setAppElement("#root");

export default function EditAccount({ account }) {
  const [editedAccount, setEditedAccount] = useState({
    id: account.id || '',
    first_name: account.first_name || '',
    last_name: account.last_name || '',
    email: account.email || '',
    password: account.password || '',
    role: account.role || '',
    phone_number: account.phone_number || '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editedAccount.id) {
        throw new Error("Account ID is missing");
      }
      validateEmail();
      await updateAccount();
      showSuccessNotification();
      closeModalAfterDelay();
    } catch (error) {
      handleSubmissionError(error);
      setShowNotification(false); // Hide the notification if there's an error
    }
  };

  const validateEmail = () => {
    const studentEmailRegex = /^[a-zA-Z0-9._%+-]+@student\.apc\.edu\.ph$/;
    const facultyEmailRegex = /^[a-zA-Z0-9._%+-]+@faculty\.apc\.edu\.ph$/;
    const emailRegex =
      editedAccount.role === "student" ? studentEmailRegex : facultyEmailRegex;
    if (!emailRegex.test(editedAccount.email)) {
      throw new Error("Email format is invalid, use APC Domain.");
    }
  };

  const updateAccount = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/accounts/${editedAccount.id}`,
        editedAccount
      );
      console.log("Account updated successfully:", response.data);
    } catch (error) {
      console.error("Axios error:", error.response.data);
      throw new Error("Error updating account");
    }
  };

  const showSuccessNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const closeModalAfterDelay = () => {
    setShowModal(false);
    setTimeout(() => window.location.reload(), 2000);
  };

  const handleSubmissionError = (error) => {
    if (error.response) {
      // Axios error with response (e.g., status code 4xx or 5xx)
      console.error("Axios error:", error.response.data);
      setErrorMessage(error.response.data.message || "An error occurred.");
    } else if (error.request) {
      // Axios error without response (e.g., no response received)
      console.error("Axios error:", error.request);
      setErrorMessage("No response received from the server.");
    } else {
      // Other errors (e.g., network error, HTML validation error)
      console.error("Error:", error.message);
      setErrorMessage(error.message || "An error occurred.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-xs text-blue-600 hover:text-blue-900 mr-4"
      >
        EDIT
      </button>

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
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium font-mono text-gray-700"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={editedAccount.password}
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
        <Notification message="Updating in Process..." />
      )}
    </>
  );
}
