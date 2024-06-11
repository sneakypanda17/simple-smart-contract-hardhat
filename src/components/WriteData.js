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

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.colors.navy};
  border-radius: 5px;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
`;

const WriteData = ({ account }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (account) {
      try {
        console.log('Setting data in contract...');
        const receipt = await contract.methods.set(value).send({ from: account });
        console.log('Transaction receipt:', receipt);
        setError('');
      } catch (err) {
        console.error('Error setting data:', err);
        setError(err.message);
      }
    } else {
      setError('No account connected');
    }
  };

  return (
    <DataContainer>
      <h2>Write Data to Blockchain</h2>
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </DataContainer>
  );
};

export default WriteData;
