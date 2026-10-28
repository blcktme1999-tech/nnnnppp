import fs from 'fs';
const html = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services/chief-feedback.html', 'utf8');
for (const word of ['dataform', 'getElementById("a01")', "getElementById('a01')", '下一步', 'a01']) {
  let count = 0;
  let from = 0;
  while (count < 3) {
    const i = html.indexOf(word, from);
    if (i < 0) break;
    if (word === 'a01' && i < 240000) { from = i + word.length; continue; }
    console.log('\n', word, i, html.slice(i - 80, i + 180).replace(/\s+/g, ' '));
    from = i + word.length;
    count += 1;
  }
}
