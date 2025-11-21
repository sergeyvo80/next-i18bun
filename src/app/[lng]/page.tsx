import { initTranslations } from '@/i18n/server'


interface PageProps {
  params: Promise<{ lng: string; }>;
}

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
