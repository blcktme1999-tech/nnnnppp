import fs from 'fs';

const files = [
  'C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html',
  'C:/Users/Administrator/Desktop/miba/new-main-deploy/agency-introduction-pages/prevention-division.html',
  'C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/breaking-news.html'
];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const i = html.indexOf('服務電話');
  console.log('\nFILE', file.split('/').pop(), 'has left', html.includes('class=left'), 'count', html.split('服務電話').length - 1);
  console.log(html.slice(Math.max(0, i - 180), i + 220).replace(/\s+/g, ' '));
}
