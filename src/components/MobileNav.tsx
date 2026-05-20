'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Home, CalendarCheck, Phone, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileNav({ phone, wpPhone }: { phone: string, wpPhone?: string }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  
  // Format phone for WhatsApp link
  const waNumber = wpPhone ? wpPhone.replace(/\D/g, '') : phone.replace(/\D/g, '');

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-primary border-t border-gold/20 z-50 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        <Link href="/" className="flex flex-col items-center p-2 text-gray-400 hover:text-gold transition-colors">
          <Home size={24} className={pathname === '/' || pathname.endsWith('/tr') ? 'text-gold' : ''} />
          <span className="text-[10px] mt-1 font-medium">{t('home')}</span>
        </Link>
        
        <Link href="/rezervasyon" className="flex flex-col items-center p-2 text-gray-400 hover:text-gold transition-colors">
          <CalendarCheck size={24} className={pathname.includes('/rezervasyon') ? 'text-gold' : ''} />
          <span className="text-[10px] mt-1 font-medium">{t('reservation')}</span>
        </Link>
        
        <a href={`tel:${phone}`} className="flex flex-col items-center p-2 text-gray-400 hover:text-gold transition-colors">
          <Phone size={24} />
          <span className="text-[10px] mt-1 font-medium">Ara</span>
        </a>
        
        <a 
          href={`https://wa.me/${waNumber}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center p-2 text-green-500 hover:text-green-400 transition-colors"
        >
          <MessageCircle size={24} />
          <span className="text-[10px] mt-1 font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
