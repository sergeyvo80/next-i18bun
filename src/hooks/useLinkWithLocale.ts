'use client'

import { useParams } from 'next/navigation'

export function useLinkWithLocale() {
  const params = useParams()
  const currentLng = params.lng as string

  const getLocalizedHref = (href: string): string => {
    // Если ссылка уже содержит язык, возвращаем как есть
    if (href.startsWith(`/${currentLng}/`) || href === `/${currentLng}`) {
      return href
    }

    // Если это абсолютный URL, возвращаем без изменений
    if (href.startsWith('http') || href.startsWith('//')) {
      return href
    }

    // Добавляем префикс языка
    return `/${currentLng}${href.startsWith('/') ? href : href ? `/${href}`: ''}`
  }

  return { getLocalizedHref, currentLng }
}