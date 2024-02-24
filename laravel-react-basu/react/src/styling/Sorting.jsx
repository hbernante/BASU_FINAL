import React from "react";

export default function Sorting({ handleSortByRole, handleSortAlphabetically, sortByRole }) {
  return (
    <div>
      <button
        onClick={handleSortByRole}
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-xs py-1 px-1 rounded mr-2"
      >
        {sortByRole ? "Sort: STUDENT" : "Sort: DRIVER"}
      </button>
      <button
        onClick={handleSortAlphabetically}
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-xs py-1 px-1 rounded"
      >
        Sort: ALPHABETICALLY
      </button>
    </div>
  );
}
