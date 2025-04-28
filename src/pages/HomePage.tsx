
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Lock, Database } from "lucide-react";

const HomePage = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {t('app.name')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {t('app.tagline')}
        </p>
        
        {isLoggedIn ? (
          <Link to="/vote">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              {t('nav.vote')}
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              {t('auth.login')}
            </Button>
          </Link>
        )}
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          {t('about.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border border-blue-100 hover:border-blue-300 transition-colors overflow-hidden group bg-gradient-to-br from-white to-blue-50">
            <div className="absolute right-0 top-0 bg-gradient-to-bl from-blue-100 to-transparent p-3 rounded-bl-xl">
              <Database className="h-6 w-6 text-blue-500" />
            </div>
            <CardHeader>
              <CardTitle>{t('about.decentralizedTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t('about.decentralizedDesc')}</p>
            </CardContent>
          </Card>
          
          <Card className="border border-green-100 hover:border-green-300 transition-colors overflow-hidden group bg-gradient-to-br from-white to-green-50">
            <div className="absolute right-0 top-0 bg-gradient-to-bl from-green-100 to-transparent p-3 rounded-bl-xl">
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </div>
            <CardHeader>
              <CardTitle>{t('about.secureTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t('about.secureDesc')}</p>
            </CardContent>
          </Card>
          
          <Card className="border border-blue-100 hover:border-blue-300 transition-colors overflow-hidden group bg-gradient-to-br from-white to-blue-50">
            <div className="absolute right-0 top-0 bg-gradient-to-bl from-blue-100 to-transparent p-3 rounded-bl-xl">
              <Lock className="h-6 w-6 text-blue-500" />
            </div>
            <CardHeader>
              <CardTitle>{t('about.transparentTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t('about.transparentDesc')}</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Blockchain Feature */}
      <section className="py-8 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">{t('vote.zkTitle')}</h3>
              <p className="mb-4 text-gray-700">
                {t('vote.zkDescription')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="rounded-full bg-green-100 p-1 mr-2">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span>{t('vote.privateVoting')}</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-green-100 p-1 mr-2">
                    <Lock className="h-4 w-4 text-green-600" />
                  </div>
                  <span>{t('vote.tamperProof')}</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-green-100 p-1 mr-2">
                    <Database className="h-4 w-4 text-green-600" />
                  </div>
                  <span>{t('vote.decentralized')}</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2592/2592004.png" 
                  alt="Blockchain Voting" 
                  className="w-48 h-48 object-contain relative z-10" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 md:py-16 text-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg mt-12 border border-gray-100 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {isLoggedIn ? t('vote.title') : t('auth.register')}
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          {t('app.description')}
        </p>
        
        {isLoggedIn ? (
          <Link to="/vote">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              {t('vote.submit')}
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              {t('auth.login')}
            </Button>
          </Link>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;
