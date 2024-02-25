import React from 'react';

export default function Notification({ message }) {
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-orange-500 text-white px-4 py-2 rounded-md">
      {message}
    </div>
  );
}
