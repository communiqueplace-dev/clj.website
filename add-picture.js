const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'media.html',
  'about.html',
  'custom.html',
];

for (const file of files) {
  const fp = path.join(__dirname, file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  // Wrap any <img ... src="assets/looks/*.jpg" ...> or <img ... src="assets/catalog/*.jpg" ...>
  // with <picture><source type="image/webp" srcset="...webp"><img ...></picture>
  // Skip if already inside a <picture>
  html = html.replace(
    /(<img\b[^>]*?\bsrc="(assets\/(?:looks|catalog)\/[^"]+\.jpg)"[^>]*>)/g,
    (match, imgTag, src) => {
      // Don't double-wrap
      return `<picture><source type="image/webp" srcset="${src.replace(/\.jpg$/, '.webp')}"><\/source>${imgTag}<\/picture>`;
    }
  );

  if (html !== orig) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓', file);
  } else {
    console.log('—', file, '(no change)');
  }
}
