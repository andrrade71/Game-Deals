import React from 'react';

function DealCard({ deal, storesInfo, onOpenDetails }) { 
  const steamHeaderImageUrl = deal.steamAppID 
    ? `https://cdn.akamai.steamstatic.com/steam/apps/${deal.steamAppID}/header.jpg` 
    : deal.thumb;

  const storeName = storesInfo[deal.storeID]?.name || `Store ID: ${deal.storeID}`;
  const storeLogo = storesInfo[deal.storeID]?.logo;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-md dark:shadow-slate-700/50 overflow-hidden flex flex-col hover:shadow-xl dark:hover:shadow-slate-600/60 transition-all duration-300 cursor-pointer" // ADDED cursor-pointer
      onClick={() => onOpenDetails(deal.gameID)} 
    >
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={steamHeaderImageUrl} 
          alt={deal.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            if (e.target.src !== deal.thumb) {
              e.target.onerror = null; 
              e.target.src = deal.thumb;
            }
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 title={deal.title} className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
          {deal.title}
        </h3>
        <div className="mb-3">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">${deal.salePrice}</span>
          {deal.normalPrice !== deal.salePrice && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">${deal.normalPrice}</span>
          )}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Savings: <span className="font-semibold text-red-500 dark:text-red-400">{parseFloat(deal.savings).toFixed(0)}%</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex items-center">
          <span className="mr-1">Store:</span>
          {storeLogo && (
            <img 
              src={storeLogo} 
              alt={storeName} 
              className="w-4 h-4 mr-1 inline-block"
            />
          )}
          <span>{storeName}</span>
        </div>
        {deal.metacriticScore > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Metacritic: <span className="font-semibold text-yellow-600 dark:text-yellow-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">{deal.metacriticScore}</span>
            </p>
        )}
        <div className="mt-auto">
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="block w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 text-center font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            View Best Deal
          </a>
        </div>
      </div>
    </div>
  );
}

export default DealCard;