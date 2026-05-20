import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-zinc-950">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          {/* Faded Gold 404 Number */}
          <h1 className="text-8xl md:text-9xl font-extrabold text-gold/20 tracking-tighter mb-4 animate-pulse select-none">
            404
          </h1>
          
          {/* Header Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          
          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
            {t('desc')}
          </p>
          
          {/* Back to Home Button */}
          <Link 
            href="/" 
            className="inline-block bg-gold hover:bg-gold-light text-black font-bold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-gold/20"
          >
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
