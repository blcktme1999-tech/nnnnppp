import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy';
const style = '<style id=site-phone-hold>html:not(.site-phones-ready) .info>.left>p:has([data-site-phone]){visibility:hidden}</style>';
const oldScript = /<script>\(function\(\)\{var data=window\.__SITE_PHONES;if\(!data\)return;[\s\S]*?\}\)\(\);<\/script>/;
const nextScript = '<script>(function(){var data=window.__SITE_PHONES;if(!data||!data.servicePhone)return;var service=document.querySelector(\'[data-site-phone="service"]\');if(service)service.textContent=data.servicePhone;(data.reportPhones||[]).forEach(function(phone,index){var link=document.querySelector(\'[data-site-phone="report-\'+index+\'"]\');if(!link||!phone)return;link.textContent=phone;var digits=String(phone).replace(/\\D/g,"");if(digits)link.setAttribute("href","tel:"+digits);});document.documentElement.classList.add("site-phones-ready");})();</script>';
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
  if (!html.includes('data-site-phone="service"')) continue;
  if (!oldScript.test(html)) {
    missed += 1;
    continue;
  }
  html = html.replace(oldScript, nextScript);
  if (!html.includes('id=site-phone-hold')) {
    html = html.replace(/<html\b[^>]*>/i, (tag) => `${tag}${style}`);
  }
  fs.writeFileSync(file, html);
  updated += 1;
}
console.log('updated', updated, 'missed', missed);
