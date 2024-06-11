// src/contract.js
import web3 from './web3';

const address = '0x9460394005cfDFf3B8F7E8A412cdEB6356a01107'; // Update with your contract address
const abi = [
  {
    "inputs": [{"internalType": "uint256","name": "x","type": "uint256"}],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(abi, address);

export default contract;
