
import { createContext, useState, useContext, ReactNode } from 'react';

// Mock voter database with 10 voters for simulation
const MOCK_VOTERS = [
  { id: '1234567890', password: 'password1', hasVoted: false, name: 'Alisher Usmanov' },
  { id: '2345678901', password: 'password2', hasVoted: false, name: 'Malika Karimova' },
  { id: '3456789012', password: 'password3', hasVoted: false, name: 'Jasur Irgashev' },
  { id: '4567890123', password: 'password4', hasVoted: false, name: 'Nilufar Rahimova' },
  { id: '5678901234', password: 'password5', hasVoted: false, name: 'Temur Malik' },
  { id: '6789012345', password: 'password6', hasVoted: false, name: 'Ozoda Saidova' },
  { id: '7890123456', password: 'password7', hasVoted: false, name: 'Sardor Azizov' },
  { id: '8901234567', password: 'password8', hasVoted: false, name: 'Dilnoza Yusupova' },
  { id: '9012345678', password: 'password9', hasVoted: false, name: 'Bobur Alimov' },
  { id: '0123456789', password: 'password0', hasVoted: false, name: 'Gulnora Karimova' }
];

interface Voter {
  id: string;
  name: string;
  hasVoted: boolean;
}

interface AuthContextType {
  currentVoter: Voter | null;
  isLoggedIn: boolean;
  login: (id: string, password: string) => Promise<boolean>;
  logout: () => void;
  setVoted: () => void;
  resetAllVotes: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [voters, setVoters] = useState(MOCK_VOTERS);
  const [currentVoter, setCurrentVoter] = useState<Voter | null>(null);

  const login = async (id: string, password: string): Promise<boolean> => {
    const voter = voters.find(v => v.id === id && v.password === password);
    
    if (voter) {
      const { password: _, ...voterData } = voter;
      setCurrentVoter(voterData as Voter);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentVoter(null);
  };

  const setVoted = () => {
    if (currentVoter) {
      setVoters(prevVoters => 
        prevVoters.map(v => 
          v.id === currentVoter.id ? { ...v, hasVoted: true } : v
        )
      );
      setCurrentVoter({ ...currentVoter, hasVoted: true });
    }
  };

  const resetAllVotes = () => {
    setVoters(MOCK_VOTERS);
    if (currentVoter) {
      setCurrentVoter({ ...currentVoter, hasVoted: false });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentVoter, 
      isLoggedIn: !!currentVoter,
      login,
      logout,
      setVoted,
      resetAllVotes
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
