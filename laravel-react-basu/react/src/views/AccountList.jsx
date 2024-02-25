import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { getAccounts } from "../axios";
import { PlusCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Sorting from "../styling/Sorting";
import Pagination from "../styling/Pagination";
import AccountRow from "../styling/AccountRow";
import axios from "axios";
import Notification from "../styling/Notification"; // Import the Notification component

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortByRole, setSortByRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage] = useState(12);
  const [showNotification, setShowNotification] = useState(false); // State for showing the notification

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(
          data.map((account) => ({
            ...account,
            first_name: capitalizeFirstLetter(account.first_name),
            last_name: capitalizeFirstLetter(account.last_name),
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await axios.delete(`http://localhost:8000/api/accounts/${accountId}`);
      // Handle successful deletion, such as updating the list of accounts
      // For example:
      // const updatedAccounts = accounts.filter(account => account.id !== accountId);
      // setAccounts(updatedAccounts);
      setShowNotification(true); // Show notification on successful deletion
      setTimeout(() => {
        setShowNotification(false);
        // Refresh data here if needed
      }, 3000); // Show notification for 3 seconds
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle error, such as showing an error message to the user
    }
  };

  const handleSortByRole = () => {
    setSortByRole(!sortByRole);
    const sortedAccounts = [...accounts].sort((a, b) => {
      if (sortByRole) {
        return a.role.localeCompare(b.role);
      } else {
        return b.role.localeCompare(a.role);
      }
    });
    setAccounts(sortedAccounts);
  };

  const handleSortAlphabetically = () => {
    const sortedAccounts = [...accounts].sort((a, b) => {
      return a.first_name.localeCompare(b.first_name);
    });
    setAccounts(sortedAccounts);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;

  // Filter accounts based on search term and filter criteria
  const filteredAccounts = accounts.filter((account) => {
    if (searchFilter === "all") {
      return (
        account.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return account[searchFilter]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
  });

  // Update current accounts based on pagination
  const currentAccounts = filteredAccounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <PageComponent
      title="Account List"
      buttons={
        <TButton color="green" to="/account/register">
          <UserPlusIcon className="h-6 w-6 mr-2" />
          Register an Account
        </TButton>
      }
    >
      <div className="container mx-auto px-4 py-4">
        {showNotification && <Notification message="Deleting in Process..." />}
        <div className="flex justify-between mb-4">
          <div>
            <input
              type="text"
              placeholder="Search Users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded px-2 py-1 mr-2"
            />
            <select
              value={searchFilter}
              onChange={handleFilterChange}
              className="border rounded  py-1"
            >
              <option value="all">All</option>
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
            </select>
          </div>
          <Sorting
            handleSortByRole={handleSortByRole}
            handleSortAlphabetically={handleSortAlphabetically}
            sortByRole={sortByRole}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`bg-white divide-y divide-gray-200 ${
                isLoading
                  ? "opacity-0"
                  : "opacity-100 transition-opacity duration-500"
              }`}
            >
              {currentAccounts.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  onDelete={handleDeleteAccount}
                />
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    No users created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          accountsPerPage={accountsPerPage}
          totalAccounts={filteredAccounts.length}
          paginate={paginate}
        />
        {isLoading && <div className="opacity-0">Loading...</div>}
      </div>
    </PageComponent>
  );
}
