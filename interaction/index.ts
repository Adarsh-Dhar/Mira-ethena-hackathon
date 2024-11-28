

const address = "0x74F3F00CB837E18A46EdFF00cCF111E81b358DBf"

const abi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_wpTokenAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_lpTokenAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_usdeTokenAddress",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "Repay",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "borrow",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "borrows",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "borrowerAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "borrowAmount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "collateral",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getEthFromWPTokens",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getLPTokensFromWPTokens",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
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
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "lenderAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "lendedAmount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "lendTime",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lpToken",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract MiraLP"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalLiquidityPoolSUSDe",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalWaitingPoolETH",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "usdeToken",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IERC20"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "wpToken",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract MiraWP"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "LiquidityPoolUSDeDeposited",
      "inputs": [
        {
          "name": "depositor",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "LoanExchanged",
      "inputs": [
        {
          "name": "lender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "wpTokensIn",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "lpTokensOut",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "ethTransferred",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    }
  ]
  