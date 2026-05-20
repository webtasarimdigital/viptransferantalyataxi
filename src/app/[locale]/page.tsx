import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import PriceList from '@/components/PriceList';
import VehicleCards from '@/components/VehicleCards';
import FAQ from '@/components/FAQ';
import { ShieldCheck, Clock, Compass, Star } from 'lucide-react';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <>
      <Hero />
      
      {/* Vehicle Cards Section (NEW) */}
      <VehicleCards />

      {/* Modern Why Choose Us Section */}
      <section className="py-24 bg-zinc-900 border-t border-b border-zinc-800 relative">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-gold tracking-widest uppercase mb-3">{t('aboutSub')}</h2>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              {t('aboutTitle')}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {t('aboutText')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-gold/50 transition-colors group text-center">
              <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                {t('feature1Title')}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t('feature1Desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-gold/50 transition-colors group text-center mt-0 md:mt-8">
              <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                {t('feature2Title')}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t('feature2Desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-gold/50 transition-colors group text-center">
              <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                {t('feature3Title')}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t('feature3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Price List */}
      <PriceList />

      {/* Minimalist Reviews Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-zinc-800 pb-8">
            <div>
              <h2 className="text-sm font-bold text-gold tracking-[0.25em] uppercase mb-2">{t('reviewsSub')}</h2>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider">
                {t('reviewsTitle')}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-gold flex items-center justify-center text-xs font-bold text-black">JD</div>
                <div className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-blue-500 flex items-center justify-center text-xs font-bold text-white">SM</div>
                <div className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-red-500 flex items-center justify-center text-xs font-bold text-white">AK</div>
              </div>
              <span className="text-zinc-400 text-sm font-medium ml-3">{t('ratingAverage')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-zinc-900 p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 border-gold hover:bg-zinc-800 transition-colors">
              <div className="flex text-gold mb-4 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {t('review1Text')}
              </p>
              <h4 className="text-white font-bold text-sm tracking-wide">{t('review1Author')}</h4>
            </div>

            <div className="bg-zinc-900 p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 border-gold hover:bg-zinc-800 transition-colors">
              <div className="flex text-gold mb-4 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {t('review2Text')}
              </p>
              <h4 className="text-white font-bold text-sm tracking-wide">{t('review2Author')}</h4>
            </div>

            <div className="bg-zinc-900 p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 border-gold hover:bg-zinc-800 transition-colors">
              <div className="flex text-gold mb-4 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {t('review3Text')}
              </p>
              <h4 className="text-white font-bold text-sm tracking-wide">{t('review3Author')}</h4>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section (NEW) */}
      <FAQ />

    </>
  );
}
