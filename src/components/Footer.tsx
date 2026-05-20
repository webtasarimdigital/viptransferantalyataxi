import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ phone, phone2, email }: { phone: string, phone2?: string, email: string }) {
  const tNav = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');
  
  return (
    <footer className="bg-primary border-t border-gold/20 pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              {/* Temporarily using text since we don't have the new logo yet */}
              <span className="text-2xl font-bold text-white tracking-wider">
                <span className="text-gold">VIP</span> TRANSFER<br/>ANTALYA TAKSI
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              {tFooter('desc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-gray-300 hover:bg-gold hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-gray-300 hover:bg-gold hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">{tFooter('menuTitle')}</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-gold transition-colors">{tNav('home')}</Link></li>
              <li><Link href="/hakkimizda" className="text-gray-400 hover:text-gold transition-colors">{tNav('about')}</Link></li>
              <li><Link href="/rezervasyon" className="text-gray-400 hover:text-gold transition-colors">{tNav('reservation')}</Link></li>
              <li><Link href="/galeri" className="text-gray-400 hover:text-gold transition-colors">{tNav('gallery')}</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-gold transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">{tFooter('contactTitle')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="text-gold mt-1" size={20} />
                <span className="text-gray-400">Güzelyurt Mah. 26220 Sk. No: 17B Aksu / Antalya</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-gold" size={20} />
                <div className="flex flex-col">
                  <a href={`tel:${phone}`} className="text-gray-400 hover:text-gold transition-colors">{phone}</a>
                  {phone2 && <a href={`tel:${phone2}`} className="text-gray-400 hover:text-gold transition-colors">{phone2}</a>}
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-gold" size={20} />
                <a href={`mailto:${email}`} className="text-gray-400 hover:text-gold transition-colors">{email}</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-secondary pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Vip Transfer Antalya Taksi. {tFooter('copyright')}
          </p>
          <div className="flex gap-4">
            <Link href="/hakkimizda" className="text-gray-500 hover:text-gold text-sm">{tFooter('privacy')}</Link>
            <Link href="/hakkimizda" className="text-gray-500 hover:text-gold text-sm">{tFooter('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
