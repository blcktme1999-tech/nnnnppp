import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/chief-mailbox.html', 'utf8');
const needle = '反映意見';
let from = 0;
let n = 0;
while (n < 12) {
  const i = html.indexOf(needle, from);
  if (i < 0) break;
  const slice = html.slice(Math.max(0, i - 220), i + 30).replace(/\s+/g, ' ');
  if (!slice.includes('cib-public-services-menu') && !slice.includes('title="反映意見">反映意見')) {
    console.log('\n#', n, slice);
  } else if (slice.includes('class=') && !slice.includes('cib-service-menu')) {
    console.log('\nMENUISH', n, slice.slice(-180));
  }
  from = i + needle.length;
  n += 1;
}
console.log('total scanned', n);
