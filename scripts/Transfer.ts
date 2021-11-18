import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { TestToken, TestToken__factory } from "../typechain";

let aOwner!: SignerWithAddress, aRecipient!: SignerWithAddress, aTestToken!: TestToken;

const transfer = async (_owner: SignerWithAddress, _recipient: SignerWithAddress, _testToken: TestToken, test: boolean) => {
    
    let owner: SignerWithAddress, recipient: SignerWithAddress, testToken: TestToken;

    if (!test) {
        [owner, recipient] = await ethers.getSigners();
        const TestToken = await ethers.getContractFactory("TestToken");
        testToken = await TestToken.deploy(100, "TestToken", "TEST");

        await testToken.deployed();
    } else {
        owner = _owner;
        recipient = _recipient;
        testToken = _testToken;
    }
    
    let senderBalance = await testToken.balanceOf(owner.address);
    
    console.log("Sender has balance:", ethers.utils.formatEther(senderBalance));

    await (await testToken.increaseAllowance(owner.address, ethers.utils.parseUnits("100"))).wait();
    await (await testToken.transferFrom(owner.address, recipient.address, ethers.utils.parseUnits("10"))).wait();
    
    senderBalance = await testToken.balanceOf(owner.address);
    let recipientBalance = await testToken.balanceOf(recipient.address);

    console.log("Sender now has balance:", ethers.utils.formatEther(senderBalance));
    console.log("Recipient has balance:", ethers.utils.formatEther(recipientBalance));
};


transfer(aOwner, aRecipient, aTestToken, false).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

export default transfer;