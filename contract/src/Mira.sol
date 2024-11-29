// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";


import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "./MiraWP.sol";
import "./MiraLp.sol";

contract Mira {
     address internal constant USDeContract = 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696;
    address internal constant SUSDeContract = 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b;
    uint32 constant CHAIN_EID_BLE = 52085143;
    uint32 constant CHAIN_EID_SEPOLIA = 11155111;
    // Waiting Pool Token Contract
    MiraWP public wpToken;
    // Lending Pool Token Contract
    MiraLP public lpToken;
    // USDE Token Contract
    IERC20 public usdeToken;

    // SUSDE Token Contract
    IERC20 public susdeToken;

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
        address _lpTokenAddress
    ) {
        wpToken = MiraWP(_wpTokenAddress);
        lpToken = MiraLP(_lpTokenAddress);
        usdeToken = IERC20(USDeContract);
        susdeToken = IERC20(SUSDeContract);

    }

    function stakeUSDe(uint256 amount) internal {
        // Approve sUSDe contract to spend USDe
        require(usdeToken.approve(SUSDeContract, amount), "Approval failed");

        // Stake USDe
        (bool success, ) = SUSDeContract.call(
            abi.encodeWithSignature("deposit(uint256,address)", amount, address(this))
        );
        require(success, "Staking failed");
    }

    function unstakeSUSDe(uint256 amount) external {
        // Request withdrawal from sUSDe contract
        (bool requestSuccess, ) = SUSDeContract.call(
            abi.encodeWithSignature("requestWithdraw(uint256,address)", amount, msg.sender)
        );
        require(requestSuccess, "Withdrawal request failed");

        // Check and complete withdrawal after cooldown
        (bool withdrawSuccess, ) = SUSDeContract.call(
            abi.encodeWithSignature("withdraw(uint256,address,address)", amount, address(this), msg.sender)
        );
        require(withdrawSuccess, "Withdrawal failed");

        // Transfer unstaked USDe to user
        require(usdeToken.transfer(msg.sender, amount), "USDe transfer failed");
    }

   function borrow(uint256 amount) external payable {
    //checks
    require(amount > 0, "cannot borrow less than or equal to 0 eth");
    require(msg.value > 0, "value should be greater than 0");

    // Transfer USDe from user to contract
        require(usdeToken.transferFrom(msg.sender, address(this), amount), "USDe transfer failed");

        // Stake USDe into sUSDe
        stakeUSDe(amount);

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