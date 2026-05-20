import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTranslations } from 'next-intl';
import { unstable_cache } from 'next/cache';

const getCachedRoutes = unstable_cache(
  async () => {
    try {
      const { data } = await supabase.from('route_price').select('*').order('id');
      return data;
    } catch (e) {
      console.error('Failed to load route prices:', e);
      return null;
    }
  },
  ['route-prices'],
  { revalidate: 5 }
);

export default async function PriceList() {
  const t = useTranslations('Home');
  const tLoc = useTranslations('Locations');

  const routePrices = await getCachedRoutes();


  // Complete list of 36 routes with prices matching the user's screenshot exactly!
  const fallbackPrices = [
    // Row 1
    { id: 1, from: 'Antalya Havalimanı', to: 'Antalya Merkez', price: 40, currency: 'EUR' },
    { id: 2, from: 'Antalya Havalimanı', to: 'Lara', price: 40, currency: 'EUR' },
    { id: 3, from: 'Antalya Havalimanı', to: 'Kundu', price: 40, currency: 'EUR' },
    // Row 2
    { id: 4, from: 'Antalya Havalimanı', to: 'Belek', price: 45, currency: 'EUR' },
    { id: 5, from: 'Antalya Havalimanı', to: 'Boğazkent', price: 45, currency: 'EUR' },
    { id: 6, from: 'Antalya Havalimanı', to: 'Denizyaka', price: 50, currency: 'EUR' },
    // Row 3
    { id: 7, from: 'Antalya Havalimanı', to: 'Kumköy', price: 50, currency: 'EUR' },
    { id: 8, from: 'Antalya Havalimanı', to: 'Gündoğdu', price: 50, currency: 'EUR' },
    { id: 9, from: 'Antalya Havalimanı', to: 'Çolaklı', price: 50, currency: 'EUR' },
    // Row 4
    { id: 10, from: 'Antalya Havalimanı', to: 'Evrenseki', price: 50, currency: 'EUR' },
    { id: 11, from: 'Antalya Havalimanı', to: 'Side', price: 50, currency: 'EUR' },
    { id: 12, from: 'Antalya Havalimanı', to: 'Sorgun', price: 50, currency: 'EUR' },
    // Row 5
    { id: 13, from: 'Antalya Havalimanı', to: 'Manavgat', price: 50, currency: 'EUR' },
    { id: 14, from: 'Antalya Havalimanı', to: 'Titreyengöl', price: 50, currency: 'EUR' },
    { id: 15, from: 'Antalya Havalimanı', to: 'Kızılot', price: 60, currency: 'EUR' },
    // Row 6
    { id: 16, from: 'Antalya Havalimanı', to: 'Kızılağaç', price: 60, currency: 'EUR' },
    { id: 17, from: 'Antalya Havalimanı', to: 'Okurcalar', price: 70, currency: 'EUR' },
    { id: 18, from: 'Antalya Havalimanı', to: 'Avsallar', price: 75, currency: 'EUR' },
    // Row 7
    { id: 19, from: 'Antalya Havalimanı', to: 'İncekum', price: 70, currency: 'EUR' },
    { id: 20, from: 'Antalya Havalimanı', to: 'Çenger', price: 70, currency: 'EUR' },
    { id: 21, from: 'Antalya Havalimanı', to: 'Konaklı', price: 75, currency: 'EUR' },
    // Row 8
    { id: 22, from: 'Antalya Havalimanı', to: 'Türkler', price: 75, currency: 'EUR' },
    { id: 23, from: 'Antalya Havalimanı', to: 'Alanya', price: 75, currency: 'EUR' },
    { id: 24, from: 'Antalya Havalimanı', to: 'Mahmutlar', price: 90, currency: 'EUR' },
    // Row 9
    { id: 25, from: 'Antalya Havalimanı', to: 'Kargıcak', price: 90, currency: 'EUR' },
    { id: 26, from: 'Antalya Havalimanı', to: 'Kestel', price: 90, currency: 'EUR' },
    { id: 27, from: 'Antalya Havalimanı', to: 'Kaleiçi', price: 40, currency: 'EUR' },
    // Row 10
    { id: 28, from: 'Antalya Havalimanı', to: 'Konyaaltı', price: 40, currency: 'EUR' },
    { id: 29, from: 'Antalya Havalimanı', to: 'Beldibi', price: 50, currency: 'EUR' },
    { id: 30, from: 'Antalya Havalimanı', to: 'Göynük', price: 50, currency: 'EUR' },
    // Row 11
    { id: 31, from: 'Antalya Havalimanı', to: 'Kemer', price: 50, currency: 'EUR' },
    { id: 32, from: 'Antalya Havalimanı', to: 'Çamyuva', price: 55, currency: 'EUR' },
    { id: 33, from: 'Antalya Havalimanı', to: 'Kiriş', price: 55, currency: 'EUR' },
    // Row 12
    { id: 34, from: 'Antalya Havalimanı', to: 'Tekirova', price: 60, currency: 'EUR' },
    { id: 35, from: 'Antalya Havalimanı', to: 'Olimpos', price: 85, currency: 'EUR' },
    { id: 36, from: 'Antalya Havalimanı', to: 'Adrasan', price: 95, currency: 'EUR' },
  ];

  const displayPrices = routePrices && routePrices.length > 0 ? routePrices : fallbackPrices;

  const translateLocation = (name: string) => {
    if (name === 'Antalya Havalimanı') return tLoc('antalyaAirport');
    if (name === 'Antalya Merkez') return tLoc('antalyaCenter');
    if (name === 'Kaleiçi') return tLoc('kaleici');
    if (name === 'Olimpos') return tLoc('olympos');
    return name;
  };

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gold uppercase tracking-widest inline-block relative pb-4">
            {t('priceListTitle')}
            <div className="absolute bottom-0 left-0 right-0 w-full h-[2px] bg-gold/50"></div>
          </h2>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
          {displayPrices.map((item) => (
            <div 
              key={item.id} 
              className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-5 flex items-center justify-between hover:border-gold/30 hover:bg-zinc-900 transition-all duration-300 shadow-md group"
            >
              {/* Location details */}
              <div className="flex items-center gap-4">
                <div className="text-gray-400 group-hover:text-gold transition-colors flex flex-col items-center">
                  {/* Dashed line effect map pin */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.74a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">{translateLocation(item.from)}</span>
                  <span className="text-sm font-semibold text-white tracking-wide">{translateLocation(item.to)}</span>
                </div>
              </div>

              {/* Price Tag */}
              <div className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                {item.price} {item.currency === 'EUR' ? '€' : item.currency === 'USD' ? '$' : item.currency === 'GBP' ? '£' : '₺'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
