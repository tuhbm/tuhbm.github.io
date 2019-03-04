---
title: SEO(Search Engine Optimization) 검색 엔진 최적화 2편
categories:
  - SEO
tags:
  - Search
  - Engine
  - Optimization
  - noindex
  - canonical
  - alternate
thumbnail: https://tuhbm.github.io/images/bnr-seo.jpg
date: 2019-03-04 23:12:59
---

![SEO](https://tuhbm.github.io/images/seo.jpg)

## 개요

지난번 [SEO 검색 엔진 최적화 1편](https://tuhbm.github.io/2018/09/29/seo/)에 이어서 업무를 하면서 추가로 알게 된 내용들이 있어, 2편을 작성하게 되었습니다. 
서비스를 검색에 최대한 효율적이고 빈번히 노출시키는 것이 유저를 유입시키는 점에 있어 SEO(검색 엔진 최적화)작업은 매우 중요하다고 1편에서도 말씀드렸습니다.  
추가적인 내용을 정리해보겠습니다.

*****

## noindex

먼저 `noindex`에 간략히 말씀드리면, `bot이 페이지를 크롤링할때 검색 색인 생성 차단하는 방법`이라고 간략히 설명하겠습니다. 
접근을 차단하는 다른방법으로는 `robots.txt`파일을 웹마스터 도구에 등록하므로써 차단하는 방법도 있습니다. 
하지만 `noindex`의 경우는 `색인`은 bot이 색인을 *생성*하는 부분을 HTTP request에서 `noindex header`를 반환하여, 검색엔진에 표시가 되지 않게 하는 방법입니다.

<!-- more -->

위에서 말한 단어중 `색인`이라는 키워드는

1. 크롤러가 페이지방문
2. 페이지의 콘텐츠와 html tag를 분석하여 페이지에 대한 정보를 저장

이순서로 이루어 지는데 2번째 과정에서 만들어지는 정보를 `색인`이라고 합니다.



이러한 `색인`의 생성을 차단하여, 연결된 페이지에 상관없이 검색페이지에서 노출을 막는 방법입니다.

### 사용방법

noindex는 head태그에 <meta>태그에 추가하여 사용합니다.

```html
<mata name="robots" content="noindex">
```

이렇게 메타태그를 적용한다면, 색인생성되는 부분을 막을 수 있습니다.

*참고사항으로 noindex를 적용하는 페이지는 robots.txt에 등록되어 있지 않아야합니다.*



저는 회사에서 `테스트 서버등 각 환경`에 있어서 동적으로 현재 도메인의 값을 받아 
LIVE 되고 있는 환경에만 noindex를 적용하지 않고 `테스트 환경에 모두 noindex를 적용하여 사용`했었습니다.


*****

## canonical

[지난 1편](https://tuhbm.github.io/2018/09/29/seo/#대표URL설정)에서도 canonical 관련해서 간략하게 설명했었습니다. 
이론적으로 알고 있을때와 실제 서비스에 적용하려다 보니 좀더 자세히 조사를 진행해보니, 조금 더 내용이 추가되었습니다.
우선 `canonial`에 대해 조금 더 설명드리자면, 최근 많은 서비스에서 사용하고 있는 `SPA(Single Page Application)`의 경우 하나의 페이지에서 router값을 변경하므로써 해당 컨텐츠를 랜더링 하고 있습니다.
그렇기에 *어떻게 접속하느냐에 따라 URL에 붙는 parameter 값이 달라*집니다. 
*같은 컨텐츠임에도 불구하고 URL이 다르다는 것입니다.*

예를 들어
```
http://www.exemple.com/game/kr/main/view/2012431?listType=2 - 리스트

http://www.exemple.com/game/kr/main/view/2012431?listType=3&display_opt=usertag_on,html_remove - 카드

http://www.exemple.com/game/kr/search/list/TAG/view/2012431?listType=2&display_opt=usertag_on,html_remove&word=%EA%B3%B5%EB%9E%B5&searchBoardKey=all&direction=accuracy - 검색
```

위의 3가지 URL은 모두 같은 컨텐츠입니다. 
접근 방법에 따라 뒤에 붙는 parameter값이 달라서 URL이 다를뿐입니다. 
이처럼 노출되어야 하는 `컨텐츠는 하나인데, URL이 여러개라면 검색 봇은 각각의 페이지를 다 다른 페이지로 인식`합니다. 
그렇기에 사용하는 방법이 `canonical`입니다. canonical을 사용하여, bot에 대표 페이지를 알려주므로써 크롤러가 수집할때 `대표페이지 URL만 수집하여 검색 랭킹을 올리는 것`입니다.



### 사용방법

canonical역시 `head태그`에 적용하는데 위 noindex와 는 다르게 `link태그`를 사용합니다.

```html
< link rel="canonical" href="{대표URL 설정}" />
```
이러한 방법으로 사용합니다.

위 url에 적용을 해본다면

```html
< link rel="canonical" href="http://www.exemple.com/game/kr/main/view/2012431" />
```

이렇게 적용한다면, 대표 URL을 설정하므로써 컨텐츠의 검색랭킹을 올릴 수 있습니다.

추가적으로 요즘은 해당 접속환경을 랜더링하기 전에 받아 모바일버전과 PC버전을 자동으로 보여주고 있습니다. 이런경우 하나의 컨텐츠의 URL을 모바일과 PC 각각어떻게 연결할 수 있을까요?
이런경우 `pc에는 alternate`를 사용하여 모바일 URL을 연결하고, `mobile에는 canonical`로 PC의 URL을 입력하여 연결합니다.
코드로 설명을 드리면

```html
// PC페이지
<link rel="alternate" media="only screen and (max-width: 640px)" href="{PC URL}">

// 모바일
<link rel="canonical" href="{모바일 URL}">
```

이렇게 각각 모바일과 PC의 URL을 서로 알려주어 같은 컨텐츠 임을 봇에게 알려주어 검색랭킹을 올릴 수 있습니다.
*****
## 정리

아직 SEO관련해서는 국내 자료가 충분하지 않아 번역기를 돌리면서, 해외자료를 검색하여 자료를 찾아보았습니다. 
추가적으로 SEO관련 업무를 진행하여 국내에 알려지지 않은 방법들을 포스팅해보도록 하겠습니다.

감사합니다.