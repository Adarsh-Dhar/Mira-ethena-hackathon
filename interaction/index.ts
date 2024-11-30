const { ethers } = require('ethers');

const address = "0xa368353FBBe6f5d5574735B24760FBD0910ffe5D"
const usde_address = "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696"

const abi = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_wpTokenAddress", "type": "address", "internalType": "address" },
        { "name": "_lpTokenAddress", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "Repay",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "borrow",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "borrows",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "borrowerAddress", "type": "address", "internalType": "address" },
        { "name": "borrowAmount", "type": "uint256", "internalType": "uint256" },
        { "name": "collateral", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getEthFromWPTokens",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getLPTokensFromWPTokens",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "lend",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "lends",
      "inputs": [
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "lenderAddress", "type": "address", "internalType": "address" },
        { "name": "lendedAmount", "type": "uint256", "internalType": "uint256" },
        { "name": "lendTime", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lpToken",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract MiraLP" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "susdeToken",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract IERC20" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalLiquidityPoolSUSDe",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalWaitingPoolETH",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "unstakeSUSDe",
      "inputs": [
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "usdeToken",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract IERC20" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "wpToken",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract MiraWP" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "LiquidityPoolUSDeDeposited",
      "inputs": [
        { "name": "depositor", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "LoanExchanged",
      "inputs": [
        { "name": "lender", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "wpTokensIn", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "lpTokensOut", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "ethTransferred", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    }
  ]
  


  const erc20_abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{ "name": "", "type": "string" }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{ "name": "", "type": "string" }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "name": "", "type": "uint8" }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{ "name": "", "type": "uint256" }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "balance", "type": "uint256" }],
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
      "name": "transfer",
      "outputs": [{ "name": "success", "type": "bool" }],
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_from", "type": "address" },
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transferFrom",
      "outputs": [{ "name": "success", "type": "bool" }],
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
      "name": "approve",
      "outputs": [{ "name": "success", "type": "bool" }],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }],
      "name": "allowance",
      "outputs": [{ "name": "remaining", "type": "uint256" }],
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "owner", "type": "address" },
        { "indexed": true, "name": "spender", "type": "address" },
        { "indexed": false, "name": "value", "type": "uint256" }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "from", "type": "address" },
        { "indexed": true, "name": "to", "type": "address" },
        { "indexed": false, "name": "value", "type": "uint256" }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ]
  

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
          const contract = new ethers.Contract(address, abi, signer);
          const usdeToken = new ethers.Contract(usde_address, erc20_abi, signer);
          return {contract,usdeToken};
  
      } else {
          console.log("MetaMask is not installed!");
          return null;
      }
  };

  export const borrow = async (amount : number) => {
    const result = await initEthereum();
    if (!result) {
        console.log("MetaMask is not installed!");
        return null; // Ensure function returns null if MetaMask is not installed
    }

    const contract = new ethers.Contract(address, abi, signer).borrow(amount);
    console.log("result of borrow", contract);
    
    return contract;
};

export const lend = async (amount : number) => {
    const result = await initEthereum();
    if (!result) {
        console.log("MetaMask is not installed!");
        return null; // Ensure function returns null if MetaMask is not installed
    }

    const contract = new ethers.Contract(address, abi, signer).lend(amount);
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