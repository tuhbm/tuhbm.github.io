// SVG -> PNG 변환기 (블로그 대표 이미지용)
// 사용법: node convert.js <svg폴더>  → source/images/normal/<이름>.png 로 출력
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node convert.js <svg-dir>');
  process.exit(1);
}
const outDir = path.resolve(__dirname, '../../source/images/normal');

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const svg = fs.readFileSync(path.join(dir, f), 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1536 },
    font: { loadSystemFonts: true },
    background: 'white',
  });
  const png = resvg.render().asPng();
  const out = path.join(outDir, f.replace(/\.svg$/, '.png'));
  fs.writeFileSync(out, png);
  console.log('generated:', out);
}
