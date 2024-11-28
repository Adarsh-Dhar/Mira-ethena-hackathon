// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "./MiraWP.sol";
import "./MiraLp.sol";

contract Mira is Ownable {
    // Waiting Pool Token Contract
    MiraWP public wpToken;
    // Lending Pool Token Contract
    MiraLp public lpToken;
    // USDE Token Contract
    IERC20 public usdeToken;

    // State variables
    uint256 public totalWaitingPoolETH;
    uint256 public totalLiquidityPoolSUSDe;

    struct Borrow {
        address borrowerAddress;
        uint256 borrowAmount;
        unit256 collateral;
    }

    struct Lend {
        address lenderAddress;
        uint256 lendedAmount;
        unit256 lendTime;
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
        lpToken = MiraLp(_lpTokenAddress);
        usdeToken = IERC20(_usdeTokenAddress);
    }

   function borrow(unit256 amount) external payable {
    //checks
    require(amount > 0, "cannot borrow less than or equal to 0 eth");
    require(msg.value > 0, "value should be greater than 0");

    //toke borrower deposit
    borrows[msg.sender] = Borrow {
        borrowerAddress = msg.sender;
        borrowAmount = amount;
        collateral = msg.amount;
    }
    //put the deposit in LP
    totalLiquidityPoolSUSDe += msg.sender;

    //take eth from the WP
    payFromWP(amount);
   }

   function Lend() payable external {
    //checks
    require(msg.value > 0, "repay amount should be greater than 0");

    //lend
    lends[msg.sender] = Lend {
        lenderAddress = msg.sender,
        lendedAmount = msg.value,
        lendTime = block.timestamp
    }
    

    //provide eth to WP
    totalWaitingPoolETH += msg.value;

    //mint WP tokens in exchange of some Eth
    
   }

   function getLPTokensFromWPTokens(uint256 amount) {
    //checks

    //get lp tokens from the lp in exchange of some wp tokens
   }

   function getEthFromWPTokens(uint256 amount) {
    //checks

    //get eth from the wp using wp tokens
   }

   function Repay(uint256 amount) payable external {
    //checks

    //repay eth to get the collateral
   }

   function payFromWP(uint256 amount) internal {
    //code
   }
}