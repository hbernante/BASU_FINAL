import React from "react";

export default function Pagination({ accountsPerPage, totalAccounts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAccounts / accountsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className="mx-1 px-3 py-1 rounded-md bg-gray-200"
        >
          {number}
        </button>
      ))}
    </div>
  );
}
