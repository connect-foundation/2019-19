import React from 'react';
// import './index.css';
import { createGlobalStyle } from 'styled-components';
import { NavbarProvider } from './contexts/NavbarContext';
import Routes from './components/Routes';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-style: normal;
    src: url("./styles/fonts/NotoSansKR-Regular.otf");
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-style: bold;
    src: url("./styles/fonts/NotoSansKR-Bold.otf");
  }

  body {
    background-color: rgb(20, 20, 20);
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Root = () => {
  return (
    <>
      <GlobalStyles />
      <NavbarProvider>
        <Routes />
      </NavbarProvider>
    </>
  );
};

export default Root;
