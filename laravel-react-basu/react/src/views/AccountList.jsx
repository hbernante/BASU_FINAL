import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import { Link } from "react-router-dom";
import TButton from "../components/core/TButton";
import { getAccounts } from "../axios"; // Import updated getAccounts function

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts(); // Fetch user-created accounts
        setAccounts(data); // Set accounts state with fetched data
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <PageComponent title="Account List">
      <div className="container mx-auto px-4 py-4">
        <TButton>
          <Link to="/account/register">Register Account</Link>
        </TButton>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Roles
              </th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.role}
                </td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  );
}
