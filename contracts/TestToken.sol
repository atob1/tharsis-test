// SPDX-License-Identifier: MIT
// Based off of https://solidity-by-example.org/app/erc20/ 
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor(uint initialSupply, string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * 10**uint(decimals()));
    }
}


