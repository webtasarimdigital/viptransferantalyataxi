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
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="/prima-vip-tanitim.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/40 to-black z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md">
            {t('subtitle')}
          </p>
        </div>

        {/* Quick Reservation Form */}
        <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-md border border-gold/30 rounded-xl p-6 shadow-2xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gold font-medium">{t('from')}</label>
              <select 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                className="bg-secondary/80 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                required
              >
                <option value="" disabled>{t('select')}</option>
                {locations.map((loc) => <option key={loc} value={loc}>{translateLocation(loc)}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gold font-medium">{t('to')}</label>
              <select 
                value={to} 
                onChange={(e) => setTo(e.target.value)}
                className="bg-secondary/80 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                required
              >
                <option value="" disabled>{t('select')}</option>
                {locations.map((loc) => <option key={loc} value={loc}>{translateLocation(loc)}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gold font-medium">{t('pax')}</label>
              <select 
                value={pax} 
                onChange={(e) => setPax(e.target.value)}
                className="bg-secondary/80 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
              >
                {[...Array(14)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1} {tBooking('paxSuffix')}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gold font-medium">{t('currency')}</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-secondary/80 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                required
              >
                <option value="" disabled>{t('select')}</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="TRY">TRY (₺)</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <button 
                type="submit"
                className="bg-gold hover:bg-gold-light text-black font-bold rounded-lg p-3 h-[46px] transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                {t('search')}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
