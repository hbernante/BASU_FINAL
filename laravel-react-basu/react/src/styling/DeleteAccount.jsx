import React from 'react';

export default function DeleteAccount({ accountId }) {
  const handleDelete = () => {
    // Handle delete logic
    console.log(`Deleting account with ID: ${accountId}`);
  };

  return (
    <button onClick={handleDelete} className="text-xs text-red-600 hover:text-red-900">
      DELETE
    </button>
  );
}
