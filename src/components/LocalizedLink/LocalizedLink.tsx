'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

interface LocalizedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const LocalizedLink = ({ href, children, className, onClick }: LocalizedLinkProps) => {
  const params = useParams()
  const currentLng = params.lng as string

  const getLocalizedHref = (path: string): string => {
    if (path.startsWith(`/${currentLng}/`) || path === `/${currentLng}`) {
      return path
    }
    if (path.startsWith('http') || path.startsWith('//') || path.startsWith('#')) {
      return path
    }
    return `/${currentLng}${path.startsWith('/') ? path : `/${path}`}`
  }

  return (
    <Link 
      href={getLocalizedHref(href)} 
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export { LocalizedLink };
