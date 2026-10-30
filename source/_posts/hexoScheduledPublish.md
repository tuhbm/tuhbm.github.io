---
title: Hexo 블로그에 예약 발행 붙이기 (future 옵션 + GitHub Actions cron)
categories:
  - 코드
  - 기타
tags:
  - Hexo
  - GitHub Actions
  - 예약발행
  - cron
  - 블로그운영
thumbnail: https://tuhbm.github.io/images/bnr-tool.jpg
date: 2026-10-30 09:15:00
---
## 시작은 휴가였다

블로그에 글을 매일 올리다 보니 며칠 자리를 비울 때가 문제였다. 워드프레스나 티스토리에는 예약 발행이 기본으로 있는데 Hexo는 정적 사이트 생성기라 그런 게 없다. 글을 미리 써 두고 "내일 아침 9시에 열려라" 하는 걸 어떻게 만들지 고민하다가, 의외로 설정 한 줄과 워크플로 몇 줄로 끝나서 정리해 둔다.

## 원리부터

Hexo는 `hexo generate` 할 때 글의 `date`가 **현재 시각보다 미래**면 기본적으로 건너뛴다. `_config.yml`에 이런 옵션이 있다.

```yaml
future: false   # 미래 날짜 글은 빌드에서 제외
```

Hexo의 기본값은 `true`라서 미래 날짜 글도 그냥 빌드된다. 나는 일부러 `false`를 명시해 뒀다. 이러면 글 머리말에 `date: 2026-10-30 13:30:00`을 적어 두고 푸시해도, 13시 30분 전에 빌드된 결과물에는 그 글이 없다.

여기까지는 "숨기기"일 뿐이다. 시간이 지나서 **다시 빌드**를 돌려줘야 글이 나타난다. 그래서 필요한 게 정해진 시각마다 빌드를 돌려주는 스케줄러였고, 이미 GitHub Actions로 배포하고 있어서 `schedule` 트리거를 추가했다.

## 워크플로

내 구조는 이렇다. 소스는 `gh-pages` 브랜치에 있고, Actions가 빌드해서 `master`에 올린다. 거기에 cron만 붙이면 된다.

```yaml
on:
  push:
    branches: [ gh-pages ]
  schedule:
    - cron: '17,47 0-5 * * *'
  workflow_dispatch:
```

cron 표현에서 주의할 점이 몇 가지 있었다.

- **UTC 기준**이다. `0-5`시는 한국 시간으로 09~14시다. 아침 9시부터 오후 2시까지 30분 간격으로 돈다.
- 분을 `0,30`이 아니라 **17, 47**로 잡았다. 정각 언저리에는 전 세계 예약 실행이 몰려서 늦게 돌거나 가끔 빠진다는 얘기를 봐서 일부러 피했다. 실제로 17분, 47분으로 바꾼 뒤로는 큰 문제가 없었다.
- 그래도 GitHub 부하에 따라 몇 분에서 수십 분 늦을 수 있다. 정확히 13시 30분 땡에 열리는 건 아니고, 13시 30분 이후 첫 번째 빌드에서 열린다고 생각하면 마음이 편하다.
- `workflow_dispatch`를 같이 넣어 두면 급할 때 Actions 탭에서 수동으로 돌릴 수 있다.

푸시 빌드와 예약 빌드가 겹치면 `master` 푸시가 충돌할 수 있어서 동시 실행 그룹도 걸어 뒀다.

```yaml
concurrency:
  group: deploy-master
  cancel-in-progress: false
```

`cancel-in-progress: false`가 포인트다. 이미 돌고 있는 빌드를 죽이지 않고 뒤에 오는 걸 기다리게 한다.

## 삽질 두 개

### 1. 타임존

한국 시간 기준으로 돌리려면 보통 `_config.yml`에 `timezone: Asia/Seoul`을 넣는다. 그런데 Actions 러너는 UTC라서, 이 설정을 켜면 새벽 0시부터 9시 사이에 올린 글 9편의 **퍼머링크 날짜가 하루 앞당겨진다.** 글 주소에 날짜가 들어가는 구조라서 기존 URL이 깨지는 일이다. 그래서 이 방법은 쓰지 않았다.

결국 설정 대신 빌드 단계에서 환경변수로 풀었다.

```yaml
- name: Build Hexo
  env:
    TZ: Asia/Seoul
  run: |
    npx hexo clean
    npx hexo generate
```

`TZ=Asia/Seoul`이면 날짜 해석도 퍼머링크도 모두 한국 시간이라 로컬(Windows) 빌드 결과와 똑같다. 기존 URL도 그대로다.

### 2. npm ci가 실패한다

러너에서 `npm ci`가 `Missing: chokidar@3.6.0 from lock file` 같은 메시지를 뱉으며 죽었다. 원인은 내 로컬 npm(11)이 만든 `package-lock.json`을 Node 20에 딸린 npm 10이 읽지 못해서였다. 워크플로의 Node를 24로 올렸더니 해결됐다. lock 파일을 만든 npm 메이저 버전과 CI의 npm 버전을 맞춰야 한다는 교훈.

## 로컬에서 예약 글까지 확인하기

`future: false`의 부작용은 로컬에서 `hexo generate`를 돌려도 예약 글이 안 보인다는 것이다. 맞게 쓴 건지 확인이 안 되니 불안했다. 그래서 설정을 코드로 덮어쓰는 작은 스크립트를 만들었다.

```js
// tools/preview-future.js
const Hexo = require('hexo');
const hexo = new Hexo(process.cwd(), {});
hexo.init()
  .then(() => { hexo.config.future = true; return hexo.call('generate', {}); })
  .then(() => hexo.exit())
  .catch(err => hexo.exit(err));
```

`hexo clean` 하고 `node tools/preview-future.js`를 돌리면 예약 글까지 `public/`에 만들어진다. 글 수나 깨진 곳을 이걸로 확인한 뒤에 푸시한다.

## 쓰다 보니 알게 된 것들

- 예약 시각이 지났는데 안 열렸다면 대개 아직 다음 cron이 안 돈 것이다. 급하면 `workflow_dispatch`로 수동 실행하면 된다.
- 반대로 "지금 당장 열어야지" 싶으면 글의 `date`를 현재보다 과거로 바꿔서 푸시하면 된다. 푸시 트리거가 바로 빌드를 돌린다.
- 배포 직후에는 CDN이 반영되는 데 1~2분 걸려 404가 한두 번 뜰 수 있다. 놀라지 말고 한 번 더 확인하면 된다.

설정은 간단한데 시간대와 npm 버전에서 시간을 꽤 썼다. 비슷하게 Actions로 정적 사이트를 배포하는 분이라면 이 두 가지는 미리 체크해 보면 좋겠다.
