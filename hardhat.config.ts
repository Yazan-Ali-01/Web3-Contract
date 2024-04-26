import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


import * as dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-ethers';

dotenv.config();


const privateKey1 = process.env.PRIVATE_KEY1 || ""; // Main account
const privateKey2 = process.env.PRIVATE_KEY2 || ""; // Second account for testing ownership transfer

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [
        privateKey1.startsWith('0x') ? privateKey1 : `0x${privateKey1}`,
        privateKey2.startsWith('0x') ? privateKey2 : `0x${privateKey2}`
      ]
    }
  }
};

export default config;
