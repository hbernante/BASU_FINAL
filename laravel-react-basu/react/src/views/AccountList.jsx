import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import { Link } from "react-router-dom";
import TButton from "../components/core/TButton";
import { getAccounts } from "../axios"; // Import updated getAccounts function
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts(); // Fetch user-created accounts
        setAccounts(data.map(account => ({
          ...account,
          first_name: capitalizeFirstLetter(account.first_name),
          last_name: capitalizeFirstLetter(account.last_name),
        }))); // Set accounts state with fetched data
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <PageComponent
      title="Account List"
      buttons={
        <TButton color="green" to="/account/register">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Register an Account
        </TButton>
      }
    >
      <div className="container mx-auto px-4 py-4 right-0">
        <table className="min-w-full divide-y divide-gray-200 mt-5">
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
                Roles
              </th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    account.role === "driver"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {account.role.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageComponent>
  );
}
