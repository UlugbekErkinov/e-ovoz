
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WalletStatus from "@/components/WalletStatus";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { t } = useTranslation();
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white backdrop-blur-md bg-opacity-90 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-blue-600 font-bold text-xl">
            {t('app.name')}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              {t('nav.home')}
            </Link>
            <Link to="/vote" className="text-gray-700 hover:text-blue-600">
              {t('nav.vote')}
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-blue-600">
              {t('nav.results')}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              {t('nav.about')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <WalletStatus />
            <LanguageSwitcher />
            {isLoggedIn ? (
              <Button onClick={logout} variant="outline">
                {t('auth.logout')}
              </Button>
            ) : (
              <Link to="/login">
                <Button>{t('auth.login')}</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/vote" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.vote')}
            </Link>
            <Link 
              to="/results" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.results')}
            </Link>
            <Link 
              to="/about" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <div className="py-2 px-4">
              <WalletStatus />
            </div>
            <div className="py-2 px-4">
              <LanguageSwitcher />
            </div>
            <div className="py-2 px-4">
              {isLoggedIn ? (
                <Button onClick={logout} variant="outline" className="w-full">
                  {t('auth.logout')}
                </Button>
              ) : (
                <Link to="/login" className="block w-full" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">{t('auth.login')}</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
