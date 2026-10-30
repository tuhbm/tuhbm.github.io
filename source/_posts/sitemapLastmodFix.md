---
title: sitemap의 lastmod가 배포할 때마다 바뀌는 이유 (Hexo)
categories:
  - 코드
  - 기타
tags:
  - Hexo
  - sitemap
  - lastmod
  - SEO
  - 서치콘솔
thumbnail: https://tuhbm.github.io/images/bnr-tool.jpg
date: 2026-10-30 09:16:00
---
## 증상

어느 날 사이트맵을 열어 보니 이상했다. 새로 쓴 글이 아닌데도 모든 URL의 `<lastmod>`가 **마지막 배포 날짜**로 찍혀 있었다. 글은 하나도 안 고쳤는데 배포할 때마다 전부 "방금 수정됨"이 되는 것이다.

`lastmod`는 검색엔진에 "이 페이지 내용이 언제 바뀌었는지" 알려 주는 값이다. 전부 오늘 날짜로 나오면 검색엔진 입장에서는 믿을 수 없는 값이 되고, 크롤링 우선순위에도 도움이 안 된다. 새로 생기거나 실제로 고친 글만 날짜가 바뀌어야 맞다.

## 범위부터 좁혔다

사이트맵은 `hexo-generator-sitemap`이 만든다. 이 플러그인은 글의 `updated` 값을 `lastmod`로 쓴다. 그럼 `updated`는 어디서 올까.

Hexo는 글 머리말에 `updated`가 없으면 기본적으로 **파일의 수정 시각**(mtime)을 쓴다. 문제는 여기였다. 내 배포는 GitHub Actions가 매번 저장소를 새로 체크아웃해서 빌드한다. 체크아웃하는 순간 모든 파일의 mtime이 "지금"이 된다. 그러니 빌드할 때마다 모든 글의 `updated`가 빌드 시각이 되고, 사이트맵의 `lastmod`도 전부 배포 시각이 되는 것이었다.

로컬에서는 파일을 안 건드리면 mtime이 그대로라, 이 문제는 CI에서 매번 새로 체크아웃하는 구조에서만 드러난다.

## 해결은 설정 한 줄

`_config.yml`에 이 옵션이 있었다.

```yaml
updated_option: 'date'
```

`updated`가 비어 있을 때 무엇을 쓸지 정하는 옵션이다. 기본값은 `mtime`이고 `date`(작성일), `empty`(안 씀)도 고를 수 있다. `date`로 바꾸면 `updated`가 없는 글은 작성일을 쓴다. 이제 배포를 몇 번 해도 `lastmod`는 글을 쓴 날 그대로다. 내용을 정말 고친 글에만 머리말에 `updated:`를 직접 적어 주면 그 날짜로 바뀐다.

## 홈과 카테고리 페이지는 따로 손봤다

글 URL은 이걸로 해결됐는데 홈, 태그, 카테고리 URL의 `lastmod`는 여전히 배포 시각이었다. 플러그인의 기본 템플릿이 이쪽에는 "현재 시각"을 넣고 있어서다. 그래서 템플릿을 직접 만들어 연결했다.

```yaml
sitemap:
  path:
    - sitemap.xml
    - sitemap.txt
  template: sitemap-template.xml
```

템플릿에서 홈은 가장 최근 글의 날짜로, 태그는 소속 글 중 가장 최근 날짜로 고정했다.

```xml
<url>
  <loc>{{ config.url | uriencode }}</loc>
  {% if posts.length %}<lastmod>{{ posts[0].updated | formatDate }}</lastmod>{% endif %}
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>
```

이러면 새 글을 쓰기 전까지는 홈의 날짜도 변하지 않는다.

## 같이 정리한 것들

이 과정에서 사이트맵 쪽 문제를 몇 개 더 정리했다.

- 사이트맵 플러그인이 **중복으로 설치**돼 있어서 하나를 지웠다.
- 색인형(sitemap index) 구조를 **평면 단일 파일**로 바꿨다. 굳이 쪼갤 필요가 없다고 판단했다.
- 서치콘솔이 예전에 `sitemap.xml`을 읽은 판정을 캐시해 두고 새로 안 읽는 것 같아서, 내용이 같은 `sitemap.txt`를 함께 만들었다. 한 번도 본 적 없는 새 URL이라 처음부터 새로 읽게 하려는 용도다.
- `robots.txt`에 사이트맵 주소를 등록했다.

## 확인하는 방법

배포하고 나서 `sitemap.xml`을 열어 몇 개만 보면 된다. 오래된 글의 `lastmod`가 작성일 그대로인지, 최근에 쓴 글만 최근 날짜인지 확인하면 된다. 배포를 한 번 더 해도 값이 안 바뀌면 성공이다.

정리하면, CI에서 매번 새로 체크아웃하는 구조에서는 **파일 mtime을 믿으면 안 된다.** 날짜가 의미를 가지는 값은 파일 시스템이 아니라 글 머리말에 직접 두는 게 안전하다.
