// src/web3.js
import Web3 from 'web3';

let web3;

const infuraUrl = `https://sepolia.infura.io/v3/245996433e5a4c35a787921369070b7e`;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable(); // Request account access
  } catch (error) {
    console.error("User denied account access");
  }
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

window.web3 = web3; // Make web3 globally accessible

export default web3;
