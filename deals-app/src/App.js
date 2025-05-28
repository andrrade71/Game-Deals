import React, { useEffect, useState } from 'react';
import DealCard from './components/DealCard';
import FilterBar from './components/FilterBar';
import PaginationControls from './components/PaginationControls';
import GameDetailsModal from './components/GameDetailsModal';
import Header from './components/Header';
import Footer from './components/Footer';
import Spinner from './components/Spinner';

function App() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storesInfo, setStoresInfo] = useState({});

  const [selectedStoreID, setSelectedStoreID] = useState('');
  const [minSavingsState, setMinSavingsState] = useState(0);
  const [sortBy, setSortBy] = useState('Deal Rating');
  
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 60; 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [gameIdForModal, setGameIdForModal] = useState(null);

  useEffect(() => {
    const fetchStoresInfo = async () => {
      try {
        const response = await fetch('https://www.cheapshark.com/api/1.0/stores');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const storesData = await response.json();
        const info = storesData.reduce((acc, store) => {
          if (store.isActive) { 
             acc[store.storeID] = {
              name: store.storeName,
              logo: `https://www.cheapshark.com${store.images.logo}`,
              isActive: store.isActive
            };
          }
          return acc;
        }, {});
        setStoresInfo(info);
      } catch (e) {
        console.error("Could not fetch store information:", e);
      }
    };
    fetchStoresInfo();
  }, []);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      setError(null);
      let url = `https://www.cheapshark.com/api/1.0/deals?pageSize=${PAGE_SIZE}&pageNumber=${currentPage}&sortBy=${sortBy}`;

      if (selectedStoreID) {
        url += `&storeID=${selectedStoreID}`;
      }
      if (searchTerm) {
        url += `&title=${encodeURIComponent(searchTerm)}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setDeals(data);

        const totalPagesHeader = response.headers.get('X-Total-Page-Count');
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader, 10));
        } else {
          if (data.length === 0 && currentPage > 0) setTotalPages(currentPage); 
          else if (data.length === 0 && currentPage === 0) setTotalPages(0);
          else if (data.length < PAGE_SIZE && currentPage === 0) setTotalPages(1);
          else setTotalPages(currentPage + 1);
        }
      } catch (errorCatch) {
        console.error("Could not fetch deals:", errorCatch);
        setError(errorCatch.message);
        setDeals([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, [selectedStoreID, currentPage, PAGE_SIZE, sortBy, searchTerm]);

  useEffect(() => {
    const bestDealsMap = new Map();
    deals.forEach(deal => {
        const existingDeal = bestDealsMap.get(deal.gameID);
        const currentSalePrice = parseFloat(deal.salePrice);
        const existingSalePrice = existingDeal ? parseFloat(existingDeal.salePrice) : Infinity;

        if (!existingDeal || currentSalePrice < existingSalePrice) {
          bestDealsMap.set(deal.gameID, deal);
        }
      });
      let uniqueBestDeals = Array.from(bestDealsMap.values());

      if (minSavingsState > 0) {
        uniqueBestDeals = uniqueBestDeals.filter(deal => parseFloat(deal.savings) >= minSavingsState);
      }
      
      setFilteredDeals(uniqueBestDeals);
  }, [deals, minSavingsState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (!gameIdForModal) {
      setSelectedGameData(null); 
      return;
    }
    const fetchGameDetails = async () => {
      setModalLoading(true);
      setSelectedGameData(null); 
      try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameIdForModal}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedGameData(data);
      } catch (err) {
        console.error("Could not fetch game details:", err);
        setSelectedGameData(null);
      } finally {
        setModalLoading(false);
      }
    };
    fetchGameDetails();
  }, [gameIdForModal]);

  const handleStoreChange = (e) => { setSelectedStoreID(e.target.value); setCurrentPage(0); };
  const handleSavingsChange = (e) => { setMinSavingsState(parseInt(e.target.value, 10)); };
  const handleSortByChange = (e) => { setSortBy(e.target.value); setCurrentPage(0); };
  const handlePreviousPage = () => { setCurrentPage(prev => Math.max(0, prev - 1)); };
  const handleNextPage = () => { setCurrentPage(prev => (prev + 1 < totalPages ? prev + 1 : prev)); };
  const handleSearchInputChange = (e) => { setSearchInput(e.target.value); };
  const handleSearchSubmit = (e) => { e.preventDefault(); setSearchTerm(searchInput); setCurrentPage(0); };

  const openGameDetailsModal = (gameID) => {
    setGameIdForModal(gameID);
    setIsModalOpen(true);
  };
  const closeGameDetailsModal = () => {
    setIsModalOpen(false);
    setGameIdForModal(null); 
  };
  
  const savingsOptions = [
    { value: 0, label: 'Any Discount' }, { value: 25, label: '25% or more' },
    { value: 50, label: '50% or more' }, { value: 75, label: '75% or more' },
  ];
  const sortOptions = [
    { value: 'Deal Rating', label: 'Relevance' }, { value: 'Price', label: 'Price' },
    { value: 'Savings', label: 'Discount (%)' }, { value: 'Title', label: 'Title (A-Z)' },
    { value: 'Metacritic', label: 'Rating (Metacritic)' }, { value: 'Release', label: 'Release Date' },
  ];

  if (loading && deals.length === 0 && currentPage === 0) {
    return (
      <div className="min-h-screen bg-[#150c1c] flex flex-col items-center justify-center p-5">
        <div className="bg-gray-800/50 dark:bg-slate-800/70 p-6 rounded-lg shadow-xl text-center">
          <Header />
          <Spinner />
          <p className="text-xl text-gray-200 dark:text-gray-200 mt-4">Loading deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#150c1c] flex flex-col items-center justify-center p-5 text-center">
        <div className="bg-gray-800/50 dark:bg-slate-800/80 p-6 rounded-lg shadow-xl">
          <Header />
          <svg className="mx-auto h-12 w-12 text-red-400 dark:text-red-300 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xl text-red-300 dark:text-red-300 mt-4">Error loading data: {error}</p>
          <p className="text-md text-gray-400 dark:text-gray-400 mt-2">Please try reloading the page or check your connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        min-h-screen 
        p-4 md:p-8 
        transition-colors duration-500 
        bg-[#150c1c] 
      `}
    >
      <div className="relative z-10"> 
        <Header />

        <FilterBar
          searchInput={searchInput} selectedStoreID={selectedStoreID} minSavings={minSavingsState} sortBy={sortBy}
          storesInfo={storesInfo} savingsOptions={savingsOptions} sortOptions={sortOptions}
          onSearchInputChange={handleSearchInputChange} onSearchSubmit={handleSearchSubmit}
          onStoreChange={handleStoreChange} onSavingsChange={handleSavingsChange} onSortByChange={handleSortByChange}
        />

        {loading && deals.length > 0 && (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        )}
        
        {!loading && filteredDeals.length === 0 && (
          <div className="text-center py-10 px-4 bg-gray-800/50 dark:bg-slate-800/80 rounded-lg shadow-md max-w-md mx-auto mt-6">
            <svg className="mx-auto h-16 w-16 text-gray-500 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-gray-100 dark:text-gray-100">No Deals Found</h3>
            <p className="mt-1 text-md text-gray-400 dark:text-gray-400">
              No deals match your current filters or search term. Try adjusting your criteria.
            </p>
          </div>
        )}

        {filteredDeals.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredDeals.map((deal) => (
                <DealCard 
                  key={deal.dealID} 
                  deal={deal} 
                  storesInfo={storesInfo}
                  onOpenDetails={openGameDetailsModal}
                />
              ))}
            </div>
            <PaginationControls
              currentPage={currentPage} totalPages={totalPages}
              onPreviousPage={handlePreviousPage} onNextPage={handleNextPage}
              loading={loading}
            />
          </>
        )}

        <GameDetailsModal
          isOpen={isModalOpen}
          onClose={closeGameDetailsModal}
          gameData={selectedGameData}
          loading={modalLoading}
          storesInfo={storesInfo}
        />
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
