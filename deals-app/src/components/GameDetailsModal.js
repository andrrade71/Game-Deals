import React from 'react';

function GameDetailsModal({ isOpen, onClose, gameData, loading, storesInfo }) {
  if (!isOpen) {
    return null;
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {loading ? 'Loading Game Details...' : gameData?.info?.title || 'Game Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300 py-8">Fetching details...</p>
        )}

        {!loading && !gameData && (
          <p className="text-center text-red-500 dark:text-red-400 py-8">Could not load game details.</p>
        )}

        {!loading && gameData && (
          <div>
            <div className="mb-6 text-center">
              <img 
                src={gameData.info.thumb} 
                alt={gameData.info.title} 
                className="mx-auto mb-2 rounded shadow-sm max-h-48"
              />
            </div>

            {gameData.cheapestPriceEver && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900_alpha_50 rounded-md border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-1">
                  Cheapest Price Ever:
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${gameData.cheapestPriceEver.price} 
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                    (on {formatDate(gameData.cheapestPriceEver.date)})
                  </span>
                </p>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Current Deals:</h3>
              {gameData.deals && gameData.deals.length > 0 ? (
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {gameData.deals.map(deal => {
                    const storeName = storesInfo[deal.storeID]?.name || `Store ID: ${deal.storeID}`;
                    const storeLogo = storesInfo[deal.storeID]?.logo;
                    return (
                      <li key={deal.dealID} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm flex justify-between items-center">
                        <div className="flex items-center">
                          {storeLogo && (
                            <img src={storeLogo} alt={storeName} className="w-5 h-5 mr-2"/>
                          )}
                          <span className="font-medium text-gray-700 dark:text-gray-200">{storeName}:</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">${deal.price}</span>
                          {parseFloat(deal.savings) > 0 && (
                            <span className="ml-2 text-xs bg-red-200 dark:bg-red-700 text-red-700 dark:text-red-100 px-1.5 py-0.5 rounded-full">
                              {parseFloat(deal.savings).toFixed(0)}% OFF
                            </span>
                          )}
                           <a
                            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 underline"
                           >
                            Go to deal
                           </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No current deals found for this game via this API endpoint.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetailsModal;