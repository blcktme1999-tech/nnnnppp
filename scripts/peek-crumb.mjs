import fs from 'fs';

const art = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/articles/tab01-01.html', 'utf8');
const i = art.indexOf('breadcrumb');
console.log(art.slice(i, i + 600).replace(/\s+/g, ' '));
