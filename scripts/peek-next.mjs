import fs from 'fs';
const files = [
  'C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/chief-feedback.html',
  'C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/online-report-feedback.html'
];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const i = html.indexOf('下一步');
  console.log('\nFILE', file.split('/').pop(), 'at', i);
  console.log(html.slice(Math.max(0, i - 800), i + 200).replace(/\s+/g, ' '));
}
