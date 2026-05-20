'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Route, Users, Baby, Plus, Calendar, Clock, Plane, Hotel, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const EXTRA_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Gül Buketi (10 Gül)': {
    en: 'Rose Bouquet (10 Roses)',
    ru: 'Букет роз (10 роз)',
    de: 'Rosenstrauß (10 Rosen)',
    tr: 'Gül Buketi (10 Gül)'
  },
  'Gül Buketi (20 Gül)': {
    en: 'Rose Bouquet (20 Roses)',
    ru: 'Букет роз (20 роз)',
    de: 'Rosenstrauß (20 Rosen)',
    tr: 'Gül Buketi (20 Gül)'
  },
  'Gül Buketi (50 Gül)': {
    en: 'Rose Bouquet (50 Roses)',
    ru: 'Букет роз (50 роз)',
    de: 'Rosenstrauß (50 Rosen)',
    tr: 'Gül Buketi (50 Gül)'
  },
  'Bira Efes Kutu 50CL': {
    en: 'Beer Efes Can 50CL',
    ru: 'Пиво Efes банка 50CL',
    de: 'Bier Efes Dose 50CL',
    tr: 'Bira Efes Kutu 50CL'
  },
  'Alkollü Şampanya 70CL': {
    en: 'Alcoholic Champagne 70CL',
    ru: 'Алкогольное шампанское 70CL',
    de: 'Alkoholischer Champagner 70CL',
    tr: 'Alkollü Şampanya 70CL'
  },
  'Bebek Koltuğu (1-3 Yaş)': {
    en: 'Baby Seat (1-3 Years) - Free',
    ru: 'Детское кресло (1-3 года) - Бесплатно',
    de: 'Babysitz (1-3 Jahre) - Kostenlos',
    tr: 'Bebek Koltuğu (1-3 Yaş) - Ücretsiz'
  },
  'Yükseltici Koltuk (4-9 Yaş)': {
    en: 'Seat Booster (4-9 Years) - Free',
    ru: 'Бустер (4-9 лет) - Бесплатно',
    de: 'Sitzerhöhung (4-9 Jahre) - Kostenlos',
    tr: 'Yükseltici Koltuk (4-9 Yaş) - Ücretsiz'
  }
};

const translateExtraName = (name: string, locale: string) => {
  if (!name) return '';
  const cleanName = name.trim();
  const entry = EXTRA_TRANSLATIONS[cleanName];
  if (entry && entry[locale]) {
    return entry[locale];
  }
  
  // Fuzzy match if name has similar words
  for (const [key, value] of Object.entries(EXTRA_TRANSLATIONS)) {
    if (cleanName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleanName.toLowerCase())) {
      if (value[locale]) return value[locale];
    }
  }
  
  return name;
};

const VEHICLE_IMAGES: Record<string, string> = {
  '1': '/Mercedes-vip-vito-1.png',
  '2': '/vw-Transporter-1.jpg',
  '3': '/Mercedes-Maybach-1.jpg',
  '4': '/Mercedes-Sprinter-1.jpg',
};

