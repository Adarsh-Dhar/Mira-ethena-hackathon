// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract MiraLP is ERC20, Ownable {
    IERC20 public sUSDe;
    
    mapping(address => uint256) public depositedSUSDe;
    uint256 public totalDepositedSUSDe;

    constructor(address _sUSDe) ERC20("Mira Liquidity Pool", "MLP") Ownable(msg.sender) {
        sUSDe = IERC20(_sUSDe);
    }

    function mint(address from, uint256 amount) external payable {
        _mint(from, amount);
    }

    function burn(address from, uint256 amount) external{
        _burn(from, amount);
    }
}