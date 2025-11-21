import { initTranslations } from '@/i18n/server'


interface PageProps {
  params: Promise<{ lng: string; }>;
}

const AboutPage = async ({ params }: PageProps) => {
  const { lng } = await params;
  const { t } = await initTranslations(lng)

  return (
    <div>
      <h1>{t('about')}</h1>

    </div>
  );
};

export default AboutPage;