const ROUTE_INFO: Record<string, { km: string, duration: string }> = {
  'Antalya Merkez': { km: '18 KM', duration: '20 DK' },
  'Lara': { km: '12 KM', duration: '15 DK' },
  'Kundu': { km: '14 KM', duration: '15 DK' },
  'Kaleiçi': { km: '16 KM', duration: '20 DK' },
  'Konyaaltı': { km: '22 KM', duration: '25 DK' },
  'Belek': { km: '33 KM', duration: '30 DK' },
  'Boğazkent': { km: '38 KM', duration: '35 DK' },
  'Denizyaka': { km: '45 KM', duration: '40 DK' },
  'Kumköy': { km: '60 KM', duration: '50 DK' },
  'Gündoğdu': { km: '62 KM', duration: '50 DK' },
  'Çolaklı': { km: '63 KM', duration: '50 DK' },
  'Evrenseki': { km: '65 KM', duration: '50 DK' },
  'Side': { km: '65 KM', duration: '55 DK' },
  'Sorgun': { km: '68 KM', duration: '55 DK' },
  'Manavgat': { km: '75 KM', duration: '60 DK' },
  'Titreyengöl': { km: '70 KM', duration: '55 DK' },
  'Kızılot': { km: '85 KM', duration: '65 DK' },
  'Kızılağaç': { km: '90 KM', duration: '70 DK' },
  'Okurcalar': { km: '100 KM', duration: '75 DK' },
  'Avsallar': { km: '110 KM', duration: '80 DK' },
  'İncekum': { km: '105 KM', duration: '80 DK' },
  'Çenger': { km: '108 KM', duration: '80 DK' },
  'Konaklı': { km: '115 KM', duration: '85 DK' },
  'Türkler': { km: '118 KM', duration: '85 DK' },
  'Alanya': { km: '125 KM', duration: '90 DK' },
  'Mahmutlar': { km: '140 KM', duration: '100 DK' },
  'Kargıcak': { km: '145 KM', duration: '105 DK' },
  'Kestel': { km: '135 KM', duration: '95 DK' },
  'Beldibi': { km: '40 KM', duration: '35 DK' },
  'Göynük': { km: '45 KM', duration: '40 DK' },
  'Kemer': { km: '50 KM', duration: '45 DK' },
  'Çamyuva': { km: '58 KM', duration: '50 DK' },
  'Kiriş': { km: '55 KM', duration: '48 DK' },
  'Tekirova': { km: '70 KM', duration: '60 DK' },
  'Olimpos': { km: '90 KM', duration: '75 DK' },
  'Adrasan': { km: '100 KM', duration: '85 DK' },
};

