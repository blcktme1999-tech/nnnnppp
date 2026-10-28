import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy';
const hold = /<style id=site-phone-hold>[\s\S]*?<\/style>(?:<script>setTimeout\(function\(\)\{document\.documentElement\.classList\.add\("site-phones-ready"\)\},8000\)<\/script>)?/;
const phones = /<p>\s*偵防中心服務電話:\s*\(02\)27652122~5\s*<\/p>\s*<p>\s*檢舉電話:\s*<a href="?tel:0227661919"?>\(02\)27661919<\/a>\s*,\s*<a href="?tel:0227668989"?>\(02\)27668989<\/a>\s*<\/p>/;
const block = `<script src="/api/site-phones"></script><p>偵防中心服務電話: <span data-site-phone="service">(02)27652122~5</span></p><p>檢舉電話: <a data-site-phone="report-0" href="tel:0227661919">(02)27661919</a>, <a data-site-phone="report-1" href="tel:0227668989">(02)27668989</a></p><script>(function(){var data=window.__SITE_PHONES;if(!data)return;var service=document.querySelector('[data-site-phone="service"]');if(service&&data.servicePhone)service.textContent=data.servicePhone;(data.reportPhones||[]).forEach(function(phone,index){var link=document.querySelector('[data-site-phone="report-'+index+'"]');if(!link||!phone)return;link.textContent=phone;var digits=String(phone).replace(/\\D/g,"");if(digits)link.setAttribute("href","tel:"+digits);});})();</script>`;
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
let missed = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  const nextHold = html.replace(hold, '');
  if (!html.includes('偵防中心服務電話')) {
    if (nextHold !== html) {
      fs.writeFileSync(file, nextHold);
      updated += 1;
    }
    continue;
  }
  if (html.includes('data-site-phone="service"')) {
    if (nextHold !== html) {
      fs.writeFileSync(file, nextHold);
      updated += 1;
    }
    continue;
  }
  if (!phones.test(html)) {
    missed += 1;
    continue;
  }
  html = nextHold.replace(phones, block);
  fs.writeFileSync(file, html);
  updated += 1;
}
console.log('updated', updated, 'missed', missed);
