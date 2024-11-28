// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "../out/IERC20.sol";

contract MiraLP is ERC20, Ownable {
    IERC20 public sUSDe;
    
    mapping(address => uint256) public depositedSUSDe;
    uint256 public totalDepositedSUSDe;

    constructor(address _sUSDe) ERC20("Mira Liquidity Pool", "MLP") {
        sUSDe = IERC20(_sUSDe);
    }

    function deposit(uint256 amount) external {
        require(sUSDe.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        depositedSUSDe[msg.sender] += amount;
        totalDepositedSUSDe += amount;
        
        _mint(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        depositedSUSDe[msg.sender] -= amount;
        totalDepositedSUSDe -= amount;
        
        _burn(msg.sender, amount);
        require(sUSDe.transfer(msg.sender, amount), "Transfer failed");
    }
}