import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('ContactPage');

  // Fetch dynamic phone and email from Supabase settings table
  let phone = '+90 542 7434648';
  let email = 'info@viptransferantalyataksi.com';

  try {
    const { data: settingsData } = await supabase
      .from('settings')
      .select('phone, email')
      .eq('id', 1)
      .single();
    
    if (settingsData?.phone) phone = settingsData.phone;
    if (settingsData?.email) email = settingsData.email;
  } catch (e) {
    console.error("Error loading settings in ContactPage:", e);
  }

  const waNumber = '905427434648'; // Dedicated WhatsApp number

  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-black to-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* WhatsApp - Primary Contact */}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366]/10 border-2 border-[#25D366]/40 hover:border-[#25D366] rounded-xl p-8 flex flex-col items-center text-center transition-all hover:scale-105"
            >
              <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="text-[#25D366]" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('whatsappTitle')}</h3>
              <p className="text-gray-400 mb-4">{t('whatsappDesc')}</p>
              <span className="text-[#25D366] font-bold text-lg">{phone}</span>
            </a>
            
            {/* Phone */}
            <a
              href={`tel:${phone}`}
              className="bg-gold/5 border-2 border-gold/30 hover:border-gold rounded-xl p-8 flex flex-col items-center text-center transition-all hover:scale-105"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="text-gold" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('phoneTitle')}</h3>
              <p className="text-gray-400 mb-4">{t('phoneDesc')}</p>
              <span className="text-gold font-bold text-lg">{phone}</span>
            </a>
            
            {/* Email - info only */}
            <div className="bg-secondary border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Mail className="text-gold" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('emailTitle')}</h3>
              <p className="text-gray-400 mb-4">{t('emailDesc')}</p>
              <span className="text-gold font-bold">{email}</span>
            </div>
            
            {/* Address */}
            <div className="bg-secondary border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="text-gold" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('addressTitle')}</h3>
              <p className="text-gray-400 mb-4">{t('addressDesc')}</p>
              <span className="text-gold font-bold">{t('addressVal')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
