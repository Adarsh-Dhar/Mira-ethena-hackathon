// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";


contract MiraWP is ERC20, Ownable {
    mapping(address => uint256) public depositedETH;
    uint256 public totalDepositedETH;

    constructor() Ownable(msg.sender) ERC20("Mira Waiting Pool", "MWP") {}

    function mint() external payable {
        require(msg.value > 0, "amount send should be greater than 0");
        _mint(msg.sender, msg.value);
    }

    function burn(address from, uint256 amount) external{
        _burn(from, amount);
    }

}
