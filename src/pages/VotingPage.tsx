
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useVoting } from "@/context/VotingContext";
import { useBlockchain } from "@/context/BlockchainContext";
import { Wallet, ShieldCheck } from "lucide-react";

const VotingPage = () => {
  const { t } = useTranslation();
  const { currentVoter, isLoggedIn } = useAuth();
  const { candidates, castVoteWithZKProof, isProcessingVote } = useVoting();
  const { web3State, connectWallet, generateVoteProof, isReady } = useBlockchain();
  const { toast } = useToast();
  
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  if (currentVoter?.hasVoted || voted) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-8">
          <Alert className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <AlertDescription>
              {t('vote.alreadyVoted')}
            </AlertDescription>
          </Alert>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {t('vote.confirmation')}
            </h2>
            <p>
              {t('vote.success')}
            </p>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleSubmitVote = async () => {
    if (!selectedCandidate) return;
    
    if (!web3State.isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to cast your vote",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a zero-knowledge proof for the vote
    const voteProof = generateVoteProof(
      currentVoter?.id || "unknown", 
      selectedCandidate
    );
    
    if (!voteProof) {
      toast({
        title: "Error",
        description: "Failed to generate proof for your vote",
        variant: "destructive",
      });
      return;
    }
    
    // Submit the vote with ZK proof
    const success = await castVoteWithZKProof(selectedCandidate, voteProof);
    
    if (success) {
      setVoted(true);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          {t('vote.title')}
        </h1>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border border-gray-200 shadow-sm w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-lg">Zero-Knowledge Voting</h2>
                <p className="text-sm text-gray-500">Your vote remains private while being verifiable</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
        
        {/* Wallet Connection Status */}
        <div className="mb-6">
          <Card className={`transition-all ${web3State.isConnected ? 'bg-gradient-to-r from-green-50 to-blue-50' : 'bg-gradient-to-r from-gray-50 to-orange-50'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Blockchain Connection</CardTitle>
                <Wallet className={`h-5 w-5 ${web3State.isConnected ? 'text-green-500' : 'text-orange-500'}`} />
              </div>
            </CardHeader>
            <CardContent>
              {isReady ? (
                web3State.isConnected ? (
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-600">Connected Address:</p>
                    <p className="font-mono text-xs bg-white/50 p-1 rounded border">
                      {web3State.address?.substring(0, 6)}...{web3State.address?.substring(38)}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Connect your wallet to cast a verifiable vote</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={connectWallet}
                      disabled={!isReady}
                      className="ml-2 bg-white/70"
                    >
                      {t('auth.wallet')}
                    </Button>
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-600">Initializing wallet connection...</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <p className="text-lg mb-8 text-center">
          {t('vote.instruction')}
        </p>
        
        <div className="space-y-6">
          <RadioGroup value={selectedCandidate || ""} onValueChange={setSelectedCandidate}>
            {candidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCandidate === candidate.id ? 'border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={candidate.id} id={candidate.id} />
                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{candidate.party}</p>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
          
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              disabled={!selectedCandidate || isProcessingVote || !web3State.isConnected}
              onClick={handleSubmitVote}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isProcessingVote ? 
                "Processing..." : 
                web3State.isConnected ? 
                  t('vote.submit') : 
                  "Connect Wallet to Vote"
              }
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VotingPage;
