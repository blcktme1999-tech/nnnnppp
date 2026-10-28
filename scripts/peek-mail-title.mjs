import fs from 'fs';
const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services';
for (const name of ['chief-feedback.html', 'online-report-feedback.html']) {
  const html = fs.readFileSync(`${root}/${name}`, 'utf8');
  const title = html.match(/<title>[^<]*<\/title>/);
  const h = html.indexOf('class=p_title');
  console.log('\n', name, title?.[0]);
  console.log(html.slice(h, h + 250).replace(/\s+/g, ' '));
}
