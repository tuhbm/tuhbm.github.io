// 블로그 대표 이미지 SVG 생성기 (카드형 인포그래픽 템플릿)
// 사용법: node make.js <jobs.json> <출력폴더>
//   jobs.json: [{ slug, category, categoryEn, theme, badge, title, subtitle,
//                 cards: [{icon, stat, sub}] x3, illust: "<SVG 스니펫 (중앙 일러스트, y 420~700 영역)>" }]
// 이후 tools/svg2png/convert.js 로 PNG 변환한다.
const fs = require('fs');
const path = require('path');

const THEMES = {
  economy:  { g1: '#3d7bfa', g2: '#1e4fd6', circle: '#2f62e0', accent: '#ffd764', sub: '#dbe6ff' },
  world:    { g1: '#5a6683', g2: '#3f4a63', circle: '#4a5570', accent: '#f2b04e', sub: '#dfe4f2' },
  society:  { g1: '#12a5a0', g2: '#0b7d7d', circle: '#0f918e', accent: '#ffd764', sub: '#d8f4f0' },
  culture:  { g1: '#f2705b', g2: '#d9412f', circle: '#e05a44', accent: '#ffd764', sub: '#ffe3da' },
  tech:     { g1: '#7a68f0', g2: '#5540d9', circle: '#6753e6', accent: '#ffd764', sub: '#e4defc' },
  sports:   { g1: '#2fae63', g2: '#1c7f46', circle: '#279755', accent: '#ffd764', sub: '#d9f3e2' },
  realty:   { g1: '#3a8fd9', g2: '#1f5fa8', circle: '#2f7cc4', accent: '#ffd764', sub: '#d9ecfc' },
  science:  { g1: '#3b4a8c', g2: '#232f63', circle: '#303f7d', accent: '#ffd764', sub: '#dbe1f7' },
};

const FONT = 'Apple SD Gothic Neo, Malgun Gothic, Noto Sans KR, sans-serif';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sparkle(cx, cy, r, fill, opacity = 1) {
  return `<path d="M ${cx} ${cy - r} C ${cx + r * 0.12} ${cy - r * 0.3} ${cx + r * 0.3} ${cy - r * 0.12} ${cx + r} ${cy} C ${cx + r * 0.3} ${cy + r * 0.12} ${cx + r * 0.12} ${cy + r * 0.3} ${cx} ${cy + r} C ${cx - r * 0.12} ${cy + r * 0.3} ${cx - r * 0.3} ${cy + r * 0.12} ${cx - r} ${cy} C ${cx - r * 0.3} ${cy - r * 0.12} ${cx - r * 0.12} ${cy - r * 0.3} ${cx} ${cy - r} Z" fill="${fill}" opacity="${opacity}"/>`;
}

function card(x, c) {
  return `
  <g>
    <rect x="${x}" y="712" width="325" height="196" rx="22" fill="#ffffff"/>
    <circle cx="${x + 162.5}" cy="772" r="33" fill="#eef1fb"/>
    <text x="${x + 162.5}" y="785" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="30" fill="#4a5cc0">${esc(c.icon)}</text>
    <text x="${x + 162.5}" y="852" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="33" fill="#22293a">${esc(c.stat)}</text>
    <text x="${x + 162.5}" y="890" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="26" fill="#7a8194">${esc(c.sub)}</text>
  </g>`;
}

function render(job) {
  const t = THEMES[job.theme] || THEMES.economy;
  const cardXs = [270, 607, 944];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.g1}"/>
      <stop offset="1" stop-color="${t.g2}"/>
    </linearGradient>
    <linearGradient id="badge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f8ce4f"/>
      <stop offset="1" stop-color="#f0a43c"/>
    </linearGradient>
  </defs>
  <rect width="1536" height="1024" fill="url(#bg)"/>
  <circle cx="1330" cy="140" r="330" fill="${t.circle}" opacity="0.55"/>
  <circle cx="120" cy="900" r="360" fill="#000000" opacity="0.10"/>
  <circle cx="1400" cy="880" r="180" fill="${t.circle}" opacity="0.5"/>
  ${sparkle(213, 363, 34, t.accent)}
  ${sparkle(1272, 152, 26, t.accent)}
  ${sparkle(1334, 447, 20, t.accent)}
  <g opacity="0.16" fill="#ffffff">
    <rect x="118" y="152" width="64" height="18" rx="4"/>
    <rect x="141" y="129" width="18" height="64" rx="4"/>
  </g>

  <text x="768" y="86" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="34" fill="#ffffff" letter-spacing="14">${esc(job.category)}</text>
  <text x="768" y="124" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="22" fill="#ffffff" opacity="0.75" letter-spacing="8">${esc(job.categoryEn)}</text>
  <rect x="688" y="140" width="160" height="2" fill="#ffffff" opacity="0.4"/>

  <g>
    <rect x="${768 - (job.badge.length * 34 + 90) / 2}" y="170" width="${job.badge.length * 34 + 90}" height="64" rx="32" fill="url(#badge)"/>
    <text x="768" y="214" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="34" fill="#5a3a10" letter-spacing="4">${esc(job.badge)}</text>
  </g>

  <text x="768" y="322" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${job.titleSize || 90}" fill="#ffffff">${esc(job.title)}</text>
  <text x="768" y="392" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="35" fill="${t.sub}">${esc(job.subtitle)}</text>

  ${job.illust || ''}

  ${job.cards.map((c, i) => card(cardXs[i], c)).join('')}

  <text x="768" y="1000" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="29" fill="#ffffff" opacity="0.92" letter-spacing="3">코드머니 브리핑 · tuhbm.github.io</text>
</svg>`;
}

const [jobsFile, outDir] = process.argv.slice(2);
if (!jobsFile || !outDir) {
  console.error('usage: node make.js <jobs.json> <out-dir>');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
for (const job of jobs) {
  const out = path.join(outDir, `${job.slug}.svg`);
  fs.writeFileSync(out, render(job));
  console.log('svg:', out);
}
