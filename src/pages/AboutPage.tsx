
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t('about.title')}
        </h1>
        
        {/* About the system */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {t('app.name')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('app.description')}
          </p>
          <p className="text-gray-700">
            {t('about.mission')}
          </p>
        </section>
        
        {/* Key features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {t('about.keyFeaturesTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('about.decentralizedTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('about.decentralizedDesc')}</p>
                <p className="mt-2">
                  {t('about.decentralizedDesc2')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('about.secureTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('about.secureDesc')}</p>
                <p className="mt-2">
                  {t('about.secureDesc2')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('about.transparentTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('about.transparentDesc')}</p>
                <p className="mt-2">
                  {t('about.transparentDesc2')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            How It Works
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Voter Registration</h3>
                <p className="text-gray-700">
                  Citizens register using their official ID documents. The system verifies eligibility while ensuring data privacy.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Secure Authentication</h3>
                <p className="text-gray-700">
                  Voters authenticate using multi-factor authentication to ensure only eligible voters can access the system.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Vote Casting</h3>
                <p className="text-gray-700">
                  Voters make their selection securely. The system ensures one vote per eligible voter.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                4
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Decentralized Recording</h3>
                <p className="text-gray-700">
                  Votes are encrypted and stored across a distributed network, making tampering practically impossible.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                5
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Real-time Results</h3>
                <p className="text-gray-700">
                  Results are tabulated in real-time while maintaining the anonymity of individual voters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
