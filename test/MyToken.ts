// test/MyToken.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyToken } from "../typechain";
import { Signer } from "ethers";

describe("MyToken Contract", function () {
  let token: MyToken;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  const initialSupply = ethers.utils.parseUnits("1000000", 18);
  const tokenName = "MyToken";
  const tokenSymbol = "MTK";

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const TokenFactory = await ethers.getContractFactory("MyToken");
    token = await TokenFactory.deploy(tokenName, tokenSymbol, initialSupply, await owner.getAddress()) as MyToken;
    await token.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right token name", async function () {
      expect(await token.name()).to.equal(tokenName);
    });

    it("Should set the right token symbol", async function () {
      expect(await token.symbol()).to.equal(tokenSymbol);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await token.balanceOf(await owner.getAddress());
      expect(await token.totalSupply()).to.equal(initialSupply);
      expect(ownerBalance).to.equal(initialSupply);
    });

    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(await owner.getAddress());
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await token.connect(owner).transfer(await addr1.getAddress(), 100);
      const addr1Balance = await token.balanceOf(await addr1.getAddress());
      expect(addr1Balance).to.equal(100);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(await owner.getAddress());
      await expect(
        token.connect(addr1).transfer(await owner.getAddress(), 100)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      expect(await token.balanceOf(await owner.getAddress())).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await token.balanceOf(await owner.getAddress());
      await token.connect(owner).transfer(await addr1.getAddress(), 100);
      await token.connect(addr1).transfer(await addr2.getAddress(), 50);

      const finalOwnerBalance = await token.balanceOf(await owner.getAddress());
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(100));

      const addr1Balance = await token.balanceOf(await addr1.getAddress());
      expect(addr1Balance).to.equal(50);

      const addr2Balance = await token.balanceOf(await addr2.getAddress());
      expect(addr2Balance).to.equal(50);
    });
  });

  describe("Permissions and Ownership", function () {
    it("Only owner can mint new tokens", async function () {
      await expect(token.connect(addr1).mint(await addr1.getAddress(), 100))
        .to.be.revertedWith("Ownable: caller is not the owner");
      await expect(token.connect(owner).mint(await addr1.getAddress(), 100))
        .not.to.be.reverted;
    });
  });
});
