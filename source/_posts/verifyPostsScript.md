---
title: 하루 글 10편 발행 전 점검 스크립트 — 글자 수·이미지·more 분리선·볼드 잔재를 한 번에 검사하기
categories:
  - 코드
  - 기타
tags:
  - Hexo
  - Node.js
  - 블로그운영
  - 마크다운
thumbnail: https://tuhbm.github.io/images/bnr-tool.jpg
date: 2026-11-12 08:42:00
---
## 손으로 세다가 놓친 것들

하루에 글을 여러 편 올리다 보니 빠뜨리는 게 생겼다. 글자 수가 모자란 글, 대표 이미지를 안 만든 글, `<!-- more -->`를 깜빡한 글이 대표적이다. 며칠 전에는 분량 기준(공백 제외 2,000자)에 못 미치는 글이 하루에 여러 편 나와서 배포 직전에 늘려 쓰기도 했다. 눈으로 세는 건 한계가 있어서, 날짜만 넣으면 그날 글을 전부 검사하는 스크립트를 만들었다.

<!-- more -->

## 무엇을 검사하나

기존에 쓴 [머리말 YAML 때문에 글이 사라진 이야기](/2026/10/30/hexoYamlFrontMatterPitfalls/)에서는 YAML 파싱과 글 수만 셌다. 이번에는 글 한 편마다 다음 다섯 가지를 본다.

| 점검 항목 | 기준 | 놓치면 생기는 일 |
|---|---|---|
| 본문 글자 수 | 공백 제외 2,000자 이상 | 분량 기준 미달 |
| `<!-- more -->` | 본문에 존재 | 목록에서 전문이 다 펼쳐짐 |
| 대표 이미지 | `source/images/normal/<슬러그>.png` 존재 | 글머리에 깨진 이미지 |
| 참고 기사 링크 | `v.daum.net/v/숫자` 형태 포함 | 출처 없는 글 |
| 볼드 경계 | 닫는 `**` 앞이 문장부호, 뒤가 한글인 패턴 없음 | `**`가 그대로 노출 |

볼드 건은 [마크다운 볼드가 그대로 노출될 때](/2026/10/30/markdownBoldBroken/) 글에서 원인을 정리했다. 빌드 후에 HTML을 grep해서 확인하는 방법도 있지만, 푸시 전에 원본에서 미리 잡는 편이 빠르다.

## 스크립트

레포의 `tools/verify-posts.js`로 두었다. 머리말은 Hexo가 쓰는 `js-yaml`로 파싱한다.

```js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const day = process.argv[2];            // 예: 2026-11-12
const dir = 'source/_posts';
const MIN_CHARS = 2000;
let bad = 0, total = 0;

for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r/g, '');
  const parts = src.split(/^---\s*$/m);
  let meta;
  try { meta = yaml.load(parts[1]); } catch (e) { continue; }
  const d = meta && (meta.date instanceof Date ? meta.date.toISOString() : String(meta.date));
  if (!d || !d.startsWith(day)) continue;
  total++;

  const body = parts.slice(2).join('---');
  const slug = f.replace(/\.md$/, '');
  const chars = body.replace(/\s/g, '').length;
  const problems = [];
  if (chars < MIN_CHARS) problems.push(`본문 ${chars}자`);
  if (!body.includes('<!-- more -->')) problems.push('more 분리선 없음');
  if (!fs.existsSync(`source/images/normal/${slug}.png`)) problems.push('대표 이미지 없음');
  if (!/https:\/\/v\.daum\.net\/v\/\d+/.test(body)) problems.push('참고 기사 링크 없음');

  const noCode = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const m = noCode.match(/\*\*[^*\n]*[%"')\]”’]\*\*[가-힣]/g);
  if (m) problems.push('볼드 경계 위험: ' + m[0]);

  if (problems.length) { bad++; console.log('✗', slug, '→', problems.join(' / ')); }
  else console.log('✓', slug, chars + '자');
}
console.log(`\n${day}: ${total}편 검사, 문제 ${bad}편`);
process.exit(bad ? 2 : 0);
```

## 포인트 세 가지

**1. 글자 수는 머리말을 빼고 센다.** 파일 전체를 세면 머리말 길이만큼 부풀려진다. `---` 구분선으로 쪼개서 앞의 두 조각(빈 앞부분과 머리말)을 버리고, 나머지를 합친 뒤 공백을 지운 길이를 쓴다. 본문에 `---`가 들어 있어도 `join('---')`로 다시 붙이기 때문에 안전하다.

**2. 코드 블록은 볼드 검사에서 뺀다.** 코드 안의 `**`는 예시일 뿐이라 오탐이 난다. 코드 블록과 인라인 코드를 먼저 지운 본문에서만 패턴을 찾는다.

**3. 문제가 있으면 종료 코드를 2로.** 나중에 푸시 스크립트 앞단에 붙이면 문제가 있을 때 배포 전에 멈출 수 있다.

## 실제로 돌려 본 결과

11월 12일 글 10편에 돌렸더니 전부 통과했다. 글자 수는 2,078자~2,515자 사이였다.

```
✓ naverQ3LogisticsSubsidiary 2078자
✓ nvidiaBoardJensenHuangDismissal 2515자
...
2026-11-12: 10편 검사, 문제 0편
```

통과만 보면 검사가 제대로 도는지 알 수 없어서, 일부러 결함을 심은 임시 글(본문 21자, `<!-- more -->`와 이미지 없음, `**9%**로 확정`)을 하나 만들어 돌려 보았다. 결과는 이랬다.

```
✗ zzTmpVerify → 본문 21자 (<2000) / more 분리선 없음 / 대표 이미지 없음 / 참고 기사 링크 없음 / 볼드 경계 위험: **9%**로
```

다섯 가지가 모두 잡혔고 종료 코드도 2였다. 확인 뒤 임시 글은 지웠다.

## 쓰다 보니 느낀 점

- 기준을 "눈으로 확인"에서 "스크립트가 확인"으로 바꾸니 글을 쓰는 중에도 마음이 편해졌다. 모자란 글은 기계가 먼저 말해 준다.
- 글자 수 기준은 내가 정한 값이다. 검색 노출이나 품질을 보장하는 숫자는 아니고, 일정 분량 이상을 쓰자는 내부 규칙을 지키기 위한 도구일 뿐이다.
- 이미지 파일 존재 여부만 보고, 이미지가 제대로 그려졌는지는 검사하지 못한다. 그건 여전히 눈으로 본다.
