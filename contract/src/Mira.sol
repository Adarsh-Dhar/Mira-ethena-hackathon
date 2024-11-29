// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";


import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "./MiraWP.sol";
import "./MiraLp.sol";

contract Mira {
    // Waiting Pool Token Contract
    MiraWP public wpToken;
    // Lending Pool Token Contract
    MiraLP public lpToken;
    // USDE Token Contract
    IERC20 public usdeToken;

    // State variables
    uint256 public totalWaitingPoolETH;
    uint256 public totalLiquidityPoolSUSDe;

    struct Borrow {
        address borrowerAddress;
        uint256 borrowAmount;
        uint256 collateral;
    }

    struct Lend {
        address lenderAddress;
        uint256 lendedAmount;
        uint256 lendTime;
    }

     mapping(address => Borrow) public borrows;
     mapping(address => Lend) public lends;


    // Events
    event LoanExchanged(
        address indexed lender, 
        uint256 wpTokensIn, 
        uint256 lpTokensOut, 
        uint256 ethTransferred
    );
    event LiquidityPoolUSDeDeposited(
        address indexed depositor, 
        uint256 amount
    );

    constructor(
        address _wpTokenAddress, 
        address _lpTokenAddress, 
        address _usdeTokenAddress
    ) {
        wpToken = MiraWP(_wpTokenAddress);
        lpToken = MiraLP(_lpTokenAddress);
        usdeToken = IERC20(_usdeTokenAddress);
    }

   function borrow(uint256 amount) external payable {
    //checks
    require(amount > 0, "cannot borrow less than or equal to 0 eth");
    require(msg.value > 0, "value should be greater than 0");

    //toke borrower deposit
    borrows[msg.sender] = Borrow(
        msg.sender,
        amount,
        msg.value
    );
    //put the deposit in LP
    totalLiquidityPoolSUSDe += msg.value;

    //take eth from the WP
    payFromWP(amount);
   }

   function lend() payable external {
    //checks
    require(msg.value > 0, "repay amount should be greater than 0");

    //lend
    lends[msg.sender] = Lend(
        msg.sender,
        msg.value,
        block.timestamp
    );
    

    //provide eth to WP
    totalWaitingPoolETH += msg.value;

    //mint WP tokens in exchange of some Eth
    wpToken.mint();
   }

   function getLPTokensFromWPTokens(uint256 amount) external {
    //checks
    require(amount > 0, "amount should be greater than 0");


    //get lp tokens from the lp in exchange of some wp tokens
    uint256 amountToBurn = amount; //this needs to change
    wpToken.burn(msg.sender,amountToBurn);
    lpToken.mint(msg.sender,amount);
   }
   

   function getEthFromWPTokens(uint256 amount) external payable {
    //checks
    require(amount > 0, "amount should be greater than 0");

    //get eth from the wp using wp tokens
    wpToken.burn(msg.sender,amount);
    payable(msg.sender).transfer(amount);
   }

   

   function Repay(uint256 amount) payable external {
    //checks

    //repay eth to get the collateral
   }

   function payFromWP(uint256 amount) internal {
    //code
   }


}