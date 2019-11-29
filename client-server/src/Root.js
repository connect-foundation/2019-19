import React from 'react';
import './index.css';
import Routes from './components/Routes';
import Login from './loginContextApi/login';

const Root = () => {
  return (
    <>
      <Login>
        <Routes />
      </Login>
    </>
  );
};

export default Root;
