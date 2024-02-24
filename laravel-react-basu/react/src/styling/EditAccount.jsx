import React, { useState } from 'react';
import axios from 'axios';

export default function EditAccount({ account }) {
  const [editedAccount, setEditedAccount] = useState(account);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Submitting form...');
    try {
      // Make an API call to update the account
      const response = await axios.put(`http://localhost:8000/api/accounts/${editedAccount.id}`, editedAccount);
      console.log('Account updated successfully:', response.data);
      // Close the modal after submission
      setShowModal(false);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error updating account:', error);
      console.log('Validation errors:', error.response.data);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="text-xs text-blue-600 hover:text-blue-900 mr-4">
        EDIT
      </button>

      {/* Modal for editing account details */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-medium mb-4">Edit Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" name="first_name" value={editedAccount.first_name} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastName" name="last_name" value={editedAccount.last_name} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={editedAccount.email} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select id="role" name="role" value={editedAccount.role} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300">
                  <option value="student">Student</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              {editedAccount.role === 'driver' && (
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="text" id="phoneNumber" name="phone_number" value={editedAccount.phone_number} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300" />
                </div>
              )}
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
