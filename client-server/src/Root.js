import React from 'react';
import './index.css';
import Routes from './components/Routes';
import { NavbarProvider } from './contexts/NavbarContext';

const Root = () => {
  return (
    <NavbarProvider>
      <Routes />
    </NavbarProvider>
  );
};

export default Root;
