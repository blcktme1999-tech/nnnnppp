import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy';
const style = '<style id=site-phone-hold>html:not(.site-phones-ready) .info>.left>p:nth-child(2),html:not(.site-phones-ready) .info>.left>p:nth-child(3){visibility:hidden}</style><script>setTimeout(function(){document.documentElement.classList.add("site-phones-ready")},8000)</script>';
const skip = new Set(['node_modules', '.git']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let updated = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('服務電話') || !/<html\b/i.test(html)) continue;
  if (html.includes('id=site-phone-hold')) {
    html = html.replace(/<style id=site-phone-hold>[\s\S]*?<\/style>(?:<script>setTimeout\(function\(\)\{document\.documentElement\.classList\.add\("site-phones-ready"\)\},8000\)<\/script>)?/, style);
  } else {
    html = html.replace(/<html\b[^>]*>/i, (tag) => `${tag}${style}`);
  }
  fs.writeFileSync(file, html);
  updated += 1;
}
console.log('phone hold', updated);
