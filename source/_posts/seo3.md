---
title: SEO(Search Engine Optimization) 검색 엔진 최적화 3편
categories:
  - SEO
tags:
  - Search
  - Engine
  - Optimization
  - facebook
  - twitter
  - share
thumbnail: https://tuhbm.github.io/images/bnr-seo.jpg
date: 2019-03-12 23:33:42
---
![SEO](https://tuhbm.github.io/images/seo.jpg)

# 개요
지난번 [SEO 검색 엔진 최적화 2편](https://tuhbm.github.io/2019/03/04/seo2/)에서는 `noindex`처리와 `canonical`처리로 색인차단 
또는 같은 페이지의 paramter값으로 인해 다른 url로 인식되는 문제를 하나의 대표페이지로 지정하여 검색 순위에 대한 문제를 해결해보았습니다.

## 본문

이번 포스팅을 통해 우리의 서비스 페이지를 구글 또는 네이버의 검색 봇이 들어와 검사를 진행하고, 색인도 생성하여 필요한 url등을 가져가고, 
sitemap.xml등을 확인하여, 키워드에 대한 검색 랭킹을 등록합니다. 
이러한 봇이 어떻게 우리 페이지를 바라보게 되는지 테스트를 할 수 있는 크롬 extensions을 소개해 드리겠습니다.

사실 우리가 바라보는 웹페이지와 다르게 봇이 보는 우리의 웹사이트는 조금 차이가 있습니다.

UI, UX의 디자인적 요소를 바라보는 사람과 달리 봇은 웹사이트의 내용을을 코드로 바라본다고 보시면 될것같습니다. 
그렇기에 css로 어떻게 표현했는지 이런 것은 바라보지 않습니다.
<!-- more -->

예를 들어보면 우리의 google조차 봇이 보는 화면으로 보면 조금 옛날 디자인 같다는 느낌을 받습니다.

![bot이 바라보는 google 검색화면](https://tuhbm.github.io/images/img_search_google.png)

이처럼 디자인적 요소보다는 봇이 바라보는 환경은 코드를 통해 구조를 파악하고, 링크를 파악하고, 이페이지에 대한 정보를 확인한다고 이해하셔야 합니다.

다른 테스트 도구가 있을지 모르겠지만..(있다면 댓글로 추천 부탁드립니다.)

제가 사용하는 도구는 크롬 extensions(_이제부터 확장프로그램이라고 표현하겠습니다._)인 *[User-Agent Switcher for Chrome](https://chrome.google.com/webstore/search/User-Agent%20Switcher%20for%20Chrome)*입니다.

이 확장프로그램은 우리가 개발하면서 주로 사용하는 크롬의 확장프로그램으로써 크롬을 이용한 웹서핑 또는 개발중에 쉽게 켜고 끄면서 확인이 가능합니다.

우선 확장 프로그램에 추가 하세요. 그렇다면 크롬 주소창에 귀여운 아이콘이 보일겁니다.
![User-Agent Switcher for Chrome 아이콘](https://tuhbm.github.io/images/ico_seo.png)
기본적으로 설정되어있는 브라우저가 보입니다.
참고로 이프로그램은 프로그램의 이름처럼 User-Agent를 변경하는 단순한 프로그램입니다.
[User-Agent의 대한 설명](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/User-Agent)(아직 MDN에 한국어 번역본은 없네요ㅠㅠ)
[위키의 내용](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9A%A9%EC%9E%90_%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8)을 확인해보면 아래와같습니다.

```text
소프트웨어 에이전트가 네트워크 프로토콜 안에서 동작할 때, 문자적 식별 문자열을 피어(peer)에 제출함으로써 종종 자기 자신과 애플리케이션 유형, 운영 체제, 소프트웨어 업체, 소프트웨어 리비전을 식별한다. 
HTTP,[2] SIP,[1], NNTP[3] 프로토콜에서 이러한 식별 정보는 User-Agent라는 헤더 필드를 통해 전달된다. 
웹 크롤러와 같은 봇은 종종 URL이나 이메일 주소를 포함하기도 하며 이로 말미암아 웨마스터가 봇의 운영자와 연락을 취할 수 있다.
```

간단하게 표현하면, `브라우저별로 네트워크 통신을 할때 request Header에 보내는 고유한 값`이라고 표현할 수 있습니다. 
우리가 서버에 요청을 할때 Header에 보내야하는 필수 항목 이라고 생각하시면 됩니다.

이러한 `User-Agent`는 우리가 지정 할 수도 있지만, 일반적으로 해당 브라우저에서 request할 때 자동으로 `서버야 나는 크롬 브라우저고 몇버전이고 현재 OS는 이거야`라고 자동으로 요청값에 들어갑니다.
저는 UI개발을 할때 IE의 개발자도구를 켜서 해당 IE버전을 낮춰 확인하는 것도 User-Agent를 변경하여 요청하는 것이라 짐작됩니다.

이처럼 위의 확장프로그램은 `User-Agent를 변경`해주므로써 서버에 요청한 값으로 적합한 컨텐츠를 내려주도록 하는것입니다.

확장프로그램의 아이콘에 옵션 or 설정부분에 들어가게 되면,

- New User-agnet name - 설정할 User-Agent의 이름
- New User-agnet String - 설정할 User-Agent의 값
- Group - 추가될 그룹
- Append? - 신경안써도 될 요소
- Indicator Flag - 실행된 User-Agent의 깃발(User-Agent변경시 프로그램 아이콘에 표시될 내용) 

이렇게 5가지 값을 입력하여 User-agent를 추가 할 수 있습니다.

저는 국내의 대표적인 포탈 사이트 `naver`와 글로벌 검색엔진인 `google`의 User-Agent를 추가해 사용하고 있습니다.
```text
Naver bot User-agnet String - Mozilla/5.0 (compatible; Yeti/1.1; +http://naver.me/spd)
Google bot User-agnet String - Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
```
이처럼 두가지 User-Agent만 추가해도 `검색 엔진이 보는 화면에 대한 구성이 이렇게 이루어 지고 있다.`라는 화면을 충분히 인식할 수 있습니다.

## 결론

지금까지 확장프로그램을 통해 검색엔진 bot이 보는 화면구성을 테스트 하는 방법을 알아보았습니다.
bot이 보는 화면으로 인한 테스트도 중요하지만, SEO에 대한 업무를 하면서 가장 느낀건 `기본`입니다.
기본적으로 지켜야하는 `html 마크업`에 이어 `UI에 대한 설계`가 가장 중요하다고 느꼈습니다.

기본적인 a태그의 올바른 href값 기재 및 img태그에 alt값등 기본에 충실한 마크업에 meta태그를 통한 정보제공 그리고 하위 호환성에 
대한 UI설계 등이 가장 기본적인 검색 엔진 최적화 방법입니다.
`기본을 지키지 않고, 추가적인 기능개발을 통해 개선하겠다.`라는 방법은 물론 검색 엔진 최적화는 얻을 수 있겠지만, 
그에 따른 기능 추가로 인해 코드의 량 및 통신의 횟수 등을 증가시킵니다.

`서비스를 하는 회사라면 검색 엔진 최적화도 잡아야 할 요소지만 기본적인 웹사이트의 성능 최적화도 잡아야 한다.`라는 느낀점을 끝으로 마무리 하도록 하겠습니다.

