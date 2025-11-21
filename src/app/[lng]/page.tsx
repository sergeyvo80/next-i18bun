import { initTranslations } from '@/i18n/server'
import { Metadata } from 'next/types';


interface PageProps {
  params: Promise<{ lng: string; }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return {
    title: t('home'),
  };
};

const HomePage = async ({ params }: PageProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('welcome')}</p>
      <p>{t('description')}</p>
    </div>
  );
};

export default HomePage;
