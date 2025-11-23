import { ReactNode } from 'react';
import { cookies } from 'next/headers';
// import TranslationProvider from '@/providers/TranslationProvider';
import { initTranslations } from '@/i18n/server';
import Main  from '@/components/layout/Main/Main';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { verifyAccessToken } from '@/lib/jwt';
import '@/styles/globals.scss';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ lng: string; }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng);
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  const userFromServer = verifyAccessToken(accessToken);

  return (
    <html lang={lng}>
      <body>
        {/* <TranslationProvider lng={lng}> */}
          <Header
            home={t('home.title')}
            about={t('about.title')}
            login={t('login.title')}
            logout={t('logout')}
            userFromServer={userFromServer}
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
