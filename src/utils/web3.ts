
import { toast } from "@/hooks/use-toast";

export interface Web3State {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
}

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.ethereum;
};

// Connect to MetaMask
export const connectMetaMask = async (): Promise<Web3State> => {
  if (!isMetaMaskInstalled()) {
    toast({
      title: "MetaMask not installed",
      description: "Please install MetaMask to connect your wallet",
      variant: "destructive",
    });
    return { isConnected: false, address: null, chainId: null };
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (accounts.length > 0) {
      return {
        isConnected: true,
        address: accounts[0],
        chainId,
      };
    } else {
      return { isConnected: false, address: null, chainId: null };
    }
  } catch (error) {
    console.error('Error connecting to MetaMask', error);
    toast({
      title: "Connection Error",
      description: "Could not connect to MetaMask",
      variant: "destructive",
    });
    return { isConnected: false, address: null, chainId: null };
  }
};

// Simulate sending a transaction to a smart contract
export const simulateTransaction = async (
  data: any, 
  onSuccess?: () => void,
  onError?: () => void
): Promise<boolean> => {
  if (!isMetaMaskInstalled() || !window.ethereum.selectedAddress) {
    toast({
      title: "Wallet not connected",
      description: "Please connect your wallet first",
      variant: "destructive",
    });
    return false;
  }

  try {
    toast({
      title: "Transaction Processing",
      description: "Please approve the transaction in MetaMask",
    });
    
    // Simulate MetaMask transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success with 90% probability
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      toast({
        title: "Transaction Successful",
        description: "Your vote has been recorded on the blockchain",
      });
      onSuccess?.();
      return true;
    } else {
      toast({
        title: "Transaction Failed",
        description: "The transaction was rejected",
        variant: "destructive",
      });
      onError?.();
      return false;
    }
  } catch (error) {
    console.error('Transaction error:', error);
    toast({
      title: "Transaction Error",
      description: "An error occurred during the transaction",
      variant: "destructive",
    });
    onError?.();
    return false;
  }
};

// Add TypeScript global window interface
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (args: { method: string; params?: any[] }) => Promise<any>;
      selectedAddress?: string;
      on?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
