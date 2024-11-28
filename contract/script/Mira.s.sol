// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Mira} from "../src/Mira.sol";

contract MiraScript is Script {
    Mira public miraContract;

    function setUp() public {
        // If you need to set up any prerequisites before deployment
    }

    function run() public {
        // Replace these with actual addresses of deployed contracts
        address wpTokenAddress = address(0x1111111111111111111111111111111111111111);
        address lpTokenAddress = address(0x2222222222222222222222222222222222222222);
        address susdeTokenAddress = address(0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b);

        // Start broadcasting transactions
        vm.startBroadcast();
        
        // Deploy the Mira contract
        miraContract = new Mira(
            wpTokenAddress, 
            lpTokenAddress, 
            susdeTokenAddress
        );
        
        // Log the deployed contract address
        console.log("Mira Contract deployed at:", address(miraContract));
        
        // Stop broadcasting
        vm.stopBroadcast();
    }
}