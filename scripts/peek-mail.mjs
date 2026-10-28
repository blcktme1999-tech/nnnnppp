import fs from 'fs';

function hits(file, words) {
  const html = fs.readFileSync(file, 'utf8');
  console.log('\n', file.split('/').pop(), html.length);
  for (const word of words) console.log(word, html.includes(word));
}

const root = 'C:/Users/Administrator/Desktop/miba/new-main-deploy/public-services';
for (const name of ['chief-mailbox.html', 'chief-feedback.html', 'online-report-mailbox.html', 'online-report-feedback.html']) {
  hits(`${root}/${name}`, ['反映意見', '姓名', '聯絡電話', '電子信箱', '檢舉內容', 'input']);
}
