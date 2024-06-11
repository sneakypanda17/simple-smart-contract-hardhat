import React from 'react';
import styled from 'styled-components';

const WalletContainer = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  text-align: center;
  flex: 1;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.buttonBackground};
  color: ${(props) => props.theme.colors.cream};
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover};
  }
`;

const AccountInfo = styled.p`
  color: ${(props) => props.theme.colors.navy};
  font-size: 1.2rem;
`;

const Wallet = ({ account, setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        localStorage.setItem('account', accounts[0]); // Save account to localStorage
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    localStorage.removeItem('account'); // Clear account from localStorage
  };

  return (
    <WalletContainer>
      <h2>Wallet</h2>
      {account ? (
        <>
          <AccountInfo>Account: {account}</AccountInfo>
          <Button onClick={disconnectWallet}>Disconnect</Button>
        </>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </WalletContainer>
  );
};

export default Wallet;
