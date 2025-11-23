'use client'

import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/i18n/settings';
import Styles from './LangSwitcher.module.scss';

interface LanguageSwitcherProps {
  lng: string;
  onSelect?: () => void;
}

const LangSwitcher = ({ lng, onSelect }: LanguageSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLng = e.target.value;
    const newPathname = pathname.replace(`/${lng}`, `/${newLng}`);
    router.push(newPathname);
    if (onSelect) {
     onSelect();
    }
  }

  return (
    <select 
      className={Styles.LangSwitcher}
      value={lng}
      onChange={switchLanguage}
    >
      {languages.map((lng) => (
        <option key={lng} value={lng}>
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  )
}

export default LangSwitcher;
