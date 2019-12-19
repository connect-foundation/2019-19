import React from 'react';
// import './index.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { NavbarProvider } from './contexts/NavbarContext';
import { PreviewPlayProvider } from './contexts/PreviewPlayContext';
import Routes from './components/Routes';
import Login from './loginContextApi/login';
import theme from './styles/css/theme';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-style: bold;
  }

  body {
    background-color: rgb(20, 20, 20);
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }

  *:focus {
    outline: none;
  }
`;

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NavbarProvider>
        <PreviewPlayProvider>
          <Login>
            <Routes />
          </Login>
        </PreviewPlayProvider>
      </NavbarProvider>
    </ThemeProvider>
  );
};

export default Root;
