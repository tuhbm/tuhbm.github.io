---
title: node --check는 함수 밖 return을 통과시킨다 — 브라우저용 JS는 vm.Script로 문법 검사하기
categories:
  - 코드
  - 기타
tags:
  - Node.js
  - 빌드오류
  - 블로그운영
thumbnail: https://tuhbm.github.io/images/bnr-tool.jpg
date: 2026-11-12 14:00:00
---
## 문법 검사를 통과했는데 브라우저에서 터졌다

JS를 고치고 나서 `node --check 파일.js`로 문법을 확인하는 습관이 있다. 그런데 이 검사가 통과한 파일이 브라우저에서는 `Illegal return statement`로 죽는 걸 겪은 뒤로, 검사 방법을 바꿨다. 원인은 간단했다. `node --check`가 파일을 **CommonJS 모듈**로 파싱하기 때문이다.

<!-- more -->

## 재현해 보기

함수 밖에 `return`이 잘못 들어간 파일을 만들었다. 편집하다가 코드를 함수 바깥에 붙여 넣으면 실제로 생길 수 있는 모양이다.

```js
function run() {
  console.log('ok');
}
  return 1;   // 함수 밖 return
```

이걸 `node --check`로 검사하면 이렇게 된다.

```bash
$ node --check bad.js
$ echo $?
0
```

에러 없이 종료 코드 0이다. 문법이 맞는다고 말해 주는 셈이다. 그런데 같은 파일을 스크립트 모드로 파싱하면 얘기가 달라진다.

```bash
$ node -e "new (require('vm').Script)(require('fs').readFileSync('bad.js','utf8'))"
...
  return 1;   // 함수 밖 return
  ^^^^^^

SyntaxError: Illegal return statement
```

이쪽은 정확히 잡아낸다. 종료 코드도 1이다. 브라우저의 `<script>` 태그가 하는 방식과 같다.

## 왜 다르게 동작할까

Node의 CommonJS 모듈은 내부적으로 파일 전체를 **함수로 감싸서** 실행한다. 모듈 안에서 `require`, `module`, `exports`를 쓸 수 있는 이유도 그 래퍼 함수의 인자이기 때문이다. 파일 전체가 함수 몸통이니 최상위 `return`이 문법상 허용된다. `--check`도 같은 방식으로 파싱하니 통과하는 것이다.

반면 브라우저에서 `<script>`로 불러오는 코드는 함수 안이 아니라 **스크립트 최상위**다. 여기서 `return`은 불법이라 문법 오류가 난다. 같은 파일이 환경에 따라 합법이기도, 불법이기도 한 셈이다.

`vm.Script`는 코드를 스크립트로 컴파일하기만 하고 실행하지는 않는다. 그래서 브라우저와 같은 규칙으로 문법만 검사할 수 있다.

## 쓰는 방법

한 줄로 쓰기엔 길어서 필요하면 작은 파일로 빼 둘 수 있다.

```js
// check-browser-js.js
const fs = require('fs');
const vm = require('vm');

let bad = 0;
for (const file of process.argv.slice(2)) {
  try {
    new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file });
    console.log('OK ', file);
  } catch (e) {
    bad++;
    console.log('ERR', file, '→', e.message);
  }
}
process.exit(bad ? 1 : 0);
```

`filename` 옵션을 주면 에러 메시지에 파일 이름과 줄 번호가 정확히 나온다. 여러 파일을 한 번에 넣어도 된다.

```bash
node check-browser-js.js assets/main.js assets/search.js
```

## 정리

| 검사 방법 | 파싱 방식 | 최상위 `return` |
|---|---|---|
| `node --check 파일.js` | CommonJS 모듈 | 통과 |
| `new vm.Script(코드)` | 스크립트 | 오류 |
| 브라우저 `<script>` | 스크립트 | 오류 |

- **Node에서 돌릴 코드**라면 `node --check`로 충분하다.
- **브라우저에서 돌릴 코드**라면 `vm.Script`로 검사해야 같은 결과를 본다.
- `vm.Script`는 실행하지 않고 컴파일만 하므로 부작용이 없다. 다만 `import`/`export`를 쓰는 ES 모듈 파일에는 맞지 않는다. 그런 파일은 `.mjs`로 두고 별도로 검사해야 한다.

문법 검사 하나도 "어디서 돌릴 코드인가"에 따라 도구를 골라야 한다는 걸 다시 배웠다. 통과 표시가 떴다고 안심하기 전에, 그 도구가 내가 쓸 환경과 같은 방식으로 읽는지부터 확인하는 게 맞다.
