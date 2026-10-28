import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html', 'utf8');
let from = 0;
let n = 0;
while (n < 3) {
  const i = html.indexOf('局長信箱', from);
  if (i < 0) break;
  console.log('\n#', n, html.slice(i - 220, i + 180).replace(/\s+/g, ' '));
  from = i + 4;
  n += 1;
}