const COUNTRY_CODES = [
  { code: '+90', flag: '🇹🇷', label: 'TR' },
  { code: '+49', flag: '🇩🇪', label: 'DE' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+1', flag: '🇺🇸', label: 'US' },
  { code: '+7', flag: '🇷🇺', label: 'RU' },
  { code: '+33', flag: '🇫🇷', label: 'FR' },
  { code: '+31', flag: '🇳🇱', label: 'NL' },
];

interface ExtraService {
  id: number;
  name: string;
  price: number;
  currency: string;
  is_active: boolean;
}

export default function ReservationStep2() {
  const t = useTranslations('Booking');
  const tLoc = useTranslations('Locations');
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  const fromRaw = searchParams.get('from') || '';
  const toRaw = searchParams.get('to') || '';
  const pax = searchParams.get('pax') || '1';
  const currency = searchParams.get('currency') || 'EUR';
  const direction = searchParams.get('direction') || 'one-way';
  const vehicleId = searchParams.get('vehicleId') || '1';
  const basePrice = parseFloat(searchParams.get('price') || '0');

  let destForInfo = toRaw;
  if (toRaw === 'Antalya Havalimanı') destForInfo = fromRaw;

  const routeInfo = ROUTE_INFO[destForInfo] || { km: '- KM', duration: '- DK' };
  const currencySymbol: Record<string, string> = { EUR: '€', USD: '$', GBP: '£', TRY: '₺' };
  const directionLabel = direction === 'round-trip' ? 'Gidiş / Dönüş Transfer' : 'Tek Yön Transfer';

  const VEHICLE_NAMES: Record<string, string> = {
    '1': 'Mercedes VIP Vito',
    '2': 'VW Transporter',
    '3': 'Mercedes Maybach',
    '4': 'Mercedes Sprinter VIP',
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+90',
    phone: '',
    flightDate: '',
    flightTime: '',
    flightCode: '',
    destination: '',
    note: '',
    babyChair: false,
  });

  const [extras, setExtras] = useState<ExtraService[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Record<number, number>>({});
  const [rates, setRates] = useState<Record<string, number>>({ EUR: 1, USD: 1.08, GBP: 0.85, TRY: 53.0 });
  const [settingsPhone, setSettingsPhone] = useState('+90 542 7434648');

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch((err) => console.error('Currency fetch failed:', err));
  }, []);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.phone) {
          setSettingsPhone(data.phone);
        }
      })
      .catch(err => console.error('Settings fetch failed:', err));
  }, []);

  useEffect(() => {
    fetch('/api/admin/extras')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExtras(data.filter(e => e.is_active));
        }
      });
  }, []);

  const handleExtraChange = (id: number, quantity: number) => {
    setSelectedExtras(prev => {
      const next = { ...prev };
      if (quantity > 0) {
        next[id] = quantity;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const getConvertedExtraPrice = (extra: ExtraService) => {
    const fromRate = rates[extra.currency] || 1;
    const toRate = rates[currency] || 1;
    return Math.round(extra.price * (toRate / fromRate));
  };

  const extrasTotalPrice = extras.reduce((total, extra) => {
    const qty = selectedExtras[extra.id] || 0;
    const convertedPrice = getConvertedExtraPrice(extra);
    return total + (convertedPrice * qty);
  }, 0);

  const finalPrice = basePrice + extrasTotalPrice;

  const translateLocation = (name: string) => {
    if (name === 'Antalya Havalimanı') return tLoc('antalyaAirport');
    if (name === 'Antalya Merkez') return tLoc('antalyaCenter');
    if (name === 'Kaleiçi') return tLoc('kaleici');
    if (name === 'Olimpos') return tLoc('olympos');
    return name;
  };

  const from = translateLocation(fromRaw);
  const to = translateLocation(toRaw);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedExtrasList = extras
      .filter(ex => selectedExtras[ex.id])
      .map(ex => {
        const qty = selectedExtras[ex.id];
        const convertedPrice = getConvertedExtraPrice(ex);
        return `${qty}x ${translateExtraName(ex.name, currentLocale)} (${convertedPrice * qty} ${currencySymbol[currency] || '€'})`;
      })
      .join('%0A');

    const message = `🚗 *VIP TRANSFER ANTALYA TAKSİ REZERVASYON*%0A%0A` +
      `📋 *Kişisel Bilgiler*%0A` +
      `Ad Soyad: ${form.name}%0A` +
      `E-Mail: ${form.email}%0A` +
      `Telefon: ${form.countryCode} ${form.phone}%0A%0A` +
      `🛫 *Transfer Bilgileri*%0A` +
      `Nereden: ${from}%0A` +
      `Nereye: ${to}%0A` +
      `Mesafe: ${routeInfo.km} / ${routeInfo.duration}%0A` +
      `Kişi Sayısı: ${pax}%0A` +
      `Araç: ${VEHICLE_NAMES[vehicleId] || 'VIP'}%0A` +
      `Yön: ${directionLabel}%0A` +
      `Taban Fiyat: ${basePrice} ${currencySymbol[currency] || '€'}%0A%0A` +
      `✈️ *Uçuş Bilgileri*%0A` +
      `Uçak İniş Tarihi: ${form.flightDate}%0A` +
      `Uçak İniş Saati: ${form.flightTime}%0A` +
      `Uçuş Kodu: ${form.flightCode}%0A` +
      `Gideceğiniz Yer: ${form.destination}%0A%0A` +
      `${form.babyChair ? '👶 *Bebek Koltuğu İsteniyor*%0A' : ''}` +
      `${selectedExtrasList ? `🛍️ *Ekstralar:*%0A${selectedExtrasList}%0A%0A` : ''}` +
      `💰 *TOPLAM FİYAT:* ${finalPrice} ${currencySymbol[currency] || '€'}%0A%0A` +
      `${form.note ? `💬 *Not:* ${form.note}` : ''}`;

    let waNumber = settingsPhone.replace(/\D/g, '');
    if (waNumber.startsWith('00')) {
      waNumber = waNumber.substring(2);
    } else if (waNumber.startsWith('0')) {
      waNumber = '90' + waNumber.substring(1);
    } else if (!waNumber.startsWith('90') && waNumber.length === 10) {
      waNumber = '90' + waNumber;
    }

    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gold text-black font-bold flex items-center justify-center">✓</div>
            <span className="text-xs text-gold mt-2 font-medium">{t('step1Title')}</span>
          </div>
          <div className="flex-1 h-0.5 bg-gold"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gold text-black font-bold flex items-center justify-center">2</div>
            <span className="text-xs text-gold mt-2 font-medium">{t('step2Title')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div>
                <h2 className="text-xl font-bold text-white mb-6 inline-block relative pb-3">
                  {t('personalInfo')}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('fullName')}:</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder={t('fullName')}
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('email')}:</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder={t('email')}
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">{t('phone')}:</label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode" value={form.countryCode} onChange={handleChange}
                        className="bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold w-32"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input
                        type="tel" name="phone" required value={form.phone} onChange={handleChange}
                        placeholder={t('phone')}
                        className="flex-1 bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-2">{t('notes')}:</label>
                    <textarea
                      name="note" value={form.note} onChange={handleChange}
                      placeholder={t('notes')}
                      rows={3}
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-6 inline-block relative pb-3">
                  {t('transferInfo')}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('date')}:</label>
                    <input
                      type="date" name="flightDate" required value={form.flightDate} onChange={handleChange}
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('time')}:</label>
                    <input
                      type="time" name="flightTime" required value={form.flightTime} onChange={handleChange}
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('flightNumber')}:</label>
                    <input
                      type="text" name="flightCode" value={form.flightCode} onChange={handleChange}
                      placeholder="EX: QX0707"
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t('summaryTo')}:</label>
                    <input
                      type="text" name="destination" value={form.destination} onChange={handleChange}
                      placeholder={t('summaryTo')}
                      className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-6 inline-block relative pb-3">
                  {t('extrasTitle')}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></div>
                </h2>
                <div className="flex flex-col gap-6">
                  
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, babyChair: !form.babyChair })}
                    className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-colors ${
                      form.babyChair ? 'bg-gold/10 border-gold text-gold' : 'border-gray-700 text-gray-400 hover:border-gold/50 bg-secondary'
                    }`}
                  >
                    <Baby size={24} />
                    <span className="font-medium text-lg">{t('features.babySeat')} ({t('free')})</span>
                    <div className={`ml-auto w-6 h-6 rounded-md border flex items-center justify-center ${form.babyChair ? 'bg-gold border-gold text-black' : 'border-gray-500'}`}>
                      {form.babyChair && <Check size={16} />}
                    </div>
                  </button>

                  {extras.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {extras.map((extra) => {
                        const convertedPrice = getConvertedExtraPrice(extra);
                        return (
                          <div key={extra.id} className="bg-secondary border border-gray-700 rounded-lg p-4 flex flex-col justify-between hover:border-gold/30 transition-colors">
                            <div className="mb-4">
                              <h4 className="text-white font-medium">{translateExtraName(extra.name, currentLocale)}</h4>
                              <span className="text-gold font-bold text-lg">{convertedPrice} {currencySymbol[currency] || '€'}</span>
                            </div>
                            <select
                              value={selectedExtras[extra.id] || 0}
                              onChange={(e) => handleExtraChange(extra.id, parseInt(e.target.value))}
                              className="w-full bg-zinc-900 border border-gray-700 text-white rounded-md p-2 outline-none focus:border-gold text-sm"
                            >
                              <option value={0}>0</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-black font-bold py-4 rounded-lg text-lg transition-all transform hover:scale-[1.01] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                ✓ {t('completeButton')}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-secondary border border-gray-800 rounded-xl p-6 sticky top-28">
              <h3 className="text-xl font-bold text-white text-center mb-6 inline-block relative pb-3 w-full">
                {t('summaryTitle')}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gold"></div>
              </h3>

              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src={VEHICLE_IMAGES[vehicleId] || '/Vip Transfer Antalya Taksi-vip-arac.jpeg'}
                  alt="Selected Vehicle"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">🚗</span>
                  <span className="text-white font-medium">{VEHICLE_NAMES[vehicleId] || 'VIP'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Route size={16} className="text-gray-500" />
                  <span className="text-gray-300">{routeInfo.km} / {routeInfo.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-gray-300">{from}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-gray-300">{to}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-gray-300">{pax} {t('summaryPax')}</span>
                </div>

                <hr className="border-gray-700" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Transfer Tutarı</span>
                  <span className="text-white">{basePrice} {currencySymbol[currency] || '€'}</span>
                </div>

                {extrasTotalPrice > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Ekstra Tutarı</span>
                    <span className="text-white">+{extrasTotalPrice} {currencySymbol[currency] || '€'}</span>
                  </div>
                )}

                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 flex items-center justify-between mt-2">
                  <span className="text-gold font-bold">{t('summaryTotal')}</span>
                  <span className="text-gold font-bold text-xl">{finalPrice} {currencySymbol[currency] || '€'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
