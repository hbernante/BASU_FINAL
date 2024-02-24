import React from 'react';
import axios from 'axios';

export default function DeleteAccount({ accountId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${accountId}`);
      onDelete(); // Call the onDelete callback to trigger a refresh of the account list
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error, such as showing an error message to the user
    }
  };

  return (
    <button onClick={handleDelete} className="text-xs text-red-600 hover:text-red-900">
      DELETE
    </button>
  );
}
