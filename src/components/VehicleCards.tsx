'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

export default function VehicleCards() {
  const t = useTranslations('Booking');
  const tHome = useTranslations('Home');

  const vehicles = [
    {
      id: 'vito',
      name: 'Mercedes Vito VIP',
      image: '/Mercedes-vip-vito-2.png',
      pax: 6,
      luggage: 6,
      desc: t('desc.vito'),
      features: [t('features.wifi'), t('features.drinks'), t('features.luxuryDesign')]
    },
    {
      id: 'royal',
      name: 'Maybach VIP',
      image: '/Mercedes-Maybach-2.jpg',
      pax: 4,
      luggage: 4,
      desc: t('desc.royal'),
      features: [t('features.surprise'), t('features.noDriverContact'), t('features.snack')]
    },
    {
      id: 'minibus',
      name: 'Mercedes Sprinter',
      image: '/Mercedes-Sprinter-2.jpg',
      pax: 14,
      luggage: 14,
      desc: t('desc.minibus'),
      features: [t('features.groupTransfer'), t('features.largeLuggage'), t('features.wifi')]
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="vehicles">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-2">
            <Zap size={18} className="text-gold" /> {tHome('vehiclesSub')}
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-wider inline-block relative pb-4">
            {tHome('vehiclesTitle')}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gold rounded-full"></div>
          </h1>
          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-sm md:text-base">
            {tHome('vehiclesDesc')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 shadow-xl group flex flex-col">
              
              {/* Image Container */}
              <div className="relative h-56 w-full bg-zinc-800 overflow-hidden">
                <Image 
                  src={v.image} 
                  alt={v.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white tracking-wide">{v.name}</h3>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {v.desc}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Users size={18} className="text-gold" />
                    <span className="font-semibold">{v.pax} {t('paxSuffix')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Briefcase size={18} className="text-gold" />
                    <span className="font-semibold">{v.luggage} {t('luggage')}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mt-auto">
                  {v.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-gold/80" />
                      <span className="text-zinc-300 text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <a href="#reservation" className="mt-8 w-full py-3 rounded-lg bg-zinc-800 text-white text-center font-semibold hover:bg-gold hover:text-black transition-colors duration-300 uppercase tracking-wider text-sm">
                  {t('selectButton')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
