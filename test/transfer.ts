import { expect } from "chai";
import { ethers } from "hardhat";
import transfer from "../scripts/Transfer";

describe("Transfer", async function () {

  it("Should Transfer 10 Tokens to Recipient", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy(100, "TestToken", "TEST");

    await testToken.deployed();

    expect(ethers.utils.formatEther(await testToken.balanceOf(owner.address))).to.equal("100.0");
  
    // Calling external transfer function
    await transfer(owner, recipient, testToken, true);

    expect(ethers.utils.formatEther(await testToken.balanceOf(owner.address))).to.equal("90.0");
    expect(ethers.utils.formatEther(await testToken.balanceOf(recipient.address))).to.equal("10.0");

  });
});

