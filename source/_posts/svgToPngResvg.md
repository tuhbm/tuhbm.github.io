---
title: 블로그 대표 이미지를 SVG로 만들고 resvg로 PNG 변환하기 (한글 폰트와 삽질 기록)
categories:
  - 코드
  - 기타
tags:
  - SVG
  - resvg
  - Node.js
  - 이미지자동화
  - 한글폰트
thumbnail: https://tuhbm.github.io/images/bnr-tool.jpg
date: 2026-10-30 09:19:00
---
## 왜 SVG로 만들었나

글마다 대표 이미지를 붙이고 싶었다. 디자인 툴을 열어서 하나씩 만들면 하루에 여러 편 올리는 속도를 못 따라간다. 그래서 틀을 코드로 만들고 숫자와 문구만 바꿔 끼우는 방식으로 갔다. SVG는 텍스트 파일이라 코드로 찍어내기 좋고, 마지막에 PNG로만 바꾸면 어디서든 열린다.

흐름은 단순하다. 문구를 담은 JSON을 읽어서 SVG를 만들고, 그걸 PNG로 변환해 `source/images`에 둔다.

<!-- more -->

## 변환은 resvg

브라우저 없이 Node에서 SVG를 PNG로 바꿔 주는 라이브러리를 찾다가 `@resvg/resvg-js`를 골랐다. 헤드리스 브라우저를 띄우는 것보다 가볍고 빠르다. 변환 코드는 이게 전부다.

```js
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const svg = fs.readFileSync('card.svg', 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1536 },
  font: { loadSystemFonts: true },
  background: 'white',
});
fs.writeFileSync('card.png', resvg.render().asPng());
```

옵션 세 개만 짚는다.

- `fitTo`: 결과 너비를 1536px로 맞춘다. SVG의 viewBox 비율은 그대로 유지된다.
- `font.loadSystemFonts`: **시스템에 설치된 폰트를 불러온다.** 한글이 나오게 하려면 사실상 필수다.
- `background`: 투명 배경 대신 흰 배경으로 깔아 준다.

## 한글이 네모로 나왔다

한글을 그냥 쓰면 글자가 □로 나오거나 빠질 수 있다. 원인은 단순하다. resvg는 브라우저가 아니라서 웹폰트나 CSS 폴백을 알아서 해 주지 않는다. `loadSystemFonts: true`를 켜고, SVG의 텍스트에 **폰트 이름을 직접** 적어 줘야 한다.

```xml
<text font-family="'Malgun Gothic', Arial, sans-serif" font-size="48" fill="#fff">
  한글 제목
</text>
```

Windows에서는 `Malgun Gothic`(맑은 고딕)이 기본으로 있어서 이게 잘 통했다. 다른 OS에서 돌릴 때는 거기 설치된 한글 폰트 이름으로 바꿔야 한다. 한글은 글자 폭도 넓어서, 알약 모양 배경(rect)을 영문 기준으로 잡았다가 글자가 삐져나오는 일이 잦았다. `text-anchor="middle"`로 가운데 정렬하고 배경은 넉넉히 잡는 게 마음 편하다.

## 요소가 통째로 사라지는 함정들

변환은 에러 없이 끝났는데 이미지에서 뭔가 빠져 있는 경우가 제일 힘들었다. 겪은 것만 적는다.

**1. 속성값 끝의 공백.** `width="180 "`처럼 끝에 공백이 하나 들어가면 그 요소가 통째로 안 그려졌다. 템플릿 문자열로 숫자를 이어 붙이다가 생겼다. 에러가 안 나서 찾는 데 오래 걸렸다.

**2. `&` 문자.** 문구에 `R&D`를 넣었더니 SVG 자체가 파싱에 실패했다. XML이라서 `&`는 `&amp;`로 써야 한다.

**3. id 충돌.** 이게 제일 헷갈렸다. 그라데이션과 그림자 필터가 **같은 id**를 쓰면 한쪽이 무시돼서 도형이 안 보이거나 검게 나왔다. 공통 필터를 정의해 두는 함수가 있었는데, 거기서 쓰는 id와 내가 새로 만든 그라데이션 id가 겹친 것이었다. 접두어 규칙을 정해서 겹치지 않게 했다.

**4. 겹쳐 그리는 순서.** SVG는 나중에 그린 게 위에 올라온다. 텍스트가 도형 뒤에 가려져서 안 보이면 코드 순서를 바꾸면 된다.

## 결과를 꼭 눈으로 본다

자동화를 해 놓으면 결과를 안 보고 넘기고 싶어지는데, 그림은 코드가 맞아도 글자가 넘치거나 카드에 가려지는 일이 생긴다. 나는 변환 직후 PNG를 직접 열어서 텍스트가 카드 밖으로 나가지 않는지, 요소가 서로 겹치지 않는지 확인한다. 문구 길이는 칩이나 카드 폭에 맞춰 짧게 줄이는 쪽으로 정리했다.

## 정리

- `@resvg/resvg-js`로 Node만으로 SVG → PNG 변환이 된다.
- 한글은 `loadSystemFonts: true`와 `font-family` 지정이 둘 다 필요하다.
- 에러 없이 요소가 사라지면 속성값 공백, `&`, id 충돌부터 의심한다.
- 만든 이미지는 반드시 눈으로 확인한다.

글마다 다른 이미지를 붙이는 일이 이제는 JSON 한 줄 고치는 일로 바뀌어서, 매일 글을 올리는 부담이 많이 줄었다.
