
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { connectMetaMask, Web3State, isMetaMaskInstalled } from '@/utils/web3';
import { ZKProof, generateProof } from '@/utils/zkProof';
import { useToast } from '@/hooks/use-toast';

interface BlockchainContextType {
  web3State: Web3State;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  generateVoteProof: (voterId: string, candidateId: string) => ZKProof | null;
  isReady: boolean;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    address: null,
    chainId: null,
  });
  const [connecting, setConnecting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  // Check if MetaMask is available on component mount
  useEffect(() => {
    const checkMetaMask = async () => {
      if (isMetaMaskInstalled()) {
        // Check if already connected
        try {
          const accounts = await window.ethereum?.request?.({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            const chainId = await window.ethereum?.request?.({ method: 'eth_chainId' });
            setWeb3State({
              isConnected: true,
              address: accounts[0],
              chainId,
            });
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error);
        }
        
        // Listen for account changes
        window.ethereum?.on?.('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            setWeb3State({ isConnected: false, address: null, chainId: null });
            toast({
              title: "Disconnected",
              description: "Wallet has been disconnected",
            });
          } else {
            setWeb3State(prev => ({ ...prev, isConnected: true, address: accounts[0] }));
            toast({
              title: "Account Changed",
              description: "Connected to " + accounts[0].substring(0, 6) + "..." + accounts[0].substring(38),
            });
          }
        });
        
        // Listen for chain changes
        window.ethereum?.on?.('chainChanged', (chainId: string) => {
          setWeb3State(prev => ({ ...prev, chainId }));
          toast({
            title: "Network Changed",
            description: "Connected to a different blockchain network",
          });
        });
      }
      
      setIsReady(true);
    };
    
    checkMetaMask();
  }, []);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      const state = await connectMetaMask();
      setWeb3State(state);
      if (state.isConnected) {
        toast({
          title: "Connected",
          description: "Wallet connected successfully",
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const generateVoteProof = (voterId: string, candidateId: string): ZKProof | null => {
    if (!web3State.isConnected) return null;
    
    return generateProof({
      voterId,
      candidateId,
      timestamp: Date.now(),
    });
  };

  return (
    <BlockchainContext.Provider value={{
      web3State,
      connecting,
      connectWallet,
      generateVoteProof,
      isReady,
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};
