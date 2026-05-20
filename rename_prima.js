const fs = require('fs');
const path = require('path');

const files = [
  'package.json',
  'messages/de.json',
  'messages/en.json',
  'messages/ru.json',
  'messages/tr.json',
  'src/app/admin/dashboard/page.tsx',
  'src/app/admin/layout.tsx',
  'src/app/api/admin/login/route.ts',
  'src/app/api/admin/settings/route.ts',
  'src/app/globals.css',
  'src/app/[locale]/galeri/page.tsx',
  'src/app/[locale]/hakkimizda/page.tsx',
  'src/app/[locale]/iletisim/page.tsx',
  'src/app/[locale]/layout.tsx',
  'src/app/[locale]/page.tsx',
  'src/app/[locale]/rezervasyon/page.tsx',
  'src/app/[locale]/rezervasyon/step-2/page.tsx',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/MobileNav.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "Prima VIP Transfer" or "Prima Vip Transfer"
    content = content.replace(/Prima VIP Transfer/gi, 'Vip Transfer Antalya Taksi');
    
    // Replace standalone "Prima" -> "Vip Transfer Antalya Taksi"
    content = content.replace(/\bPrima\b/gi, 'Vip Transfer Antalya Taksi');
    
    // Also "prima-vip-transfer" to "viptransferantalyataxi"
    content = content.replace(/prima-vip-transfer/gi, 'viptransferantalyataxi');

    // Email
    content = content.replace(/Primaviptransfer@gmail\.com/gi, 'info@viptransferantalyataksi.com');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
