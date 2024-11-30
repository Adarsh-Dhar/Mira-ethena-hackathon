// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";


import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "./MiraWP.sol";
import "./MiraLp.sol";
import "./Oracle.sol";

contract Mira {
     address internal constant USDeContract = 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696;
    address internal constant SUSDeContract = 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b;
    uint32 constant CHAIN_EID_BLE = 52085143;
    uint32 constant CHAIN_EID_SEPOLIA = 11155111;
    // Waiting Pool Token Contract
    MiraWP public wpToken; //1:1 with eth
    // Lending Pool Token Contract
    MiraLP public lpToken; //1:1 with susde
    // USDE Token Contract
    IERC20 public usdeToken;
    // SUSDE Token Contract
    IERC20 public susdeToken;
    //oracle contract
    OracleMira public oracle;

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
    event BorrowIncreased(
        address indexed borrower,
        uint256 newBorrowAmount,
        uint256 additionalCollateral
    );
    event BorrowRepaid(
        address indexed borrower,
        uint256 repaidAmount,
        uint256 remainingBorrow
    );
     event USDUnstaked(
        address indexed borrower,
        uint256 amount
    );

    constructor(
        address _wpTokenAddress, 
        address _lpTokenAddress,
        address _oracleAddress
    ) {
        wpToken = MiraWP(_wpTokenAddress);
        lpToken = MiraLP(_lpTokenAddress);
        usdeToken = IERC20(USDeContract);
        susdeToken = IERC20(SUSDeContract);
        oracle = OracleMira(_oracleAddress);


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
        // Checks
        require(amount > 0, "cannot borrow less than or equal to 0 eth");
        require(msg.value > 0, "value should be greater than 0");

        // Transfer USDe from user to contract
        require(usdeToken.transferFrom(msg.sender, address(this), amount), "USDe transfer failed");

        // Stake USDe into sUSDe
        stakeUSDe(amount);

        // Update borrow information
        Borrow storage userBorrow = borrows[msg.sender];
        
        // If user has an existing borrow, add to it
        userBorrow.borrowAmount += amount;
        userBorrow.collateral += msg.value;
        userBorrow.borrowerAddress = msg.sender;

        // Emit event with new borrow details
        emit BorrowIncreased(msg.sender, userBorrow.borrowAmount, msg.value);

        // Put the deposit in LP
        totalLiquidityPoolSUSDe += msg.value;

        // Take eth from the WP
        payFromWP(amount);
    }

    function getBorrow(address _address) external view returns (uint256) {
        return borrows[_address].borrowAmount;
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

    uint256 susde_usd = oracle.getSusdeUsdPrice();
    uint256 eth_usd = oracle.getEthUsdPrice();
    //get lp tokens from the lp in exchange of some wp tokens
    uint256 amountToBurn = amount * eth_usd / susde_usd; //convert susde to eth
    wpToken.burn(msg.sender,amountToBurn); //eth burn
    lpToken.mint(msg.sender,amount); //susde mint
   }
   

   function getEthFromWPTokens(uint256 amount) external payable {
    //checks
    require(amount > 0, "amount should be greater than 0");

    //get eth from the wp using wp tokens
    wpToken.burn(msg.sender,amount);
    payable(msg.sender).transfer(amount);
   }

   

   function Repay(uint256 amount) payable external {
        // Checks
        Borrow storage userBorrow = borrows[msg.sender];
        require(amount > 0, "Repay amount must be greater than 0");
        require(amount <= userBorrow.borrowAmount, "Repay amount exceeds borrowed amount");

        // Reduce the borrowed amount
        userBorrow.borrowAmount -= amount;

        // Transfer repaid USDe back to the contract
        require(usdeToken.transferFrom(msg.sender, address(this), amount), "USDe transfer failed");

        // Unstake the USDe
        // Request withdrawal from sUSDe contract
        (bool requestSuccess, ) = SUSDeContract.call(
            abi.encodeWithSignature("requestWithdraw(uint256,address)", amount, address(this))
        );
        require(requestSuccess, "Withdrawal request failed");

        // Check and complete withdrawal after cooldown
        (bool withdrawSuccess, ) = SUSDeContract.call(
            abi.encodeWithSignature("withdraw(uint256,address,address)", amount, address(this), msg.sender)
        );
        require(withdrawSuccess, "Withdrawal failed");

        // Emit event with unstaking details
        emit USDUnstaked(msg.sender, amount);

        // Emit event with repayment details
        emit BorrowRepaid(msg.sender, amount, userBorrow.borrowAmount);

        // If borrow is fully repaid, reset the borrow struct
        if (userBorrow.borrowAmount == 0) {
            // Return collateral to the borrower
            payable(msg.sender).transfer(userBorrow.collateral);
            delete borrows[msg.sender];
        }
    }

   function payFromWP(uint256 amount) internal {
    //code
   }


}