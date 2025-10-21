---
title: 개발자도구 - Performance편
categories:
  - 공부
  - ETC
tags:
  - 성능최적화
  - 개발자도구
  - performance
  - DCL
  - FCP
  - FMP
  - Frames
  - Timings
  - domContentLoadedEvent
  - loadEvent
thumbnail: https://tuhbm.github.io/images/bnr-etc.jpg
date: 2019-04-02 23:02:50
---
![DevTool](https://tuhbm.github.io/images/devTools/develop_tools.jpg)

# 개요
웹 개발자라면 이슈가 생겼을 때 보통 브라우저에서 개발자 도구를 열어 코드를 확인하며 어떠한 부분에서 이슈가 발생했는지 확인합니다. 제가 주로 사용하는 개발자도구는 크롬입니다. 개발자도구는 보통 브라우저에 포함된 기능입니다. 심지어 우리의 주적인 *IE*까지도 개발자도구가 존재합니다.

하지만 저도 개발자도구의 좋은 기능들을 활용하지 못했습니다. 최근 한 세미나에 참여하며, 개발자도구의 활용방법에 대해 배웠습니다. 생각보다 좋은 기능들이 많아 우리가 편리하게 개발을 하는데 도움을 받을 수 있습니다. 이러한 좋은 기능에 대해 기록해보겠습니다.



# Performance탭

performance탭은 말 그대로 성능을 측정 할 수 있는 있는 도구입니다.
맨위에 녹화 버튼을 눌러 녹화를 시작한 후 새로고침을 통해 페이지의 렌더링을 진행합니다.
렌더링이 완료되면 *STOP* 버튼을 클릭합니다.
그렇다면 아래와 같은 그래프 및 랜더링이 진행되는 화면들이 스냅샷으로 확인 가능합니다.
<!-- more -->
![이미지 스냅샷](https://tuhbm.github.io/images/devTools/performance1.png)

처음 위와 같이 스냅샷에 이미 렌더링 되어있는 부분이 나온다해도 이상은 없습니다.
단. 이걸 보고 싶지 않다면, 녹화버튼을 누르기 전에 Elements탭에서 *body태그를 지우고* 녹화버튼을 눌러 시작해보면 흰화면부터 시작되는 스냅샷을 확인 할 수 있습니다.



![performance 탭](https://tuhbm.github.io/images/devTools/performance2.png)

맨위 타임테이블에서는 구간을 선택해서 세부 내용확인이 가능합니다. 또한 창크기를 늘렸다 키웠다하며, 이동도 가능합니다
p.s구간 해제는 *더블클릭*입니다.


## **상세 기능**

### Frames

\- 스크린샷으로 화면의 흰 화면부터 렌더링 완료된 화면까지 모든과정을 나타내줍니다.

![스냅샷](https://tuhbm.github.io/images/devTools/performance_motion.gif)


### Main

html부터 렌더링이 완료되기까지의 요청 및 렌더링의 파일 순서등을 보여줍니다.
다른부분과 마찬가지로 마우스 휠을 통해 부분 확대 및 축소가 가능합니다.

![랜더링 그래프](https://tuhbm.github.io/images/devTools/performance3.png)



### Timings

\- DCL, FCP, FMP, L등의 타이밍 순서를 알려줍니다.

- DCL : DOMContentLoaded 이벤트
- FCP : First (Contentful) Paint
- FMP : First Meaningful Paint Candidate
- L : Load 이벤트

렌더링의 과정중에 우리가 javascript등으로 DOM 컨트롤을 시작할수있는 부분은 **DCL**부터 입니다.

#### domContentLoadedEvent
- HTML과 CSS에 대한 파싱이 끝나는 시점
- 렌더트리를 구축할 준비가 된 (DOM과 CSSOM이 완료된) 상황
- 제이쿼리 기준 - $(document).ready(…) 시점

#### loadEvent
- HTML 상에 필요한 모든 리소스가 로드된 시점
- 제이쿼리 기준 - $(window).load(…)시점

##### performance탭에서 확인 할 수 있는 내용
- 파싱 순서
- FMP시점
- 스냅샷을 통한 렌더링 순서

#### performance **탭 외의 진단도구**

**Google PageSpeed Insights** - https://developers.google.com/speed/pagespeed/insights/**

**webpagetest** - <https://webpagetest.org/>



## 결론

performace탭을 통해 어떠한 파일이 먼저 렌더링되는지를 통해 개발시 진행하고 싶은 렌더링순서를 파악 할 수 있고, 더욱 효율적인 개발이 진행이 가능합니다.

