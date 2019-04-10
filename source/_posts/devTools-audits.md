---
title: 개발자도구 - Audits편
categories:
  - ETC
tags:
  - 성능최적화
  - 개발자도구
  - 성능
  - PWA
  - BestPractices
  - 접근성
  - TTI
  - TimeToInteractive
  - 검색엔진최적화
thumbnail: https://tuhbm.github.io/images/bnr-etc.jpg
date: 2019-04-10 22:02:50
---
![DevTool](https://tuhbm.github.io/images/devTools/develop_tools.jpg)

# 개요
웹 개발자라면 이슈가 생겼을 때 보통 브라우저에서 개발자 도구를 열어 코드를 확인하며 어떠한 부분에서 이슈가 발생했는지 확인합니다. 제가 주로 사용하는 개발자도구는 크롬입니다. 개발자도구는 보통 브라우저에 포함된 기능입니다. 심지어 우리의 주적인 *IE*까지도 개발자도구가 존재합니다.

하지만 저도 개발자도구의 좋은 기능들을 활용하지 못했습니다. 최근 한 세미나에 참여하며, 개발자도구의 활용방법에 대해 배웠습니다. 생각보다 좋은 기능들이 많아 우리가 편리하게 개발을 하는데 도움을 받을 수 있습니다. 이러한 좋은 기능에 대해 기록해보겠습니다.

# Audits탭
Audits탭은 해당 페이지의 전체적인 검사를 하는 기능이 있습니다.

![audits 실행전](https://tuhbm.github.io/images/devTools/audits1.png)
Desktop과 Mobile 중 어떤 플랫폼으로 실행을 할 것인지, 통신속도는 어떻게 할것인지 선택도 가능합니다.
<!-- more -->
또한 어떤 부분을 검사하고 싶은지 선택 가능한 항목은 아래와 같습니다.

- 성능
- PWA
- Best practices
- 접근성
- SEO(검색엔진최적화)

검사 진행시 아래와 같이 각 항목별 점수 및 개선 권고사항들에 대해 기술해줍니다.

![audits 실행 후](https://tuhbm.github.io/images/devTools/audits2.png)

또한 View Trace 버튼을 누르면 performance탭으로 이동합니다.

Performance단락을 살펴보면

**[TTI(Time to Interactive)](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive?hl=ko)** - 유저가 인터렉션(ex:클릭,마우스오버)을 사용할 수 있는 시간이 있는데,

이부분이 보통 유저가 체감가능한 렌더링시점으로 생각하시면 됩니다.
보통의 서비스들은 TTI기준을 잡는지 모르지만, 지인을 통해 알아본 쿠팡의 경우 TTI기준을 2초를 기준으로 개발을 하고 있다고 합니다.

[RAIL 모델로 성능 측정](https://developers.google.com/web/fundamentals/performance/rail?hl=ko)



각 항목에 대한 권장사항을 리스트로 나타내줍니다.
또한 권고사항들을 클릭하면

![권장사항](https://tuhbm.github.io/images/devTools/audits3.png)

해당 항목에 대한 성능을 높일 수 있는 방법을 제공합니다.

## 결론
Audits탭을 통해 SEO, PWA, 접근성등의 필수는 아니지만 더욱 유저들에게 필요한 부분에 대한 권장사항들에 대한 내용 그리고 Performance 점수등의 여러 점수들을 제공하고, 또한 이러한 부분들에 대한 수정을 권장하는 내용들을 제공하므로써 더욱 나은 웹서비스들을 만들 수 있도록 도와줍니다.