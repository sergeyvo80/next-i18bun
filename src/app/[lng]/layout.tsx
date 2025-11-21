import { ReactNode } from 'react';
// import TranslationProvider from '@/providers/TranslationProvider';
import { initTranslations } from '@/i18n/server';
import Main  from '@/components/layout/Main/Main';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import '@/styles/globals.scss';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ lng: string; }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng);

  return (
    <html lang={lng}>
      <body>
        {/* <TranslationProvider lng={lng}> */}
          <Header
            home={t('home')}
            about={t('about')}
            login={t('login')}
            logout={t('logout')}
          />
          <Main>
            {children}
          </Main>
          <Footer />
        {/* </TranslationProvider> */}
      </body>
    </html>
  );
};

export default LocaleLayout;
