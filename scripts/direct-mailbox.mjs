import fs from 'fs';
import path from 'path';

const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy';
const replacements = [
  ['/public-services/chief-mailbox.html', '/public-services/chief-feedback.html'],
  ['/public-services/online-report-mailbox.html', '/public-services/online-report-feedback.html']
];
const skip = new Set(['node_modules', '.git']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) files.push(full);
  }
  return files;
}

let files = 0;
let hits = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  let next = html;
  for (const [from, to] of replacements) {
    if (!next.includes(from)) continue;
    const count = next.split(from).length - 1;
    hits += count;
    next = next.split(from).join(to);
  }
  if (next === html) continue;
  fs.writeFileSync(file, next);
  files += 1;
}

function redirect(title, target) {
  return `<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=${target}">
<title>${title}</title>
<script>location.replace(${JSON.stringify(target)})</script>
</head>
<body>
<p><a href="${target}">${title}</a></p>
</body>
</html>
`;
}

fs.writeFileSync(path.join(root, 'public-services/chief-mailbox.html'), redirect('局長信箱', '/public-services/chief-feedback.html'));
fs.writeFileSync(path.join(root, 'public-services/online-report-mailbox.html'), redirect('線上檢舉信箱', '/public-services/online-report-feedback.html'));
console.log('files', files, 'links', hits);
