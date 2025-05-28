import React from 'react';

function PaginationControls({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  loading,
}) {
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 0 || loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-gray-300 dark:text-gray-300">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage + 1 >= totalPages || loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
