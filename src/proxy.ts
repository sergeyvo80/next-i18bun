import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/jwt';

const locales = ['en', 'ru'];
const defaultLocale = 'en';
const COOKIE_NAME = 'preferred-language';

const protectedRoutes = ['/about'];
const authRoutes = ['/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Проверяем, есть ли в пути указанный язык
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Если язык указан - сохраняем в cookie и пропускаем
  let currentLocale = '';
  if (pathnameHasLocale) {
    currentLocale = pathname.split('/')[1]
  }

  // auth
  const accessToken = request.cookies.get('accessToken')?.value;

  if (protectedRoutes.some(route => pathname.startsWith(`/${currentLocale}${route}`))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Перенаправление аутентифицированных пользователей с auth routes
  if (authRoutes.includes(pathname.replace(`/${currentLocale}`, '')) && accessToken) {
    const decoded = verifyAccessToken(accessToken);
    if (decoded) {
      return NextResponse.redirect(new URL('/about', request.url));
    }
  }


  // language detection
  // Пропускаем статические файлы и API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }


  // Если язык указан - сохраняем в cookie и пропускаем
  if (pathnameHasLocale) {
    const currentLocale = pathname.split('/')[1]
    
    // Создаем response
    const response = NextResponse.next()
    
    // Сохраняем выбранный язык в cookie (на 1 год)
    response.cookies.set(COOKIE_NAME, currentLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 год
      path: '/',
    });
    
    return response;
  }

  // Получаем предпочтительный язык из cookie
  const preferredLanguage = request.cookies.get(COOKIE_NAME)?.value
  
  // Проверяем валидность языка из cookie
  const targetLocale = preferredLanguage && locales.includes(preferredLanguage) 
    ? preferredLanguage 
    : defaultLocale

  // Редирект на предпочтительный язык
  const url = new URL(`/${targetLocale}${pathname}`, request.url);
  return NextResponse.redirect(url);

}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

