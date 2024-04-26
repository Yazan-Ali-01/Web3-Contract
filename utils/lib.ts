import { ethers } from 'hardhat';
import { BigNumberish, Contract, ContractFactory, Signer, providers, utils } from 'ethers';

export async function getBalance(address: string): Promise<BigNumberish> {
  const provider = ethers.provider;
  return await provider.getBalance(address);
}

export async function deployContract(contractFactory: ContractFactory, ...deployArgs: any[]): Promise<Contract> {
  const contract = await contractFactory.deploy(...deployArgs);
  await contract.deployed();
  return contract;
}

export async function sendTransaction(sender: Signer, to: string, amount: BigNumberish, gasLimit: BigNumberish): Promise<providers.TransactionReceipt> {
  const tx = await sender.sendTransaction({
    to: to,
    value: amount,
    gasLimit: gasLimit,
  });
  const receipt = await tx.wait();
  if (receipt === null) {
    throw new Error("Transaction failed without a receipt.");
  }
  return receipt;
}

function listenToTransfers(contract: Contract): void {
  contract.on('Transfer', (from, to, amount, event) => {
    console.log(`Transfer from ${from} to ${to} of amount ${amount.toString()}`);
  });
}


function isValidAddress(address: string): boolean {
  return utils.isAddress(address); // Use the isAddress function from the utils module
}