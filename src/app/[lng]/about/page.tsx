import { initTranslations } from '@/i18n/server'
import { Metadata } from 'next/types';

interface PageProps {
  params: Promise<{ lng: string; }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return {
    title: t('about'),
  };
};

const AboutPage = async ({ params }: PageProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return (
    <div>
      <h1>{t('about')}</h1>
      <p>{t('about_p1')}</p>
      <p>{t('about_p2')}</p>
      <p>{t('about_p3')}</p>
    </div>
  );
};

export default AboutPage;
