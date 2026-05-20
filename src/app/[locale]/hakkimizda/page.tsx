import { Users, Award, Car } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default function AboutPage() {
  const t = useTranslations('AboutPage');

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

      {/* Content */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative rounded-xl overflow-hidden aspect-video">
              <Image
                src="/Vip Transfer Antalya Taksi-vip-araclar.jpeg"
                alt="Vip Transfer Antalya Taksi Araçları"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Vip Transfer Antalya Taksi <span className="text-gold">VIP</span> Transfer
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t('text1')}
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                {t('text2')}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {t('text3')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">{t('stat1')}</div>
              <div className="text-gray-400 text-sm">{t('stat1Label')}</div>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">{t('stat2')}</div>
              <div className="text-gray-400 text-sm">{t('stat2Label')}</div>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">{t('stat3')}</div>
              <div className="text-gray-400 text-sm">{t('stat3Label')}</div>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">{t('stat4')}</div>
              <div className="text-gray-400 text-sm">{t('stat4Label')}</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Users className="text-gold" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{t('feat1Title')}</h3>
                <p className="text-gray-400 text-sm">{t('feat1Desc')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Award className="text-gold" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{t('feat2Title')}</h3>
                <p className="text-gray-400 text-sm">{t('feat2Desc')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Car className="text-gold" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{t('feat3Title')}</h3>
                <p className="text-gray-400 text-sm">{t('feat3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
