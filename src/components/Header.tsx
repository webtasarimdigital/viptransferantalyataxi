'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Header({ phone, phone2 }: { phone: string, phone2?: string }) {
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();

  const locales = [
    { code: 'tr', flag: '/turkey.svg', label: 'TR' },
    { code: 'en', flag: '/england.svg', label: 'EN' },
    { code: 'de', flag: '/germanyc.svg', label: 'DE' },
    { code: 'ru', flag: '/flag-of-russia.svg', label: 'RU' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-black/85 border-b border-gold/15 shadow-lg">
      {/* Mobile-Only Top Info Bar */}
      <div className="bg-zinc-950/90 border-b border-zinc-900 py-2 md:hidden">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Phone Link */}
          <div className="flex flex-col gap-0.5">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-white font-bold text-xs tracking-wide hover:text-gold transition-colors">
              <Phone size={14} className="text-gold fill-gold" />
              <span>{phone}</span>
            </a>
            {phone2 && (
              <a href={`tel:${phone2}`} className="flex items-center gap-2 text-white font-bold text-xs tracking-wide hover:text-gold transition-colors">
                <Phone size={14} className="text-gold fill-gold" />
                <span>{phone2}</span>
              </a>
            )}
          </div>
          
          {/* Language Selector (Flags) */}
          <div className="flex items-center gap-2.5">
            {locales.map((l) => (
              <Link 
                key={l.code} 
                href={pathname} 
                locale={l.code as any}
                prefetch={true}
                className={`transition-transform hover:scale-110 ${currentLocale !== l.code ? 'opacity-40 hover:opacity-100' : 'scale-110 ring-1 ring-gold shadow-[0_0_8px_rgba(212,175,55,0.4)] rounded-sm'}`}
                title={l.label}
              >
                <img src={l.flag} alt={l.label} className="w-5.5 h-3.5 object-cover rounded-sm" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          
          {/* Logo (Bigger!) */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-white tracking-wider leading-tight">
              <span className="text-gold">VIP</span> TRANSFER<br/>
              <span className="text-sm md:text-base font-medium text-gray-300">ANTALYA TAKSİ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('home')}</Link>
            <Link href="/hakkimizda" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('about')}</Link>
            <Link href="/rezervasyon" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('reservation')}</Link>
            <Link href="/galeri" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('gallery')}</Link>
            <Link href="/iletisim" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('contact')}</Link>
          </nav>

          {/* Desktop Phone & Language (Visible only on desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end gap-1">
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors text-sm">
                <Phone size={16} />
                <span>{phone}</span>
              </a>
              {phone2 && (
                <a href={`tel:${phone2}`} className="flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors text-sm">
                  <Phone size={16} />
                  <span>{phone2}</span>
                </a>
              )}
            </div>
            
            {/* Lang Switcher (Flags) */}
            <div className="flex items-center gap-3 border-l border-gray-700 pl-6">
              {locales.map((l) => (
                <Link 
                  key={l.code} 
                  href={pathname} 
                  locale={l.code as any}
                  prefetch={true}
                  className={`transition-transform hover:scale-110 ${currentLocale !== l.code ? 'opacity-50 hover:opacity-100' : 'scale-110 shadow-[0_0_10px_rgba(212,175,55,0.5)] rounded-sm'}`}
                  title={l.label}
                >
                  <img src={l.flag} alt={l.label} className="w-6 h-4 object-cover rounded-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-200 hover:text-gold border border-zinc-800 p-2 rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-gold/20 py-5 backdrop-blur-md">
          <div className="container mx-auto px-4 flex flex-col gap-4.5">
            <Link href="/" className="text-base font-semibold text-gray-200 hover:text-gold border-b border-zinc-900 pb-2" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link href="/hakkimizda" className="text-base font-semibold text-gray-200 hover:text-gold border-b border-zinc-900 pb-2" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <Link href="/rezervasyon" className="text-base font-semibold text-gray-200 hover:text-gold border-b border-zinc-900 pb-2" onClick={() => setIsMenuOpen(false)}>{t('reservation')}</Link>
            <Link href="/galeri" className="text-base font-semibold text-gray-200 hover:text-gold border-b border-zinc-900 pb-2" onClick={() => setIsMenuOpen(false)}>{t('gallery')}</Link>
            <Link href="/iletisim" className="text-base font-semibold text-gray-200 hover:text-gold pb-2" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
