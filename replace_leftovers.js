const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/[locale]/rezervasyon/step-2/page.tsx',
  'src/app/[locale]/iletisim/page.tsx',
  'src/app/api/admin/settings/route.ts',
  'src/app/api/admin/login/route.ts',
  'src/app/admin/dashboard/page.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old phone number
    content = content.replace(/05323591039/g, '+90 542 7434648');
    
    // Replace old admin password fallback
    content = content.replace(/primasifre26\./g, 'viptransfer26.');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated leftovers in ${file}`);
  }
});
