import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/online-report-feedback.html', 'utf8');
console.log('script', html.includes('/public/site-content.js'));
console.log('csp self', html.includes("script-src"));
const i = html.indexOf('下一步');
console.log(html.slice(i - 500, i + 120).replace(/\s+/g, ' '));
const h = html.indexOf('class=p_title');
console.log('title', html.slice(h, h + 120).replace(/\s+/g, ' '));
