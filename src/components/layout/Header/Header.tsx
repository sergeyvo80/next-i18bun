'use client';

import { useParams, usePathname } from 'next/navigation';
import { useLinkWithLocale } from '@/hooks/useLinkWithLocale';
import { LocalizedLink } from '@/components/LocalizedLink/LocalizedLink';
import LanguageSwitcher from '@/components/layout/LanguageSwither';
import styles from './Header.module.scss';

interface Props {
  home: string;
  about: string;
  login: string;
  logout: string;
}

const Header = ({
  home,
  about,
  login,
  logout,
}: Props): React.ReactElement => {
  const pathname = usePathname();
  const params = useParams();
  const lng = params.lng as string;
  const { getLocalizedHref } = useLinkWithLocale();

  return (
    <header className={styles.Header}>      
      <nav className={styles.menu}>
        <div className={pathname === getLocalizedHref('') ? styles.linkActive : ''}>
          <LocalizedLink href="/">{home}</LocalizedLink>
        </div>
        <div className={pathname.includes('/about') ? styles.linkActive : ''}>
          <LocalizedLink href="/about">{about}</LocalizedLink>
        </div>
        <div className={pathname.includes('/login') ? styles.linkActive : ''}>
          <LocalizedLink href="/login">{login}</LocalizedLink>
        </div>
        <div className={pathname.includes('/logout') ? styles.linkActive : ''}>
          <LocalizedLink href="/logout">{logout}</LocalizedLink>
        </div>
        <div>
          <LanguageSwitcher lng={lng} />
        </div>
      </nav>
    </header>
  );
}
export default Header;
