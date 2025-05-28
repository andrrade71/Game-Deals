import React from 'react';

function Header() {
  return (
    <header className="text-center mb-8">
      <img 
        src={`${process.env.PUBLIC_URL}/images/logo-titulo.png`} 
        alt="Logo Game Deals" 
        className="mx-auto h-20 sm:h-24 md:h-32" 
      />
      
    </header>
  );
}

export default Header;
