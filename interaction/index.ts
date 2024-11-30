const { ethers } = require('ethers');
import { toast } from 'react-hot-toast'; 
const mira_address = "0xa368353FBBe6f5d5574735B24760FBD0910ffe5D"
const usde_address = "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696"

const mira_abi = [{"type":"constructor","inputs":[{"name":"_wpTokenAddress","type":"address","internalType":"address"},{"name":"_lpTokenAddress","type":"address","internalType":"address"},{"name":"_oracleAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"Repay","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"borrow","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"borrows","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"borrowerAddress","type":"address","internalType":"address"},{"name":"borrowAmount","type":"uint256","internalType":"uint256"},{"name":"collateral","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getBorrow","inputs":[{"name":"_address","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getEthFromWPTokens","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"getLPTokensFromWPTokens","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"lend","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"lends","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"lenderAddress","type":"address","internalType":"address"},{"name":"lendedAmount","type":"uint256","internalType":"uint256"},{"name":"lendTime","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"lpToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract MiraLP"}],"stateMutability":"view"},{"type":"function","name":"oracle","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract OracleMira"}],"stateMutability":"view"},{"type":"function","name":"susdeToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IERC20"}],"stateMutability":"view"},{"type":"function","name":"totalLiquidityPoolSUSDe","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"totalWaitingPoolETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"unstakeSUSDe","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usdeToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IERC20"}],"stateMutability":"view"},{"type":"function","name":"wpToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract MiraWP"}],"stateMutability":"view"},{"type":"event","name":"BorrowIncreased","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"newBorrowAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"additionalCollateral","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"BorrowRepaid","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"repaidAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"remainingBorrow","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"LiquidityPoolUSDeDeposited","inputs":[{"name":"depositor","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"LoanExchanged","inputs":[{"name":"lender","type":"address","indexed":true,"internalType":"address"},{"name":"wpTokensIn","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"lpTokensOut","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"ethTransferred","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"USDUnstaked","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}]
  

  const usde_abi = [
    {
      inputs: [{ internalType: "address", name: "admin", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "CantRenounceOwnership", type: "error" },
    { inputs: [], name: "InvalidShortString", type: "error" },
    { inputs: [], name: "OnlyMinter", type: "error" },
    {
      inputs: [{ internalType: "string", name: "str", type: "string" }],
      name: "StringTooLong",
      type: "error",
    },
    { inputs: [], name: "ZeroAddressException", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newMinter",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "oldMinter",
          type: "address",
        },
      ],
      name: "MinterUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferStarted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "from", type: "address" },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "eip712Domain",
      outputs: [
        { internalType: "bytes1", name: "fields", type: "bytes1" },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "version", type: "string" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "address", name: "verifyingContract", type: "address" },
        { internalType: "bytes32", name: "salt", type: "bytes32" },
        { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "minter",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "nonces",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newMinter", type: "address" }],
      name: "setMinter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  

  let provider;
  let signer : any;
  
  // Initialize the provider and signer
  export const initEthereum = async () => {
      if (window.ethereum) {
          provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          signer = await provider.getSigner();
          console.log(`signer : ${signer}`)
          console.log(`provider : ${provider}`)
          const miraContract = new ethers.Contract(mira_address, mira_abi, signer);
          const usdeContract = new ethers.Contract(usde_address, usde_abi, signer);
          return {miraContract,usdeContract};
  
      } else {
          console.log("MetaMask is not installed!");
          return null;
      }
  };

  export const borrow = async (
    amount: number, // USDe amount to borrow
    collateral: number // ETH amount to provide as collateral
  ) => {
    try {
      // Create contract instances
      //@ts-ignore
      const {miraContract,usdeContract} = await initEthereum();

      console.log("usdeContract", usdeContract);
      console.log("miraContract", miraContract);
  
      // Convert amounts to BigNumber
      const borrowAmount = ethers.parseUnits(amount.toString(), 18);
      const collateralAmount = ethers.parseEther(collateral.toString());

      console.log("borrow amount", borrowAmount)
      console.log("collateral amount", collateralAmount)

  
      // Approve USDe token transfer
      const approveTx = await usdeContract.approve(
        mira_address, 
        borrowAmount
      );
      console.log("approveTx", approveTx);
      await approveTx.wait();
  
      // Perform borrow transaction
      const borrowTx = await miraContract.borrow(borrowAmount, {
        value: collateralAmount // ETH collateral
      });
      console.log("borrowTx", borrowTx);
      // Wait for transaction confirmation
      const receipt = await borrowTx.wait();
  
      // Success notification
      toast.success(`Borrow successful! Transaction Hash: ${receipt.transactionHash}`);
  
      return receipt.transactionHash;
  
    } catch (error) {
      // Error handling
      console.error('Borrow transaction error:', error);
      
      // Check if error has a reason or message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Borrow transaction failed';
      
      toast.error(errorMessage);
  
      throw error;
    }
  };

export const lend = async (amount : number) => {
    const result = await initEthereum();
    if (!result) {
        console.log("MetaMask is not installed!");
        return null; // Ensure function returns null if MetaMask is not installed
    }

    const contract = new ethers.Contract(mira_address, mira_abi, signer).lend(amount);
    console.log("result of borrow", contract);
    
    return contract;
};




//   export const setDAOGovernanceContract = async () => {
//     const result = await initEthereum();
//     if (!result) {
//         console.log("MetaMask is not installed!");
//         return null; // Ensure function returns null if MetaMask is not installed
//     }
    
//     const { signer, provider } = result;
    
//     console.log(`DAOGovernance Address: ${DAOGovernanceAddress}`);
    
//     const contract = new ethers.Contract(DAOGovernanceAddress, DAOGovernanceABI, signer);
//     console.log("DAO Governance Contract:", contract);
    
//     return contract;
// };

// export const getDAOGovernanceContract = async () => {
//     const result = await initEthereum();
//     if (!result) {
//         console.log("MetaMask is not installed!");
//         return null; // Ensure function returns null if MetaMask is not installed
//     }
    
//     const { provider } = result;
    
   
    
//     const contract = new ethers.Contract(DAOGovernanceAddress, DAOGovernanceABI, provider);
//     console.log("DAO Governance Contract:", contract);
    
//     return contract;
// };