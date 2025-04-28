
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import uzTranslations from './locales/uz.json';
import ruTranslations from './locales/ru.json';
import enTranslations from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        translation: uzTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: 'uz', // Default language (Uzbek)
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
