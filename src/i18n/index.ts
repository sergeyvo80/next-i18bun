import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const initializeI18n = async () => {
  await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru'],
      defaultNS: 'common',
      fallbackNS: 'common',
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        excludeCacheFor: ['cimode'],
      },

      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: false,
      },
    });

  return i18next;
};

export const createInstance = () => initializeI18n();
export default i18next;
