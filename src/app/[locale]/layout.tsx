import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import '../globals.css';

import { supabase } from '@/lib/supabase';
import { unstable_cache } from 'next/cache';

const getCachedSettings = unstable_cache(
  async () => {
    try {
      const { data } = await supabase.from('settings').select('*').eq('id', 1).single();
      return data;
    } catch (e) {
      console.error('Failed to load settings:', e);
      return null;
    }
  },
  ['site-settings'],
  { revalidate: 3600 }
);

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  let phone = '+49 1575 4758480';
  let phone2 = '+90 542 7434648';
  let wpPhone = '+905427434648';
  let email = 'info@viptransferantalyataksi.com';

  const data = await getCachedSettings();
  if (data) {
    phone = data.phone || phone;
    email = data.email || email;
  }
 
  return (
    <html lang={locale}>
      <body className="bg-zinc-950 text-white font-sans antialiased relative pb-16 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <Header phone={phone} phone2={phone2} />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer phone={phone} phone2={phone2} email={email} />
          <MobileNav phone={phone} wpPhone={wpPhone} />
          <FloatingWhatsApp phone={wpPhone} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
