import fs from 'fs';

const sourcePath = 'C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/articles/tab01-01.html';
const targetPath = 'C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/article.html';
const html = fs.readFileSync(sourcePath, 'utf8');
const start = html.indexOf('<h2 class=p_title>');
const apStart = html.indexOf('<div class=ap>', start);
if (start < 0 || apStart < 0) throw new Error('article template markers missing');

function elementEnd(markup, from) {
  const token = /<div\b|<\/div>/g;
  token.lastIndex = from;
  let depth = 0;
  let match;
  while ((match = token.exec(markup))) {
    depth += match[0] === '</div>' ? -1 : 1;
    if (depth === 0) return match.index + match[0].length;
  }
  throw new Error('unclosed div');
}

const apEnd = elementEnd(html, apStart);
const slot = '<div data-article-view><p>載入新聞中…</p></div>';
let next = html.slice(0, start) + slot + html.slice(apEnd);
next = next.replace(/<title>[^<]*<\/title>/, '<title>新聞</title>');
fs.writeFileSync(targetPath, next);
console.log('article.html', next.length, 'replaced', apEnd - start);
