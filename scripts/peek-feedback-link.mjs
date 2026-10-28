import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/chief-mailbox.html', 'utf8');
let from = 0;
let n = 0;
while (n < 4) {
  const i = html.indexOf('反映意見', from);
  if (i < 0) break;
  console.log('\n#', n, html.slice(i - 160, i + 40).replace(/\s+/g, ' '));
  from = i + 4;
  n += 1;
}
