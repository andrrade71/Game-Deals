import React from 'react';

function FilterBar({
  searchInput, selectedStoreID, minSavings, sortBy,
  storesInfo, savingsOptions, sortOptions,
  onSearchInputChange, onSearchSubmit, onStoreChange,
  onSavingsChange, onSortByChange,
}) {
  const selectBaseClasses = "block w-full pl-3 pr-10 py-2 text-base border-gray-600 dark:border-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md";
  const selectDarkThemeClasses = "bg-gray-700 dark:bg-gray-700 text-gray-100 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400";
  const inputBaseClasses = "block w-full pl-3 pr-10 py-2 text-base border-gray-600 dark:border-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-l-md";


  return (
    <form onSubmit={onSearchSubmit} className="mb-8 p-4 bg-gray-800/30 dark:bg-gray-800/50 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
      {/* Search Input */}
      <div className="lg:col-span-1">
        <label htmlFor="searchInput" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Search by Title:</label>
        <div className="flex">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            className={`${inputBaseClasses} ${selectDarkThemeClasses}`} 
            value={searchInput}
            onChange={onSearchInputChange}
            placeholder="e.g. Cyberpunk 2077"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-r-md text-sm"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Store Filter */}
      <div>
        <label htmlFor="storeFilter" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Store:</label>
        <select 
          id="storeFilter" 
          name="storeFilter" 
          className={`${selectBaseClasses} ${selectDarkThemeClasses}`} 
          value={selectedStoreID} 
          onChange={onStoreChange}
        >
          <option value="">All Stores</option>
          {Object.entries(storesInfo)
            .filter(([id, store]) => store.isActive)
            .sort(([idA, storeA], [idB, storeB]) => storeA.name.localeCompare(storeB.name))
            .map(([id, store]) => (
              <option key={id} value={id}>{store.name}</option>
          ))}
        </select>
      </div>

      {/* Savings Filter */}
      <div>
        <label htmlFor="savingsFilter" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Minimum Discount:</label>
        <select 
          id="savingsFilter" 
          name="savingsFilter" 
          className={`${selectBaseClasses} ${selectDarkThemeClasses}`} 
          value={minSavings} 
          onChange={onSavingsChange}
        >
           {savingsOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
      </div>

      {/* Sort By Filter */}
      <div>
        <label htmlFor="sortByFilter" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Sort by:</label>
        <select 
          id="sortByFilter" 
          name="sortByFilter" 
          className={`${selectBaseClasses} ${selectDarkThemeClasses}`} 
          value={sortBy} 
          onChange={onSortByChange}
        >
           {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
      </div>
    </form>
  );
}

export default FilterBar;
