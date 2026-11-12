// 사용: node tools/verify-posts.js 2026-11-12
// 해당 날짜(YYYY-MM-DD)로 시작하는 글의 발행 전 점검: 본문 글자 수, <!-- more -->, 대표 이미지, 참고 링크, 볼드(**) 잔재
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const day = process.argv[2];
if (!day) { console.log('날짜를 넣어 주세요 (예: 2026-11-12)'); process.exit(1); }

const dir = 'source/_posts';
const MIN_CHARS = 2000;
let bad = 0, total = 0;

for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r/g, '');
  const parts = src.split(/^---\s*$/m);
  let meta;
  try { meta = yaml.load(parts[1]); } catch (e) { continue; }
  if (!meta || !String(meta.date instanceof Date ? meta.date.toISOString() : meta.date).startsWith(day)) continue;
  total++;

  const body = parts.slice(2).join('---');
  const chars = body.replace(/\s/g, '').length;
  const slug = f.replace(/\.md$/, '');
  const problems = [];
  if (chars < MIN_CHARS) problems.push(`본문 ${chars}자 (<${MIN_CHARS})`);
  if (!body.includes('<!-- more -->')) problems.push('more 분리선 없음');
  if (!fs.existsSync(`source/images/normal/${slug}.png`)) problems.push('대표 이미지 없음');
  if (!/https:\/\/v\.daum\.net\/v\/\d+/.test(body)) problems.push('참고 기사 링크 없음');
  // 코드 블록을 뺀 본문에 ** 가 남아 있는지(닫는 ** 가 문장부호+한글 조합이면 렌더 실패)
  const noCode = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const m = noCode.match(/\*\*[^*\n]*[%"')\]”’]\*\*[가-힣]/g);
  if (m) problems.push('볼드 경계 위험: ' + m[0]);

  if (problems.length) { bad++; console.log('✗', slug, '→', problems.join(' / ')); }
  else console.log('✓', slug, chars + '자');
}
console.log(`\n${day}: ${total}편 검사, 문제 ${bad}편`);
process.exit(bad ? 2 : 0);
