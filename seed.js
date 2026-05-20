const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2].replace(/['"]/g, '').trim();
  }
});

const supabase = createClient(
  envVars['NEXT_PUBLIC_SUPABASE_URL'],
  envVars['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']
);

const DEFAULT_ROUTES = {
  'Antalya Merkez': 40, 'Lara': 40, 'Kundu': 40, 'Kaleiçi': 40, 'Konyaaltı': 40,
  'Belek': 45, 'Boğazkent': 45, 'Denizyaka': 50, 'Kumköy': 50, 'Gündoğdu': 50,
  'Çolaklı': 50, 'Evrenseki': 50, 'Side': 50, 'Sorgun': 50, 'Manavgat': 50,
  'Titreyengöl': 50, 'Kızılot': 60, 'Kızılağaç': 60, 'Okurcalar': 70,
  'Avsallar': 75, 'İncekum': 70, 'Çenger': 70, 'Konaklı': 75, 'Türkler': 75,
  'Alanya': 75, 'Mahmutlar': 90, 'Kargıcak': 90, 'Kestel': 90,
  'Beldibi': 50, 'Göynük': 50, 'Kemer': 50, 'Çamyuva': 55, 'Kiriş': 55,
  'Tekirova': 60, 'Olimpos': 85, 'Adrasan': 95,
};

const DEFAULT_EXTRAS = [
  { name: 'Kutlama Paketi (Balon + Süsleme)', price: 30, currency: 'EUR', is_active: true },
  { name: 'Çiçek', price: 40, currency: 'EUR', is_active: true },
  { name: 'Bira (4 Adet Efes/Tuborg)', price: 20, currency: 'EUR', is_active: true },
  { name: 'Meyve Tabağı (Mevsim Meyveleri)', price: 25, currency: 'EUR', is_active: true },
  { name: 'Viski (Chivas Regal 70cl + Enerji)', price: 120, currency: 'EUR', is_active: true },
  { name: 'Vodka (Absolut 70cl + Enerji)', price: 100, currency: 'EUR', is_active: true },
  { name: 'Şampanya', price: 60, currency: 'EUR', is_active: true },
  { name: 'Redbull (4 Adet)', price: 15, currency: 'EUR', is_active: true },
];

async function seed() {
  console.log("Seeding routes...");
  for (const [to, price] of Object.entries(DEFAULT_ROUTES)) {
    const { error } = await supabase
      .from('route_price')
      .upsert({ from: 'Antalya Havalimanı', to, price, currency: 'EUR' }, { onConflict: 'from,to' });
    if (error) console.error(error);
      // wait, route_price doesn't have unique constraint. let's just insert if not exists.
    
    // Check if exists
    const { data: existing } = await supabase.from('route_price').select('id').eq('from', 'Antalya Havalimanı').eq('to', to);
    if (!existing || existing.length === 0) {
      await supabase.from('route_price').insert({ from: 'Antalya Havalimanı', to, price, currency: 'EUR' });
    }
  }

  console.log("Seeding extras...");
  for (const ext of DEFAULT_EXTRAS) {
    const { data: existing } = await supabase.from('extra_services').select('id').eq('name', ext.name);
    if (!existing || existing.length === 0) {
      await supabase.from('extra_services').insert(ext);
    }
  }

  console.log("Seeding complete!");
}

seed();
