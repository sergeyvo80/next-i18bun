'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwither';
import { useParams } from 'next/navigation';

interface ClientPageProps {
  locale: string;
}

const ClientPage = ({ locale }: ClientPageProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const lng = params.lng as string;

  const switchLanguage = useCallback(async (lng: string) => {
console.log('>>>>', lng);
    await i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    document.cookie = `locale=${lng}; path=/; max-age=31536000`;
console.log('>>>> refre', lng);
    router.refresh();
console.log('>>>>');
  }, [i18n, router]);

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      // i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      
      <div style={{ margin: '2rem 0' }}>
        <p><strong>{t('current_language')}:</strong> {i18n.language}</p>



      <LanguageSwitcher currentLanguage={locale} />
      

        <div style={{ gap: '1rem', display: 'flex', marginTop: '1rem' }}>
          <button 
            onClick={() => switchLanguage('en')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: i18n.language === 'en' ? '#0070f3' : '#f0f0f0',
              color: i18n.language === 'en' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            English
          </button>
          
          <button 
            onClick={() => switchLanguage('ru')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: i18n.language === 'ru' ? '#0070f3' : '#f0f0f0',
              color: i18n.language === 'ru' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Русский
          </button>
        </div>
      </div>

      <nav style={{ marginTop: '2rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
          <li>
            <a href={`/${i18n.language}`} style={{ textDecoration: 'none', color: '#0070f3' }}>
              {t('home')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/about`} style={{ textDecoration: 'none', color: '#0070f3' }}>
              {t('about')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/contact`} style={{ textDecoration: 'none', color: '#0070f3' }}>
              {t('contact')}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ClientPage;
