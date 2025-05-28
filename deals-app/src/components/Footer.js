import React from 'react';

function Footer() {
  return (
    <footer className="text-center mt-12 py-6 border-t border-gray-300 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-400">
        Data provided by{' '}
        <a 
          href="https://www.cheapshark.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:underline"
        >
          CheapShark API
        </a>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
        Developed with React & Tailwind CSS
      </p>
    </footer>
  );
}

export default Footer;