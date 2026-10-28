import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/article.html', 'utf8');
const i = html.indexOf('data-article-view');
console.log(html.slice(i - 80, i + 400).replace(/\s+/g, ' '));
console.log('old title', html.includes('下載APP投資穩賺不賠'));
console.log('header', html.includes('<header'), 'footer', html.includes('<footer'), 'script', html.includes('site-content.js'), 'hold', html.includes('site-phone-hold'));
console.log('d_title count', html.split('d_title').length - 1);
