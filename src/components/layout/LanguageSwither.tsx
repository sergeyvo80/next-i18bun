'use client'

import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/i18n/settings';

interface LanguageSwitcherProps {
  lng: string;
}

const LanguageSwitcher = ({ lng }: LanguageSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLng: string) => {
    const newPathname = pathname.replace(`/${lng}`, `/${newLng}`)
    router.push(newPathname)
  }

  return (
    <select 
      value={lng}
      onChange={(e) => switchLanguage(e.target.value)}
    >
      {languages.map((lng) => (
        <option key={lng} value={lng}>
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  )
}

export default LanguageSwitcher;
