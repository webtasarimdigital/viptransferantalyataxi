import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import PriceList from '@/components/PriceList';
import { ShieldCheck, Clock, Star, Award, Compass, HeartHandshake, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <>
      <Hero />
      
      {/* Why Choose Us Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Header Title */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-sm font-bold text-gold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-2">
              <Award size={18} className="animate-pulse" /> VIP TRANSFER ANTALYA TAKSİ
            </h2>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider inline-block relative pb-4">
              {t('aboutTitle')}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gold rounded-full"></div>
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6">
              {t('aboutText')}
            </p>
          </div>

          {/* Premium Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column - Left Side */}
            <div className="lg:col-span-5 relative group">
              {/* Main Luxury Image */}
              <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                <Image 
                  src="/Mercedes-vip-vito-2.png" 
                  alt="Vip Transfer Antalya Taksi VIP Luxury Interior" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Visual overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </div>

              {/* Float Card 1: Customer Stat */}
              <div className="absolute -top-6 -left-6 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-5 rounded-xl hidden md:flex items-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all group-hover:border-gold/30">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
                  <HeartHandshake className="text-gold" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">10k+</div>
                  <div className="text-xs text-zinc-500 font-bold tracking-wider uppercase">{t('stat1Label')}</div>
                </div>
              </div>

              {/* Float Card 2: Active support */}
              <div className="absolute -bottom-6 -right-6 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-5 rounded-xl hidden md:flex items-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all group-hover:border-gold/30">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
                  <Clock className="text-gold animate-spin-slow" size={24} />
                </div>
                <div>
                  <div className="text-lg font-black text-white">{t('stat2Value')}</div>
                  <div className="text-xs text-zinc-500 font-bold tracking-wider uppercase">{t('stat2Label')}</div>
                </div>
              </div>
            </div>

            {/* Benefit Cards Column - Right Side */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Feature 1 */}
              <div className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300 shadow-lg flex flex-col md:flex-row gap-5 group">
                <div className="w-14 h-14 bg-gold/5 rounded-xl border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                  <ShieldCheck size={28} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide group-hover:text-gold transition-colors flex items-center gap-2">
                    {t('feature1Title')}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {t('feature1Desc')}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300 shadow-lg flex flex-col md:flex-row gap-5 group">
                <div className="w-14 h-14 bg-gold/5 rounded-xl border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                  <Compass size={28} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide group-hover:text-gold transition-colors">
                    {t('feature2Title')}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {t('feature2Desc')}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-gold/30 p-6 rounded-2xl transition-all duration-300 shadow-lg flex flex-col md:flex-row gap-5 group">
                <div className="w-14 h-14 bg-gold/5 rounded-xl border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                  <Clock size={28} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide group-hover:text-gold transition-colors">
                    {t('feature3Title')}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {t('feature3Desc')}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Price List */}
      <PriceList />
      
      {/* Premium Reviews Section */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900/60 relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-gold tracking-[0.25em] uppercase mb-3">{t('reviewsSub')}</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider inline-block relative pb-4">
              {t('reviewsTitle')}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gold"></div>
            </h1>
          </div>

          
          {/* Glowing Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-gold/30 p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-xl group">
              <div>
                <div className="flex text-gold mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" className="transition-transform group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-zinc-300 italic text-sm md:text-base leading-relaxed mb-8">
                  "Our driver was waiting for us at the airport holding a sign. The Maybach was incredibly clean and the drinks were a nice touch. Best transfer in Antalya!"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-gold to-yellow-600 rounded-full flex items-center justify-center font-extrabold text-xl text-black shadow-md">
                  M
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base tracking-wide">Michael Schmidt</h4>
                  <span className="text-xs text-zinc-500 font-medium">Berlin, Germany</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-gold/30 p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-xl group">
              <div>
                <div className="flex text-gold mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" className="transition-transform group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-zinc-300 italic text-sm md:text-base leading-relaxed mb-8">
                  "I usually use standard taxis, but trying Vip Transfer Antalya Taksi VIP changed my mind. Extremely professional, punctual, and the luxury van made us feel like celebrities."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-gold to-yellow-600 rounded-full flex items-center justify-center font-extrabold text-xl text-black shadow-md">
                  E
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base tracking-wide">Elena Ivanova</h4>
                  <span className="text-xs text-zinc-500 font-medium">Moscow, Russia</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-gold/30 p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-xl group">
              <div>
                <div className="flex text-gold mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" className="transition-transform group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-zinc-300 italic text-sm md:text-base leading-relaxed mb-8">
                  "Fantastic experience from start to finish. The booking via WhatsApp was so easy and the vehicle condition exceeded our expectations. Highly recommend!"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-gold to-yellow-600 rounded-full flex items-center justify-center font-extrabold text-xl text-black shadow-md">
                  J
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base tracking-wide">James Wilson</h4>
                  <span className="text-xs text-zinc-500 font-medium">London, UK</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
