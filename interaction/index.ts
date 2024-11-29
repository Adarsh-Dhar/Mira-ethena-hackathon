const { ethers } = require('ethers');

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
  

  async function connectContract() {
    // Replace with your Ethereum provider (e.g., MetaMask, Infura)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi, signer);
}

// Function to lend
async function lend() {
    try {
        const contract = await connectContract();
        const tx = await contract.lend();
        console.log('Lend Transaction:', tx);
        const receipt = await tx.wait();
        console.log('Lend Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Lend Error:', error);
    }
}

// Function to borrow
async function borrow(amount : number) {
    try {
        const contract = await connectContract();
        const tx = await contract.borrow(amount);
        console.log('Borrow Transaction:', tx);
        const receipt = await tx.wait();
        console.log('Borrow Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Borrow Error:', error);
    }
}

// Function to repay
async function repay(amount : number) {
    try {
        const contract = await connectContract();
        const tx = await contract.Repay(amount);
        console.log('Repay Transaction:', tx);
        const receipt = await tx.wait();
        console.log('Repay Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Repay Error:', error);
    }
}

// Function to get borrower details
async function getBorrowerDetails(borrowerAddress : string) {
    try {
        const contract = await connectContract();
        const borrowDetails = await contract.borrows(borrowerAddress);
        console.log('Borrower Details:', {
            borrowerAddress: borrowDetails.borrowerAddress,
            borrowAmount: borrowDetails.borrowAmount.toString(),
            collateral: borrowDetails.collateral.toString()
        });
        return borrowDetails;
    } catch (error) {
        console.error('Get Borrower Details Error:', error);
    }
}

// Function to get lender details
async function getLenderDetails(lenderAddress : string) {
    try {
        const contract = await connectContract();
        const lendDetails = await contract.lends(lenderAddress);
        console.log('Lender Details:', {
            lenderAddress: lendDetails.lenderAddress,
            lendedAmount: lendDetails.lendedAmount.toString(),
            lendTime: lendDetails.lendTime.toString()
        });
        return lendDetails;
    } catch (error) {
        console.error('Get Lender Details Error:', error);
    }
}

// Function to get total waiting pool ETH
async function getTotalWaitingPoolETH() {
    try {
        const contract = await connectContract();
        const totalETH = await contract.totalWaitingPoolETH();
        console.log('Total Waiting Pool ETH:', totalETH.toString());
        return totalETH;
    } catch (error) {
        console.error('Get Total Waiting Pool ETH Error:', error);
    }
}

// Function to get total liquidity pool SUSDe
async function getTotalLiquidityPoolSUSDe() {
    try {
        const contract = await connectContract();
        const totalSUSDe = await contract.totalLiquidityPoolSUSDe();
        console.log('Total Liquidity Pool SUSDe:', totalSUSDe.toString());
        return totalSUSDe;
    } catch (error) {
        console.error('Get Total Liquidity Pool SUSDe Error:', error);
    }
}

// Function to exchange WP tokens for LP tokens
async function getLPTokensFromWPTokens(amount : number) {
    try {
        const contract = await connectContract();
        const tx = await contract.getLPTokensFromWPTokens(amount);
        console.log('Get LP Tokens From WP Tokens Transaction:', tx);
        const receipt = await tx.wait();
        console.log('Get LP Tokens Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Get LP Tokens Error:', error);
    }
}

// Function to get ETH from WP tokens
async function getEthFromWPTokens(amount : number) {
    try {
        const contract = await connectContract();
        const tx = await contract.getEthFromWPTokens(amount);
        console.log('Get ETH From WP Tokens Transaction:', tx);
        const receipt = await tx.wait();
        console.log('Get ETH Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Get ETH Error:', error);
    }
}

// Export functions for use in other modules
module.exports = {
    lend,
    borrow,
    repay,
    getBorrowerDetails,
    getLenderDetails,
    getTotalWaitingPoolETH,
    getTotalLiquidityPoolSUSDe,
    getLPTokensFromWPTokens,
    getEthFromWPTokens
};