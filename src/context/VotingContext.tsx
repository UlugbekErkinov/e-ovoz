
import { createContext, useState, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { simulateTransaction } from '@/utils/web3';
import { ZKProof } from '@/utils/zkProof';

interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
}

// Mock candidate data
const INITIAL_CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'Dilshod Karimov', party: 'Liberal Democratic Party', votes: 230 },
  { id: 'c2', name: 'Nodira Azimova', party: 'People\'s Democratic Party', votes: 180 },
  { id: 'c3', name: 'Botir Rahimov', party: 'National Revival Party', votes: 150 },
  { id: 'c4', name: 'Sabina Umarova', party: 'Ecological Party', votes: 120 }
];

interface VotingContextType {
  candidates: Candidate[];
  totalVotes: number;
  castVote: (candidateId: string, proof?: ZKProof) => boolean;
  lastUpdated: Date;
  isProcessingVote: boolean;
  castVoteWithZKProof: (candidateId: string, proof: ZKProof) => Promise<boolean>;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isProcessingVote, setIsProcessingVote] = useState(false);
  const { currentVoter, setVoted } = useAuth();

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  const castVote = (candidateId: string, proof?: ZKProof): boolean => {
    if (!currentVoter || currentVoter.hasVoted) {
      return false;
    }

    setCandidates(prevCandidates => 
      prevCandidates.map(candidate => 
        candidate.id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
    
    setVoted();
    setLastUpdated(new Date());
    return true;
  };

  // New method that uses ZK proof and simulates blockchain transaction
  const castVoteWithZKProof = async (candidateId: string, proof: ZKProof): Promise<boolean> => {
    if (!currentVoter || currentVoter.hasVoted || isProcessingVote) {
      return false;
    }

    setIsProcessingVote(true);

    try {
      // Blockchain transaction simulation with the ZK proof
      const success = await simulateTransaction(
        {
          candidateId,
          proof,
          publicSignals: proof.publicSignals
        },
        () => {
          // On success callback
          setCandidates(prevCandidates => 
            prevCandidates.map(candidate => 
              candidate.id === candidateId
                ? { ...candidate, votes: candidate.votes + 1 }
                : candidate
            )
          );
          setVoted();
          setLastUpdated(new Date());
        },
        // On error callback
        () => {}
      );
      
      return success;
    } catch (error) {
      console.error('Error casting vote with ZK proof:', error);
      return false;
    } finally {
      setIsProcessingVote(false);
    }
  };

  return (
    <VotingContext.Provider value={{ 
      candidates, 
      totalVotes,
      castVote,
      lastUpdated,
      isProcessingVote,
      castVoteWithZKProof
    }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};
