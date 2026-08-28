// Gemini 이미지 생성기 — 블로그 대표 이미지 (loneStar 카툰 스타일)
// 사용법: node generate.js <jobs.json>
//   jobs.json: [{ "slug": "busFareHike2026", "scene": "장면 묘사 (한국어)" }, ...]
// 필요: 환경변수 GEMINI_API_KEY (절대 파일로 저장하지 말 것 — 이 레포는 소스가 public으로 푸시됨)
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('GEMINI_API_KEY 환경변수가 없습니다.');
  process.exit(1);
}
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const OUT_DIR = path.resolve(__dirname, '../../source/images/normal');

// 블로그 전용 고정 스타일 (loneStar.png 기준)
const STYLE = [
  '따뜻한 크림색 단색 배경의 카툰 일러스트.',
  '굵고 부드러운 갈색 외곽선, 플랫한 채색, 미묘한 종이 질감.',
  '단순하지만 표정이 살아있는 캐릭터, 유머러스하고 친근한 분위기.',
  '편집 일러스트(신문 삽화) 스타일, 과도한 디테일 없이 깔끔하게.',
  '이미지 안의 글자는 반드시 한국어로, 짧은 팻말/라벨 형태로만. 철자가 정확해야 함.',
  '3:2 가로 구도, 인물 실명/실존 인물 얼굴 묘사 금지.',
].join(' ');

async function generate(job) {
  const body = {
    contents: [{ parts: [{ text: `${STYLE}\n\n장면: ${job.scene}` }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '3:2' } },
  };
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error(`${job.slug}: HTTP ${res.status} ${await res.text()}`);
  const data = await res.json();
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error(`${job.slug}: 응답에 이미지 없음 ${JSON.stringify(data).slice(0, 300)}`);
  const out = path.join(OUT_DIR, `${job.slug}.png`);
  fs.writeFileSync(out, Buffer.from(part.inlineData.data, 'base64'));
  console.log('generated:', out);
}

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  let failed = 0;
  for (const job of jobs) {
    try {
      await generate(job);
    } catch (e) {
      failed++;
      console.error('FAILED', e.message);
    }
  }
  if (failed) {
    console.error(`${failed}건 실패 — 실패분은 SVG 폴백으로 생성할 것`);
    process.exit(2);
  }
})();
