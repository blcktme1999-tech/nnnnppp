import fs from 'fs';
const index = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html', 'utf8');
const i = index.indexOf('title="局長信箱"');
console.log(index.slice(i - 80, i + 160).replace(/\s+/g, ' '));
const j = index.indexOf('title="線上檢舉信箱"');
console.log(index.slice(j - 80, j + 160).replace(/\s+/g, ' '));
console.log('old chief links', index.includes('chief-mailbox.html'));
console.log('old report links', index.includes('online-report-mailbox.html'));
console.log('redirect', fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/chief-mailbox.html', 'utf8').slice(0, 180));
