import LoginForm from '@/components/auth/Login/Login';
import { initTranslations } from '@/i18n/server';
import { Metadata } from 'next/types';


interface PageProps {
  params: Promise<{ lng: string; }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return {
    title: t('login.title'),
  };
};

const AboutPage = async ({ params }: PageProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return (
    <>
      <h1>{t('login.title')}</h1>
      <p>
        admin@example.com / admin123
      </p>
      <LoginForm
        t={{
          email: t('login.email'),
          emailRequired: t('login.emailRequired'),
          password: t('login.password'),
          passwordRequired: t('passwordRequired'),
          button: t('login.button'),
          success: t('login.success'),
          error: t('login.error'),
          error401: t('login.error401'),
          error500: t('login.error500'),
        }}
      />
    </>
  );
};

export default AboutPage;
