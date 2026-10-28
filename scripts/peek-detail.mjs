import fs from 'fs';

const art = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/articles/tab01-01.html', 'utf8');
const start = art.indexOf('<h2 class=p_title>');
console.log('start', start);
console.log(art.slice(start, start + 350).replace(/\s+/g, ' '));
const detail = art.indexOf('<div class=detail>');
console.log('detail delta', detail - start);
