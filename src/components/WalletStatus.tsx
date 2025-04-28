
import { Button } from "@/components/ui/button";
import { useBlockchain } from "@/context/BlockchainContext";
import { Wallet } from "lucide-react";

export const WalletStatus = () => {
  const { web3State, connectWallet, connecting, isReady } = useBlockchain();

  if (!isReady) {
    return null;
  }

  if (web3State.isConnected) {
    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-blue-50 px-3 py-1 rounded-full border border-gray-200">
        <Wallet className="w-4 h-4 text-green-500" />
        <span className="text-xs font-medium hidden md:inline">
          {web3State.address?.substring(0, 6)}...{web3State.address?.substring(38)}
        </span>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={connectWallet}
      disabled={connecting}
      className="text-xs flex items-center space-x-1"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden md:inline">Connect Wallet</span>
    </Button>
  );
};

export default WalletStatus;
