import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en', 'de', 'ru'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/hakkimizda': {
      tr: '/hakkimizda',
      en: '/about-us',
      de: '/uber-uns',
      ru: '/o-nas'
    },
    '/galeri': {
      tr: '/galeri',
      en: '/gallery',
      de: '/galerie',
      ru: '/galereya'
    },
    '/iletisim': {
      tr: '/iletisim',
      en: '/contact',
      de: '/kontakt',
      ru: '/kontakty'
    },
    '/rezervasyon': {
      tr: '/rezervasyon',
      en: '/booking',
      de: '/buchung',
      ru: '/bronirovanie'
    },
    '/rezervasyon/step-2': {
      tr: '/rezervasyon/step-2',
      en: '/booking/step-2',
      de: '/buchung/step-2',
      ru: '/bronirovanie/step-2'
    }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
