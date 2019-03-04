---
title: SEO(Search Engine Optimization) 검색 엔진 최적화 1편
date: 2018-09-29 18:32:59
categories:
- SEO
tags:
- html
- seo
- search
- engine 
- optimization
- 검색최적화
- canonical
- noindex
thumbnail: https://tuhbm.github.io/images/bnr-seo.jpg
---

![SEO](https://tuhbm.github.io/images/seo.jpg)
# SEO의 중요성
비지니스 측면에 있어서 검색순위 상위권에 노출되는 것은 매우 중요한 부분입니다.
검색시 페이지 이동을 해야 검색이 된다면, 그만큼 유저들이 이전페이지들에서 원하는 결과를 얻어 해당 웹사이트에 접속할 확률이 낮습니다.
물론 입소문이 타서 자연스럽게 해당 검색어를 정확하게 입력한다면 유저의 유입확률이 높을 것이지만, 그렇지 못한 경우가 많습니다.
노출의 효과는 광고를 보면 알 수 있습니다. 자주 보는 광고를 통해 유저에게 특정 비지니스 상품을 홍보하고 그로인해 수익이 됩니다.
검색 엔진 최적화도 마찬가지의 효과입니다.
그러므로 비지니스 측면에서 검색 엔진 최적화는 매우 중요합니다. 
스타트업 또는 신제품의 경우 더더욱 중요합니다.

<!-- more -->

우리가 살고 있는 대한민국의 경우 대표적으로 [NAVER](https://www.naver.com/)를 통해 검색하고,
개발자들 같은 경우 [GOOGLE](https://www.google.com/)에서 검색을 많이 합니다.
![검색엔진](https://tuhbm.github.io/images/seo1.jpg)
두개의 포털사이트는 각각 다른 검색 엔진을 사용하지만, 기본적인 검색 엔진 최적화 작업은 동일합니다.
지금부터 제가 알고 있는 범위내에서 검색 엔진 최적화작업 방법을 기재해보겠습니다.

## img태그의 alt값 넣기
기본적인 웹표준에서 alt값은 이미지가 노출이 되지 않았을 때 대체 텍스트로 들어갈 값을 넣는 것으로 알고 있습니다.
이부분 말고도 검색엔진에서는 alt값의 값을 긁어가 검색시 노출값으로 사용합니다.
그렇기에 alt값은 웹표준 측면 뿐만 아니라 검색 엔진 최적화 작업에서도 매우 중요합니다.

## a태그에 href값 넣기
a태그는 링크 또는 책갈피같은 역할을 합니다.
href값에 URL을 넣으면 해당 URL로 이동을 하는 링크역할,
그리고 href값에 #ID 값을 넣으면 해당페이지 내에 값으로 입력한 ID를 가진 DOM으로 이동하는 책갈피 기능합니다.
검색 엔진 로봇은 이러한 href값을 읽어 해당 페이지의 검색요소들을 찾는다고 합니다.
예를 들어 해당 상세페이지로 이동하여 그안에 검색요소들을 찾아 검색노출값에 노출하는 것입니다.

## heading tag의 적절한 사용
h1~h6까지 heading tag는 페이지 내용의 구조의 제목을 나타내는 태그로 용도에 맞춰 사용해야하며, 또한 너무 남발시 검색엔진이 페이지 구조를 파악하는데 어려움이 있습니다. 

## title태그 와 description 그리고 keywords
title태그와 meta태그의 description은 검색엔진이 페이지의 내용을 파악할때 기본적으로 사용하는 데이터입니다.
title태그는 해당 페이지의 제목을, description은 그페이지에 대한 설명을 나타냅니다.
```html
<title>페이지 제목</title>
<meta name="description" content="페이지 설명을 간략하게 나타냅니다.">
```
특별한 글자수 제한은 없지만 네이버 검색엔진에서는 너무 길게 작성시 페널티가 있을 수 있다는 권고사항이 있습니다.

또한 keywords는 검색엔진에 큰영향을 미치지는 않지만 무시할 만한 요소는 아닙니다.
description 처럼 키워드 역시 메타태그에 한 종류로 고유한 단어나 문구를 기록합니다.
```html
<meta name="keywords" content="대표키워드, 키워드1, 키워드2, 키워드3, 키워드4, 키워드5">
```

## 대표URL설정
하나의 페이지에 여러 URL이 존재할 경우 대표URL을 설정하여 리다이렉션 시키거나 또는 페이지 내에 rel="canonical"표시를 추가하는 것이 좋습니다. 그래야 페이지랭크에 하나의 대표URL이 등록되어 페이지랭크가 올라가게 되어있습니다. 여기서 말하는 대표URL은 해당 페이지의 표준페이지로 인식됩니다.
```html
<link rel="canonical" href="http://www.seo.com" />
```

## 오픈그래프 사용
meta태그에 소셜미디어로 공유시 우선적으로 활용되는 정보입니다. 해당 웹페이지의 제목,설명,대표이미지를 같이 넣어주면 검색엔진이 이를 인식해 검색내용에 활용합니다.
```html
<meta property="og:type" content="website">
<meta property="og:title" content="페이지 제목">
<meta property="og:description" content="페이지 설명">
<meta property="og:image" content="http://www.site.com/image.jpg">
<meta property="og:url" content="http://www.site.com">
```
## 소셜미디어 오픈그래프 사용
위의 방법과 마찬가지로 소셜미디어 내에 검색 및 공유시 콘텐츠의 정보를 보여주므로써 검색확률을 높일 수 있습니다.
```html
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="페이지 제목">
<meta name="twitter:description" content="페이지 설명">
<meta name="twitter:image" content="http://www.site.com/article/article1.html">
<meta name="twitter:domain" content="사이트 명">
```

## robots.txt 사용
robots.txt는 검색엔진이 사이트에서 액세스할 수 있는 부분과 하지 말아야할 부분(개인정보 조회)을 정해 놓은 검색엔진과의 규약입니다. 
기본적으로는 검색로봇이 방문하면 안되는 페이지를 이 파일 속에 양식에 맞춰 기록하여, 검색엔진의 신뢰를 통해 최적화되게 됩니다.
robots.txt 파일은 반드시 root에 위치해야 합니다. 

또한 과도한 robots.txt 설정은 사이트에 더 많은 방문자를 유도할 수 있는 정상적인 검색 엔진만을 차단할 뿐, 해킹이나 악성코드를 유발하는 수많은 악의적인 로봇들은 이러한 로봇 배제 표준을 따르지 않는다는 점도 유의해야 합니다.

## 사이트맵(Sitemap)의 작성
사이트맵은 웹사이트의 구조를 알려주는 페이지입니다. 
통상적으로 ‘사이트맵’이라고 하면 웹사이트의 메뉴 항목에 포함된 사이트맵 페이지를 떠올리는 경우가 많지만(물론 사용자에게 웹사이트의 구조를 알려준다는 측면에서 이 페이지는 중요합니다), 검색엔진 입장에서 특히 중요한 것은 흔히 ‘Sitemap XML’이라 부르는 XML 형식의 파일입니다.
이 파일을 작성하여 (웹마스터 도구를 이용해) 검색엔진에 등록하면 검색엔진이 사이트의 전체 구조를 파악하고 색인을 생성하는데 도움이 됩니다.


## 결론

이러한 방법들을 사용한다고해서 검색시 무조건 상위에 들어간다는 보장은 없습니다.
제일 좋은 방법은 많은 유저가 방문하므로써 검색랭킹이 올라가는 방법이 가장 좋은 방법입니다.
하지만 유저수를 확보하지 못한 스타트업이나 신규서비스는 마케팅을 제외하고 개발자가 유저에게 노출빈도를 높히는 방법에는 검색 엔진 최적화 작업을 통해 노출하는 방법입니다.
[SEO 점수 체크](http://www.seocert.net/) 서비스(해당서비스는 google 검색엔진 기준으로 체크) 오픈전 체크를 통해 검색 엔진 최적화가 얼마나 잘 되었는지 확인이 필요합니다.