'use client';

import { useParams, usePathname } from 'next/navigation';
import { useLinkWithLocale } from '@/hooks/useLinkWithLocale';
import { LocalizedLink } from '@/components/commons/LocalizedLink';
import LanguageSwitcher from '@/components/layout/Header/LangSwitcher/LangSwitcher';
import styles from './Header.module.scss';
import UserInterface from '@/types/UserInterface';
import Profile from './Profile/Profile';
import { useState } from 'react';

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const params = useParams();
  const lng = params.lng as string;
  const { getLocalizedHref } = useLinkWithLocale();

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.Header}>      
      <div className={`${styles.menuOverlay} ${menuOpen ? styles['menuOverlay--open'] : ''}`} />

      <span
        dangerouslySetInnerHTML={{ __html: '&#9776;' }}
        className={styles.burger}
        onClick={toggleMenu}
      />
      
      <nav className={`${styles.menu} ${menuOpen ? styles['menu--open'] : ''}`}>
        <div className={styles.close} onClick={toggleMenu}>&times;</div>
        <LocalizedLink
          href="/"
          className={pathname === getLocalizedHref('') ? styles.linkActive : ''}
          onClick={toggleMenu}
        >
          {home}
        </LocalizedLink>
        <LocalizedLink
          href="/about"
          className={pathname.includes('/about') ? styles.linkActive : ''}
          onClick={toggleMenu}
        >
          {about}
        </LocalizedLink>
        <LanguageSwitcher lng={lng} onSelect={toggleMenu} />
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
