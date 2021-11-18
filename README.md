# Tharsis Test Project

This project contains a solidity contract that mints a simple ERC20 token and contains a script that transfers 10 tokens from User1 to User2. It also contains a test file to test this transfer function. 

To run the code:
1. Clone the repo.
2. Cd to the evmos sub-directory and then run ./init.sh to start up an evmos node containing 2 accounts.
3. Run npx hardhat test inside of the evmos sub-directory to test the code. 

Some technical decisions that I made were to create another account in the ./init.sh script to start an evmos node in order to have a second account to transfer 10 tokens to; use the Open Zepplin ERC20 contract as it has some added (safer) functionality like  the increaseAllowance function that is useful to call from the client side; and lastly, I added .wait() to the end of the increaseAllowance and transferFrom function calls to allow for the transactions to be mined on the local evmos node.

To accomplish the first step of running the node I followed the instructions at https://evmos.dev/quickstart/installation.html to install go, set the correct go path, clone the evmos repo, and then install the needed packages with make install. I then used the init.sh start-up script to start running an evmos node locally, albeit slightly changed. I added code to generate another account in the init.sh file to have a recipient account to send the funds from the first account to when testing the transferFrom function. For step 3 of creating an ERC20 contract I referenced the Open Zepplin documentation (https://docs.openzeppelin.com/contracts/2.x/erc20) and then created a transfer script to deploy the contract, increaseAllowance() for the sender, and then call transferFrom() to transfer funds from the sender to the recipient account. I first tested the contract on the hardhat local network before changing the hardhat.config.ts file to set my local evmos node (at http://localhost:8545/) as the default network. I lastly wrote a unit test for my transfer script using Ethers.js and Waffle to ensure that the script was correctly transferring 10 tokens from the sender to the recipient. 
