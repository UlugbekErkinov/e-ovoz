
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { useVoting } from "@/context/VotingContext";

const ResultsPage = () => {
  const { t } = useTranslation();
  const { candidates, totalVotes, lastUpdated } = useVoting();
  
  // Sort candidates by votes (highest first)
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          {t('results.title')}
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-xl">
            {t('results.totalVotes')}: <span className="font-bold">{totalVotes}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {t('results.lastUpdated')}: {formatDate(lastUpdated)}
          </p>
        </div>
        
        <div className="space-y-6 mt-10">
          {sortedCandidates.map((candidate, index) => {
            const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
            
            return (
              <Card key={candidate.id} className={index === 0 ? "border-2 border-green-400" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-xl">
                      {candidate.name}
                      {index === 0 && (
                        <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Leading
                        </span>
                      )}
                    </CardTitle>
                    <div className="text-lg font-bold">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-600">{candidate.party}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage} className="h-3" />
                      <span className="text-sm font-medium">{candidate.votes} votes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block px-4 py-3 bg-blue-50 text-blue-700 rounded-md">
            <p className="font-medium">Distributed ledger technology</p>
            <p className="text-sm">All votes are securely stored on a decentralized network</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultsPage;
