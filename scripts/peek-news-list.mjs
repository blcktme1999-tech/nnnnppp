import fs from 'fs';
const index = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html', 'utf8');
const style = index.indexOf('id=site-phone-hold');
console.log(index.slice(style, style + 260));
const news = index.indexOf('class="news list_A"');
console.log('news', news, index.slice(news, news + 80));
const list = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/breaking-news.html', 'utf8');
console.log('listImage', list.includes('listImageNum'), 'news-index', list.includes('news-index'), 'phone hold', list.includes('site-phone-hold'));
