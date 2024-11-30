const { ethers } = require('ethers');
import { toast } from 'react-hot-toast'; 
const mira_address = "0xa368353FBBe6f5d5574735B24760FBD0910ffe5D"
const usde_address = "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696"

const mira_abi = [{"type":"constructor","inputs":[{"name":"_wpTokenAddress","type":"address","internalType":"address"},{"name":"_lpTokenAddress","type":"address","internalType":"address"},{"name":"_oracleAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"Repay","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"borrow","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"borrows","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"borrowerAddress","type":"address","internalType":"address"},{"name":"borrowAmount","type":"uint256","internalType":"uint256"},{"name":"collateral","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getBorrow","inputs":[{"name":"_address","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getEthFromWPTokens","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"getLPTokensFromWPTokens","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"lend","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"lends","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"lenderAddress","type":"address","internalType":"address"},{"name":"lendedAmount","type":"uint256","internalType":"uint256"},{"name":"lendTime","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"lpToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract MiraLP"}],"stateMutability":"view"},{"type":"function","name":"oracle","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract OracleMira"}],"stateMutability":"view"},{"type":"function","name":"susdeToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IERC20"}],"stateMutability":"view"},{"type":"function","name":"totalLiquidityPoolSUSDe","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"totalWaitingPoolETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"unstakeSUSDe","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usdeToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IERC20"}],"stateMutability":"view"},{"type":"function","name":"wpToken","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract MiraWP"}],"stateMutability":"view"},{"type":"event","name":"BorrowIncreased","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"newBorrowAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"additionalCollateral","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"BorrowRepaid","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"repaidAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"remainingBorrow","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"LiquidityPoolUSDeDeposited","inputs":[{"name":"depositor","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"LoanExchanged","inputs":[{"name":"lender","type":"address","indexed":true,"internalType":"address"},{"name":"wpTokensIn","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"lpTokensOut","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"ethTransferred","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"USDUnstaked","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}]
  

const usde_abi = [
    // Get balance of an address
    "function balanceOf(address account) view returns (uint256)",

    // Transfer tokens to another address
    "function transfer(address to, uint256 amount) returns (bool)",

    // Get the total supply of the token
    "function totalSupply() view returns (uint256)",

    // Get the token name
    "function name() view returns (string)",

    // Get the token symbol
    "function symbol() view returns (string)",

    // Get the number of decimals used for the token
    "function decimals() view returns (uint8)",

    // Approve an address to spend a specific amount of tokens
    "function approve(address spender, uint256 amount) returns (bool)",

    // Get the allowance for a spender on behalf of an owner
    "function allowance(address owner, address spender) view returns (uint256)"
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
  ) => {
    try {
      // Create contract instances
      //@ts-ignore
      const {miraContract,usdeContract} = await initEthereum();

      console.log("usdeContract", usdeContract);
      console.log("miraContract", miraContract);
  
      // Convert amounts to BigNumber
    //   const borrowAmount = ethers.parseUnits(amount.toString(), 18);

    //   console.log("borrow amount", borrowAmount)

  
      // Approve USDe token transfer
      const approveTx = await usdeContract.approve(
        mira_address, 
        10
      );

       console.log("approveTx", approveTx);
      await approveTx.wait();   
      // Perform borrow transaction
      const borrowTx = await miraContract.borrow(10000000000000);
      console.log("borrowTx", borrowTx);
      // Wait for transaction confirmation
      const receipt = await borrowTx.wait();
  
      // Success notification
      toast.success(`Borrow successful! Transaction Hash: ${receipt.transactionHash}`);
      console.log(`Borrow successful! Transaction Hash: ${receipt}`);


  
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

export const transfer_erc20 = async () => {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        console.log(`signer : ${signer}`)
        console.log(`provider : ${provider}`)
        const miraContract = new ethers.Contract(mira_address, mira_abi, signer);
        const usdeContract = new ethers.Contract(usde_address, usde_abi, signer);
        const usdeBalance  = await usdeContract.balanceOf("0xCC185176e548114804DB873D22342977C0aA82Df");
        console.log(usdeBalance)
        return usdeBalance

    } else {
        console.log("MetaMask is not installed!");
        return null;
    }
}




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