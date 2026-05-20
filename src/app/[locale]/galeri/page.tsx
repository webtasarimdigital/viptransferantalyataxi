import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { supabase } from '@/lib/supabase';
import { unstable_cache } from 'next/cache';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GalleryPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

const getCachedGallery = unstable_cache(
  async () => {
    const { data } = await supabase.from('gallery').select('*').order('id');
    return data || [];
  },
  ['gallery-items'],
  { revalidate: 60 }
);

export default async function GalleryPage() {
  const t = await getTranslations('GalleryPage');
  
  // Default items if DB is empty
  const DEFAULT_ITEMS = [
    { id: 'def1', url: '/Vip Transfer Antalya Taksi-vip-arac.jpeg', type: 'image' },
    { id: 'def2', url: '/Vip Transfer Antalya Taksi-vip-araclar.jpeg', type: 'image' },
    { id: 'def3', url: '/Vip Transfer Antalya Taksi-vip-arac-ici.jpeg', type: 'image' },
    { id: 'def4', url: '/Vip Transfer Antalya Taksi-vip-arac-ici-detay.jpeg', type: 'image' },
    { id: 'def5', url: '/Vip Transfer Antalya Taksi-vip-tanitim.mp4', type: 'video' },
  ];

  let dbItems = await getCachedGallery();
  if (!dbItems || dbItems.length === 0) {
    dbItems = DEFAULT_ITEMS;
  }

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

      {/* Gallery Grid */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbItems.map((item) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-colors group">
                {item.type === 'image' ? (
                  <div className="aspect-video relative">
                    <Image
                      src={item.url}
                      alt="Vip Transfer Antalya Taksi VIP Galeri"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <video
                    controls
                    preload="metadata"
                    className="w-full aspect-video object-cover"
                  >
                    <source src={item.url} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
