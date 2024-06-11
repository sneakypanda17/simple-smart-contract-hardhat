import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Wallet from './components/Wallet';
import ReadData from './components/ReadData';
import WriteData from './components/WriteData';
import web3 from './web3';
import './App.css';  // Importing the CSS file

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Times New Roman', Times, serif;
    background-color: #f8f8f2;
    color: #001f3f;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    navy: '#001f3f',
    cream: '#f8f8f2',
    buttonBackground: '#001f3f',
    buttonHover: '#003366',
    cardBackground: '#ffffff',
    error: '#ff0000',
  },
  fonts: {
    main: "'Times New Roman', Times, serif",
  },
};

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  overflow: hidden;  // Prevent scrolling
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.navy};
  color: ${(props) => props.theme.colors.cream};
  padding: 20px;
  text-align: center;
  font-size: 2rem;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;  // Allow internal scrolling if needed
`;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colors.navy};
  color: ${(props) => props.theme.colors.cream};
  padding: 10px;
  text-align: center;
`;

function App() {
  const [account, setAccount] = useState(localStorage.getItem('account') || '');

  useEffect(() => {
    async function loadAccount() {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem('account', accounts[0]); // Save account to localStorage
      }
    }
    if (!account) {
      loadAccount();
    }
  }, [account]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header>Web3 App</Header>
        <Content>
          <Wallet account={account} setAccount={setAccount} />
          {account && (
            <>
              <ReadData account={account} />
              <WriteData account={account} />
            </>
          )}
        </Content>
        <Footer>&copy; 2024 Elegant Web3 App</Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
