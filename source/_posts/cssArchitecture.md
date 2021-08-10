---
title: '번역 - OOCSS, BEM, SMACSS를 사용하여 CSS 구조를 효과적으로 구성하는 방법'
tags:
  - OOCSS
  - BEM
  - SMACSS
  - style
  - css
  - architecture
categories:
  - CSS
thumbnail: 'https://tuhbm.github.io/images/bnr-css.jpg'
date: 2018-12-09 02:04:10
---

# OOCSS, BEM, SMACSS를 사용하여 CSS 구조를 효과적으로 구성하는 방법

필자는 레고 블록을 매우 좋아하는 장난감으로 아주 많았습니다.
레고블록은 저의 첫번째 창의적인 작품이었습니다. 그것들은 무엇이든 생각하는대로 조립이 가능했습니다.
나는 그 당시 왜 그렇게 레고를 좋아했는지 몰랐습니다. 
하지만 스타워즈 팔콘을 만들어보면 색깔 및 7000여조각이 각 조각별로 어떻게 완벽하게 맞아 떨어지는지를 보여주었습니다.

이런식으로 처리가 된다면 조직화되어 HTML은 더 작아지고, CSS는 훨씬 관리하기 쉬워져 프론트엔드 개발속도가 빨라지게 됩니다.

*이번 글에서는 CSS 구조를 레고블록처럼 동작하게하여 HTML / CSS 블록으로 구성하는 방법을 설명합니다.*

CSS 방법론중에 세가지 모듈화 방법을 소개하겠습니다.
이 방법론은 우리가 이해하고, 유지하고, 재사용하기 쉽게 컴포넌트화 하는데 도움이 될 것입니다.

