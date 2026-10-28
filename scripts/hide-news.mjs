import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy';
const addition = 'html:not(.site-news-ready) .news.list_A>ul,html:not(.site-news-ready) ul.news-index,html:not(.site-news-ready) ul:has(a[id^=listImageNum]){visibility:hidden}';
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
  if (!html.includes('id=site-phone-hold') || html.includes('site-news-ready')) continue;
  html = html.replace('id=site-phone-hold>', `id=site-phone-hold>${addition}`);
  fs.writeFileSync(file, html);
  updated += 1;
}
console.log('updated', updated);
