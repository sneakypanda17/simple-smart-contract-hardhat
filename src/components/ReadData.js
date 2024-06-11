import React, { useState } from 'react';
import styled from 'styled-components';
import contract from '../contract';

const DataContainer = styled.div`
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

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
`;

const DataDisplay = styled.p`
  color: ${(props) => props.theme.colors.navy};
  font-size: 1.2rem;
`;

const ReadData = ({ account }) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (account) {
      try {
        console.log('Fetching data from contract...');
        const result = await contract.methods.get().call();
        console.log('Data fetched:', result);
        setData(result.toString()); // Ensure result is a string for rendering
        setError(''); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    } else {
      setError('No account connected');
    }
  };

  return (
    <DataContainer>
      <h2>Read Data from Blockchain</h2>
      <Button onClick={fetchData}>Fetch Data</Button>
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      <DataDisplay>Data: {data}</DataDisplay>
    </DataContainer>
  );
};

export default ReadData;
