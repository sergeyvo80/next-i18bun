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
    title: t('login'),
  };
};

const AboutPage = async ({ params }: PageProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return (
    <div>
      <h1>{t('login')}</h1>
      <p>
        admin@example.com / admin123
      </p>
      <LoginForm />
    </div>
  );
};

export default AboutPage;

