'use client';

import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from '@/i18n';

interface TranslationProviderProps {
  children: ReactNode;
  lng: string;
}

const TranslationProvider = ({ children, lng }: TranslationProviderProps) => {
  const [instance, setInstance] = useState<any>(null);

  useEffect(() => {
    const initI18n = async () => {
      const i18nInstance = await createInstance();
      if (lng && i18nInstance.language !== lng) {
        await i18nInstance.changeLanguage(lng);
      }
      
      setInstance(i18nInstance);
    };

    initI18n();
  }, [lng]);

  // if (!instance) {
  //   return <div>Loading...</div>;
  // }

  return (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  );
};

export default TranslationProvider;
