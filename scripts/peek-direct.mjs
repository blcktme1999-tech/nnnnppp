import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html', 'utf8');
const i = html.indexOf('data-site-phone="service"');
console.log(html.slice(i - 120, i + 700).replace(/\s+/g, ' '));
console.log('hold left', html.includes('site-phone-hold'));
const script = html.slice(html.indexOf('(function(){var data=window.__SITE_PHONES'), html.indexOf('</script>', html.indexOf('data-site-phone="report-1"')));
new Function(script);
console.log('inline ok', script.includes('\\D'), script.includes('/\\D/'));
