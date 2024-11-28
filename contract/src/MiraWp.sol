// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "../out/IERC20.sol";

contract MiraWP is ERC20, Ownable {
    mapping(address => uint256) public depositedETH;
    uint256 public totalDepositedETH;

    constructor() ERC20("Mira Waiting Pool", "MWP") {}


    function mintWPToken(uint256 amount) payable external {
        require(msg.value == amount, "the value provided should be equal to the amount");
        require(amount > 0, "amount should be greater than 0");
        require(msg.value > 0,"msg.value should be greater than 0");

        _mint(msg.sender,amount); 
    }


    function getEtherBalance(address _address) public view returns(uint126){
        return _address.balance; 
    }
}
