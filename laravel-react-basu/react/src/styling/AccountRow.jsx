import React from 'react';
import EditAccount from './EditAccount';
import DeleteAccount from './DeleteAccount';

export default function AccountRow({ account }) {
  return (
    <tr key={account.id}>
      <td className="px-6 py-4 whitespace-nowrap">{account.first_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{account.last_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
      <td
        className={`px-6 py-4 whitespace-nowrap ${
          account.role === 'driver' ? 'text-yellow-500' : 'text-green-500'
        }`}
      >
        {account.role.toUpperCase()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <EditAccount account={account} />
        <DeleteAccount accountId={account.id} />
      </td>
    </tr>
  );
}
