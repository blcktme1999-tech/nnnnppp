import fs from 'fs';

const art = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/announcements/articles/tab01-01.html', 'utf8');
let from = 0;
let n = 0;
while (n < 6) {
  const i = art.indexOf('class=editor', from);
  const q = art.indexOf('class="editor"', from);
  const hit = [i, q].filter((value) => value >= 0).sort((a, b) => a - b)[0];
  if (hit == null) break;
  console.log('\n#', n, 'at', hit);
  console.log(art.slice(Math.max(0, hit - 120), hit + 180).replace(/\s+/g, ' '));
  from = hit + 10;
  n += 1;
}

const index = fs.readFileSync('C:/Users/Administrator/Desktop/miba/new-main-deploy/index.html', 'utf8');
const head = index.slice(0, 800).replace(/\s+/g, ' ');
console.log('\nHEAD', head.slice(0, 500));
