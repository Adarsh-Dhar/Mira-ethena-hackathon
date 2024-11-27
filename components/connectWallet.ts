import { ethers } from 'ethers';

// Define the structure for wallet connection state
export interface WalletConnectionState {
  address: string | null;
  isConnected: boolean;
  balance: string | null;
  chainId: number | null;
  error: string | null;
}

// Initial state for wallet connection
const initialState: WalletConnectionState = {
  address: null,
  isConnected: false,
  balance: null,
  chainId: null,
  error: null
};


export async function connectWallet(): Promise<WalletConnectionState> {
  // Reset state
  const state: WalletConnectionState = { ...initialState };

  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      state.error = 'MetaMask is not installed';
      return state;
    }

    // Request account access
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    }) as string[];

    // Check if accounts are available
    if (!accounts || accounts.length === 0) {
      state.error = 'No accounts found';
      return state;
    }

    // Create provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Get signer
    const signer = provider.getSigner();
    
    // Get address
    const address = (await signer).getAddress;
    
    // Get balance
    //@ts-ignore
    const balance = await provider.getBalance(address);
    
    // Get chain ID
    const network = await provider.getNetwork();

    // Update state
    //@ts-ignore
    state.address = address;
    state.isConnected = true;
    //@ts-ignore
    state.balance = ethers.utils.formatEther(balance); // Convert to ETH
    //@ts-ignore
    state.chainId = network.chainId;

    return state;

  } catch (error: any) {
    // Handle specific MetaMask errors
    if (error.code === 4001) {
      state.error = 'User rejected the request';
    } else if (error.code === -32002) {
      state.error = 'Request already pending. Please open MetaMask.';
    } else {
      state.error = error.message || 'Failed to connect wallet';
    }

    return state;
  }
}

/**
 * Disconnects the current wallet
 * @returns WalletConnectionState
 */
export function disconnectWallet(): WalletConnectionState {
  return { ...initialState };
}

/**
 * Checks if MetaMask is installed
 * @returns boolean
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window.ethereum !== 'undefined';
}

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string, params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    }
  }
}