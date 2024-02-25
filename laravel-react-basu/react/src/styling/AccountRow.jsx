import React, { useState } from "react";
import EditAccount from "./EditAccount";
import DeleteAccount from "./DeleteAccount";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function AccountRow({ account, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  return (
    <tr key={account.id}>
      <td className="px-6 py-4 whitespace-nowrap">{`${account.first_name} ${account.last_name}`}</td>
      <td className="px-6 py-4 whitespace-nowrap font-medium">{account.email}</td>
      <td
        className={`px-6 py-4 whitespace-nowrap ${
          account.role === "driver" ? "text-yellow-500" : "text-green-500"
        }`}
      >
        {account.role.toUpperCase()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-4">
          <EditAccount account={account} />
          <button
            onClick={handleDelete}
            className="text-xs text-red-600 hover:text-red-900"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
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
        </div>
      </td>
    </tr>
  );
}
