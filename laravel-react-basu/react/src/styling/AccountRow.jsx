import React, { useState } from "react";
import EditAccount from "./EditAccount";
import DeleteAccount from "./DeleteAccount";

export default function AccountRow({ account, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

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
          onClick={handleDelete}
          className="text-xs text-red-600 hover:text-red-900"
        >
          DELETE
        </button>
        <DeleteAccount
          account={account}
          onDelete={(accountId) => {
            onDelete(accountId);
            setIsModalOpen(false); // Close modal when deletion is complete
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </td>
    </tr>
  );
}
