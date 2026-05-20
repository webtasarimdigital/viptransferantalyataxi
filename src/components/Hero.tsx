'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';

export default function Hero() {
  const t = useTranslations('Hero');
  const tLoc = useTranslations('Locations');
  const tBooking = useTranslations('Booking');
  const router = useRouter();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [pax, setPax] = useState('1');
  const [currency, setCurrency] = useState('');

  const translateLocation = (name: string) => {
    if (name === 'Antalya Havalimanı') return tLoc('antalyaAirport');
    if (name === 'Antalya Merkez') return tLoc('antalyaCenter');
    if (name === 'Kaleiçi') return tLoc('kaleici');
    if (name === 'Olimpos') return tLoc('olympos');
    return name;
  };

  const [locations, setLocations] = useState<string[]>([
    'Antalya Havalimanı', 'Antalya Merkez', 'Lara', 'Kundu', 'Kaleiçi', 'Konyaaltı',
    'Belek', 'Boğazkent', 'Denizyaka',
    'Kumköy', 'Gündoğdu', 'Çolaklı',
    'Evrenseki', 'Side', 'Sorgun',
    'Manavgat', 'Titreyengöl', 'Kızılot',
    'Kızılağaç', 'Okurcalar', 'Avsallar',
    'İncekum', 'Çenger', 'Konaklı',
    'Türkler', 'Alanya', 'Mahmutlar',
    'Kargıcak', 'Kestel',
    'Beldibi', 'Göynük', 'Kemer',
    'Çamyuva', 'Kiriş', 'Tekirova',
    'Olimpos', 'Adrasan',
  ]);

  useEffect(() => {
    async function loadDynamicLocations() {
      try {
        const res = await fetch('/api/admin/routes');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const locsSet = new Set<string>();
            data.forEach(r => {
              if (r.from) locsSet.add(r.from.trim());
              if (r.to) locsSet.add(r.to.trim());
            });
            const sortedLocs = Array.from(locsSet).sort((a, b) => a.localeCompare(b, 'tr'));
            
            // Keep Antalya Airport at the top as a premium choice
            const filteredLocs = sortedLocs.filter(l => l !== 'Antalya Havalimanı');
            if (locsSet.has('Antalya Havalimanı')) {
              setLocations(['Antalya Havalimanı', ...filteredLocs]);
            } else {
              setLocations(sortedLocs);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load dynamic search locations:', e);
      }
    }
    loadDynamicLocations();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/rezervasyon',
      query: {
        from,
        to,
        pax,
        currency
      }
    });
  };

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden bg-zinc-950 pt-20">
      {/* Background Image / Video Alternative */}
      <div className="absolute top-0 right-0 w-full lg:w-[70%] h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 lg:opacity-80"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
        >
          <source src="/prima-vip-tanitim.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Quick Reservation Form - Vertical/Stacked for left alignment */}
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark"></div>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">{t('from')}</label>
                <select 
                  value={from} 
                  onChange={(e) => setFrom(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  required
                >
                  <option value="" disabled>{t('select')}</option>
                  {locations.map((loc) => <option key={loc} value={loc}>{translateLocation(loc)}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">{t('to')}</label>
                <select 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  required
                >
                  <option value="" disabled>{t('select')}</option>
                  {locations.map((loc) => <option key={loc} value={loc}>{translateLocation(loc)}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">{t('pax')}</label>
                <select 
                  value={pax} 
                  onChange={(e) => setPax(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                >
                  {[...Array(14)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1} {tBooking('paxSuffix')}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">{t('currency')}</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  required
                >
                  <option value="" disabled>{t('select')}</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="TRY">TRY (₺)</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2">
                <button 
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-black font-black rounded-xl p-4 transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(245,158,11,0.2)] uppercase tracking-widest text-sm"
                >
                  {t('search')}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
