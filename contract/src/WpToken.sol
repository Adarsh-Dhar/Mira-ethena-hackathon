// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract MiraWP is ERC20, Ownable {
    mapping(address => uint256) public depositedETH;
    uint256 public totalDepositedETH;

    constructor() ERC20("Mira Waiting Pool", "MWP") {}

    function deposit() external payable {
        depositedETH[msg.sender] += msg.value;
        totalDepositedETH += msg.value;
        
        _mint(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        depositedETH[msg.sender] -= amount;
        totalDepositedETH -= amount;
        
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
