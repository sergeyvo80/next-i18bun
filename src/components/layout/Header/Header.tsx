'use client';

import { useParams, usePathname } from 'next/navigation';
import { useLinkWithLocale } from '@/hooks/useLinkWithLocale';
import { LocalizedLink } from '@/components/commons/LocalizedLink';
import LanguageSwitcher from '@/components/layout/LanguageSwither';
import styles from './Header.module.scss';
import UserInterface from '@/types/UserInterface';
import Profile from './Profile/Profile';

interface Props {
  home: string;
  about: string;
  login: string;
  logout: string;
  userFromServer?: UserInterface;
}

const Header = ({
  home,
  about,
  login,
  logout,
  userFromServer,
}: Props): React.ReactElement => {
  const pathname = usePathname();
  const params = useParams();
  const lng = params.lng as string;
  const { getLocalizedHref } = useLinkWithLocale();

  return (
    <header className={styles.Header}>      
      <nav className={styles.menu}>
        <LocalizedLink
          href="/"
          className={pathname === getLocalizedHref('') ? styles.linkActive : ''}
        >
          {home}
        </LocalizedLink>
        <LocalizedLink
          href="/about"
          className={pathname.includes('/about') ? styles.linkActive : ''}
        >
          {about}
        </LocalizedLink>
        <LanguageSwitcher lng={lng} />
      </nav>
      <Profile 
        login={login}
        logout={logout}
        userFromServer={userFromServer}
      />
    </header>
  );
}
export default Header;
