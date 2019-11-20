import React, { createContext, useState } from 'react';

const NavbarContext = createContext();

const NavbarProvider = props => {
  const [showNav, setShowNav] = useState(true);

  const value = {
    showNav,
    setShowNav,
  };
  const { children } = props;
  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };
