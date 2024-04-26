import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { deployContract, getBalance } from '../utils/lib';
import "@nomiclabs/hardhat-ethers"
dotenv.config();

async function deployToken(tokenName: string, tokenSymbol: string, tokenSupply: string | number) {
  const [deployer, newOwner] = await ethers.getSigners();


  let balance = await getBalance(deployer.address);
  console.log(`Initial Balance: ${ethers.utils.formatEther(balance)} ETH`);

  const Token = await ethers.getContractFactory("MyToken");
  const token = await deployContract(Token, tokenName, tokenSymbol, tokenSupply, deployer.address)
  console.log(`Token deployed to: ${token.address}`);

  // Verify current owner
  const currentOwner = await token.owner();
  console.log(`Current Owner: ${currentOwner}`);

  const transferOwnershipTx = await token.transferOwnership(newOwner.address);
  await transferOwnershipTx.wait();
  const updatedOwner = await token.owner();
  console.log(`New Owner: ${updatedOwner}`);

  balance = await getBalance(deployer.address);
  console.log(`Balance after deployment: ${ethers.utils.formatEther(balance)} ETH`);

  console.log(`Deployment Transaction: ${token.deployTransaction.hash}`); // Get the transaction hash
  console.log(`View on Block Explorer: https://sepolia.etherscan.io/tx/${token.deployTransaction.hash}`); // Link to the transaction on a block explorer
}

async function main() {
  await deployToken("MyToken", "MTK", 1000000); // Example token details
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1); // Exit with a failure code
});