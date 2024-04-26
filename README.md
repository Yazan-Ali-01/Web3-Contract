# MyToken ERC20 Token Deployment

This project includes a TypeScript script for deploying an ERC20 token named "MyToken" on the Base blockchain testnet, utilizing Hardhat, a comprehensive Ethereum development environment.

## Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 14.x or later
- **npm**: Included with Node.js
- **Hardhat**: Install via npm by running:
 `npm install --save-dev hardhat`

 ## Installation

Follow these steps to set up the project:

1. **Clone the repository**:
- git clone test
- cd test
2. **Install dependencies**:
- `npm install`
3. **Set up environment variables**:
Create a `.env` file in the root directory and populate it with your credentials (I left mine in the example if you want to use them for ease of use and prototyping only in that case):
- INFURA_PROJECT_ID
- PRIVATE_KEY1
- PRIVATE_KEY2
  
## Deployment

Deploy the token by running the deployment script through Hardhat on the Sepolia testnet:
- `npx hardhat run scripts/deploy.ts --network sepolia`
## Features

- **Deploy an ERC20 token**: Use the provided script to deploy "MyToken".
- **Token Ownership**: Leverages OpenZeppelin's Ownable contract for ownership functionalities.
- **Minting tokens**: Restricted to the owner, allowing the minting of new tokens.

## Contract Functions

- `mint(to, amount)`: Mint new tokens to a specified address.
- `transfer(to, amount)`: Enable token holders to transfer tokens.
