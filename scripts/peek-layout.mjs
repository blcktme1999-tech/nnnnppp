import fs from 'fs';

const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html', 'utf8');
const i = html.indexOf('服務電話');
console.log('PHONE', html.slice(Math.max(0, i - 400), i + 500));
const art = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/articles/tab01-01.html', 'utf8');
console.log('LEN', art.length);
console.log('MARKS', ['d_title', 'editor', '<footer', '<header', 'site-content.js'].map((key) => [key, art.includes(key)]));
const t = art.search(/d_title|class=["']?editor/);
console.log('BODY', art.slice(Math.max(0, t - 250), t + 500));