저는 당신이 사용하고 있는 프론트엔드 프레임워크에 상관없이 이러한 방법들이 당신의 일하는 방식의 일부가 될꺼라고 확신합니다.
당신이 이 방법론들을 사용한다면 확신합니다.
<!-- more -->
## OOCSS
![OOCSS](https://tuhbm.github.io/images/cssPosting/css_architecture/oocss.png)

OOCSS (Object Oriented CSS)은 모든 인터페이스 디자인 및 개발을 개선하기 위한 개념의 기반입니다. 
이것은 가능하면 최대한 재사용되어야 컴포넌트로써 좋은 역할을 한다는 것을 알려줍니다.

*OOCSS*는 객체지향 프로그래밍과 마찬가지로 *유연하고 잘 동작하도록 재사용 가능한 컴포넌트를 구성하는것*에 중점을 두고 있습니다.
이러한부분은 [단일책임원](https://en.wikipedia.org/wiki/Single_responsibility_principle), [관심사 분리](https://en.wikipedia.org/wiki/Separation_of_concerns) 및 [중복배제](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)과 같은 기본 프로그래밍 원칙을 포함합니다.  

또한 필수 UX 및 그래픽 디자인의 체크 요소인 일관성 검사를 합니다. 인터페이스 전반적으로 유사한 버튼의 디자인을 통일화 하면, 사용자는 익숙해하고 새로운 페이지에서 더욱 직관적으로 느낍니다.
OOCCS를 사용하여 코드를 재사용하면 코드의 중복이 제거 되므로써 더 빠르고 쉽게 만들 수 있습니다.

[Nicole Sullivan의 2010년 포스팅 글](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)에서는 미디어 객체의 OOCSS를 적용한 장점에 대해 설명했습니다.
이글의 주요 내용은 HTML과 CSS 모두를 코드블록 형태로 패턴화하고 추상화하는 내용입니다. 다음은 Nicole의 미디어 객체의 예제입니다.

```html
<div class="media">
  <a href="#" class="img">
    <img src="" alt="" />
  </a> 
  <div class="bd"></div>
</div>
<style>
.media {...} 
.media .img {...} 
.media .img img {...} 
.media .imgExt {...} 
.bd {...}
</style>
```
보시면 아시겠지만, 컴포넌트를 캡슐화하여 CSS의 다른곳에서도 스타일을 적절히 사용합니다.
밀단 미디어 컴포넌트를 배치하면 모든 코드는 일관적으로 동작해야합니다.

## BEM
![BEM](https://tuhbm.github.io/images/cssPosting/css_architecture/bem.png)
BEM은 Yandex가 만든 OOCSS 원칙을 구체적으로 적용한 것입니다.

이방법의 의미는 [crazy complicated framework](https://en.bem.info/methodology/quick-start/)에서 Block, element, Modifier 입니다.
[Nicolas Gallagher](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)가 가장 인기있는 BEM 명명규칙을 단순화 했습니다.
이러한 버전은은 이미 대부분의 요구를 충족합니다.

이전 코드의 예제에 BEM 네임 스페이스를 적용해보겠습니다.
```html
<div class="media media--inverted">
  <a href="#" class="media__image-wrapper">
    <img class="media__image" src="" alt="" />
  </a>
  <div class="media__content"></div>
</div>
<style>
.media {...}
.media--inverter {...}
.media__image-wrapper {...}
.media__image {...}
.media__content {...}
// With SASS - which will output the code above
.media { ... 
  &--inverter {...} 
  &__image-wrapper {...} 
  &__image {...} 
  &__content {...} 
}
</style>
```
BEM에서 한가지 중요한 점은 특이성 제어입니다. 위에서 언급한 명명 규칙을 사용하여 우리는 `.class`단일 선택자 `[0 0 1 0]`로 우리의 특이성을 자동으로 무너트립니다.
계단식 특이성이 너무 복잡하다는 사실을 알게 되면, 아래와 같은 사항을 명심하세요.

항상 `.class` 단일 선택기를 사용하세요.

다음 몇 단락은 위해 당신이 먼저 `[0 0 1 0]`의 의미를 이해한다고 가정하겠습니다.
만약 이해하지못했다면 [먼저 읽으세요.](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)

css의 특이성은 좀 어렵지만 일단 이해하면 꽤 빨리 활용 할 수 있습니다. BEM의 명명규칙에 따라 `.class`를 사용하여 `[0 0 1 0]`가 된다면 우리는 이미 90%의 스타일을 보유하게 됩니다.
이것만으로도 우리는 작업이 편해질 것입니다. 그렇다면 우리는 `@imports`의 파싱 순서가 중요합니다.
그렇기에 `@imports`순서에 대해 주의를 기울여주세요.

구성요소가 각페이지에 있다면 `[0 0 1 0]`인 상황에서 `body`에 ID를 추가하여 페이지에 대한 CSS를 지정 할 수 있습니다.
해당 ID를 사용하여 적용 범위를 지정하면 `[0 1 1 0]`로 코드의 스타일 순서에 관계없이 훨씬 높은 특이성을 발휘합니다.

*참고*: 두개의 서로 다른 페이지에서 동일한 재정의를 사용해야 하는 경우에는 `&--modifier`를 사용하여 추상화 하는 것이 좋습니다.

위와 같은 재정의는 적어야합니다. 
필자가 사용하는 방식은 SMACSS 과 [Atomic Design by Brad Frost](https://shop.bradfrost.com/)의 개념을 기반으로 합니다.

## SMACSS
![SMACSS](https://tuhbm.github.io/images/cssPosting/css_architecture/smacss.png)
SMACSS는 Yahoo와 Spotify에서 근무한 [Jonathan Snook](https://snook.ca/)이 대규모의 프로젝트 CSS 코드의 베이스 및 팀워크를 염두해서 만든  Scalable and Modular Architecture의 약자입니다.
조나단은 [SMACSS 참고서](https://smacss.com/)에서 몇가지 깔끔한 아이디어와 CSS 파일 구조 모범 사례를 제시했습니다.

SMACSS 두번째 수정버전은 구성 요소와 React Craze가 출시되기 오래 전인 2012 년입니다. 
나에게 SMACSS의 가장 흥미로운 부분은 랩퍼와 컨테이너를 사용하여 컴포넌트를 완벽하게 적합하게 만드는 것입니다.

이러한 기술은 컴포넌트 방식의 기본 요소입니다. 레고 블록을 기억하세요.
그러나 이러한 기술은 CSS 속성을 작성할때 컴포넌트가 서로 상호작용하는 방식을 방해하지 않도록 많은 규칙을 필요로 합니다.

### CSS 컴포넌트 모듈성 이론

```css
.block 
  .block__element 
  .block__slot
```
기본적으로 `.block`에는 `float:left`또는 `margin-top:20px`같은 기본 css속성을 갖지 않습니다.
이러한 부분은 class가 하나 이상의 경우 일관성 없이 동작하는 것을 방해가 될 수 있다.

내가 유용하다고 생각하는 또 다른 최고의 SMACSS 연습은 컨테이너 또는 `슬롯`의 개념이다.
이것은 Vue.js의 `<slot>`처럼 작동합니다. 컴포넌트의 변경 공간을 만들고, 우리가 속성을 추가했을때 내부의 컴포넌트가 변경됩니다.
여기서 우리는 `padding`과 같은 속성을 `.block__continer`에 추가하지 않습니다. `padding`을 추가하면 내부의 컴포넌트가 방해받습니다.
우리는 그런걸 원하지 않습니다.

CSS 아키텍처의 베스트 프랙티스는 이미 CSS를 모듈화되고 "올바르게 작동"하게 만드는 것입니다. 
우리가 사용하는 프레임 워크와 독립적인 HTML 및 CSS 작성에 대한 컴포넌트 접근 방식을 적용 하는것입니다.
SMACSS는 CSS 속성을 구성하는 방법 이상의 것입니다. SMACSS의 주요 장점은 모듈성 입니다.
이 가이드 라인을 따르면 HTML / CSS가 이미 주요 JS 프레임 워크에서 구현 될 수 있습니다. 개념적 구조를 따르기 때문입니다.

### 프레임 워크에 독립적인 모듈 CSS
나의 목표: 체계적이고 유지 보수가 잘되는 CSS

나는 이방법론의 더 좋은 인터페이스를 연구합니다. 현대적인 인터페이스를 위해서는 각 컴포넌트를 격리시켜 효과적으로 구축 할 수 있어야합니다.
많은 프레임워크와 무관하게 컴포넌트를 개발하는 최소한의 요구사항을 확인 하려고 노력합니다.

OOCSS 및 웹 구성 요소의 개념은 스타일링과 거의 동일합니다. 
독립적인 인터페이스 컴포넌트를 만드는 것은 지금까지 우리가 생각해 낸 최고의 솔루션이며 수백 개의 기사가 있습니다.

BEM은보다 전통적인 설정에서 작업 할 때 특히 유용합니다.
이 환경에서는 해당 컴포넌트의 스타일을 범위 지정하고 요소에 컨텍스트 정보를 추가하는 두 가지 용도로 사용됩니다. 
하지만 이제는 익숙해지기 때문에 React 나 Vue 에서도 BEM 클래스 이름을 사용하게됩니다 .

SMACSS의 용기와 포장재를 똑똑하게 사용하면 컴포넌트가 서로 잘 작동하고 어느 곳에서나 적합해집니다. 
또한 우수한 CSS 파일 구성은 디자인처럼 사용이 더 간단합니다. 
대규모 프로젝트의 경우이 기능은 매력처럼 작동합니다.

OOCSS와 BEM & SMACSS를 함께 사용하면 스택이나 프레임 워크에 관계없이 스파게티 코드 작별에 도움이됩니다!


********
## 출처

이 글은 [Medium](https://medium.com/)의 [laudio Mendonca](https://medium.freecodecamp.org/@claudioccm2)의 [포스팅 글](https://medium.freecodecamp.org/how-to-better-organize-your-css-architecture-with-oocss-bem-smacss-65e8a5c207c0)을 번역한 것입니다.
