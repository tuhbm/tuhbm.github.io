---
title: 번역 - css의 DOM을 가운데 정렬하는 다양한 방법
tags:
  - align center
  - absolute
  - flex
  - transform
  - translate
categories:
  - CSS
thumbnail: 'https://tuhbm.github.io/images/bnr-css.jpg'
date: 2018-10-31 19:56:08
---

# CSS에서 스타일을 중심으로 배치하는 방법
![image](https://tuhbm.github.io/images/css-align-center.jpg)

솔직하게 말해봅시다.

때때로 우리의 코딩 경력 전반에 걸쳐 우리는 CSS의 중심에 좌절감을 나타 냈습니다(Google 또는 스택 오버 플로우에서 div 내에서 div를 가운데에 배치하는 방법을 찾는 방법).
이 작업은 가장 간단한 작업 중 하나일 수 있지만 페이지에 더 많은 요소와 스타일을 추가하면 빠르게 혼란이 올 수 있습니다.
이것이 꽤 흔한 문제이기 때문에, 저는 이 가이드에서 CSS를 중심으로 하는 방법을 정리했습니다.
또한 CodePen에서 만든 각 예제와 함께 코드/링크도 포함했습니다. 원한다면 마음대로 포크, 공유 또는 복사하세요!

여기에서 저의 CodePen을 보세요.

더 이상 고민 말고, 그것에 대해 이야기합시다!
<!-- more -->
[Codepen예제](https://codepen.io/stephen_sun/pen/PajMNR)

## Text-Align 사용

*text-align: Center*를 사용하는 방법은 가운데 정렬 방법 중에서 가장 일반적인 방법입니다. 주로 HTML 페이지의 텍스트를 중앙에 배치하기 위해 사용되지만, div을 중앙에 배치하기 위해서도 사용할 수 있습니다.

이 방법의 특징 :
1. div 요소를 부모 요소(일반적으로 wraper 또는 container라고도 함)와 가운데 맞추려는 내용으로 묶습니다.
2. 부모 요소에 *text-align: center*설정
3. 그런 다음 내부 div를 *display: inline-block*으로 설정합니다.

예제(codepen)에서 파란색 사각형 예제에서 상위에 "blue-square-container"라는 클래스의 부모 div로 묶습니다. 파란색 사각형을 중앙에 배치하려면 상위 요소를 만들고 파란색 사각형을 인라인 블록으로 설정해야 했습니다.

이는 기본적으로 div의 표시 속성이 블록으로 설정되어 있기 때문에 페이지의 전체 너비에 적용된다는 의미입니다. 파란색 사각형의 display 속성을 *inline-block*으로 지정하면 width(100px)가 파란색 사각형에만 적용 됩니다.

상위 요소 내에 display 속성이 *inline-block*인 여러 하위 요소(이 예에서는 파란색 사각형)를 추가하면 모든 요소가 중앙에 배치됩니다.

## Margin Auto 사용

중앙정렬의 또 다른 일반적인 방법은 *margin: auto* 를 사용하는 것입니다. 이 방법을 사용하면 부모 요소가 필요하지 않습니다.
**넓이가 정해진 노란색 상자에 *margin: 0 auto*를 적용하기만 하면 됩니다.**
*margin: 0 auto*는 위쪽 여백과 아래쪽 여백을 0으로 설정하고 왼쪽 여백과 오른쪽 여백을 자동으로 설정하는 것을 의미합니다.
100px 너비를 정의하지 않으면 브라우저가 노란색 상자를 가운데에 맞추는 데 필요한 왼쪽 및 오른쪽 여백을 렌더링 할 수 없으므로 중요합니다.
너비를 설정하면 브라우저가 노란색 상자의 양쪽에 여백을 자동으로 계산합니다.
"0" 부분은 위쪽 및 아래쪽 여백에 대해 설정할 수 있습니다.

또 다른 재밋는 방법은 margin을 왼쪽은 auto로 설정하는 방법입니다. 
그러면 div를 페이지의 오른쪽 또는 왼쪽으로 밀어 넣을 수 있습니다(시도해보세요).
예제: **margin: 0 auto 0 0**


## Absolute Positioning 사용

요소를 position을 absolute를 설정하면 기본적으로 페이지에 원하는 요소의 위치를 배치 할 수 있습니다. 그러나 한 가지 단점이 있습니다.
*position: absolute*는 페이지에서 element의 flow을 제거합니다.(element의 배치 flow)

왜 이것이 중요할까요?

요소를 잘못 사용하면 요소가 겹칠 수 있으므로 중요합니다.

처음 두 가지 방법으로 했던 것처럼 요소를 페이지에 수평으로 놓으려면 다음 세 가지를 기억해야 합니다.
1. 요소의 position 속성을 absolute로 설정합니다.
2. 요소에 *left: 50 %*를 적용합니다.
3. *마이너스하세요.* 요소 너비의 절반만큼 margin-left을  설정 *margin-left: -50px*

이 예에서 우리는 녹색 사각형을 사용합니다. 다른 예제와 같은 크기이므로 너비는 100px입니다.

"position : absolute"를 입력하고 "left : 50 %"를 녹색 사각형에 적용했습니다. 그러면 브라우저에서 왼쪽 가장자리를 오른쪽으로 50 % 이동합니다.

그러나 현재상태에선 녹색 사각형의 왼쪽 가장자리가 중간에 오는것이 아니라 녹색 사각형 가운데가 페이지 가운데에 오도록하고 싶습니다.

우리를 마지막 단계로 margin의 공간을 없애기 위해, 우리는 녹색 사각형의 *너비의 절반* 왼쪽 여백을 *마이너스*로 적용합니다.
이번 예제는 -50px입니다.


## Transform/Translate 사용

[Codepen 예제](https://codepen.io/stephen_sun/pen/WyENWK)

지금까지는 DOM을 수평으로 배치하는 것만 초점을 맞추었지만, 페이지 중앙에 뭔가를 넣고 싶다면 어떻게해야할까요?
이번 예제인 빨간색 사각형은 가로와 세로 모두 중앙에 배치합니다.

이 방법에서도 *position: absolute"와 "left: 50 %"를 사용하지만 요소에 두 개의 속성을 추가로 적용했습니다.

*top* 속성을 *50%*로 설정함으로써, 브라우저 중앙에 빨간색 사각형의 위쪽 가장자리를 수직으로 정렬합니다. 하지만 앞의 예에서와 같이, 가장자리들이 중앙에 정렬되는 것을 원치 않습니다. 우리는 사각형의 중심이 페이지 중앙에 맞추기를 원합니다.

**여기서 우리는 *transform*이라는 새로운 속성을 적용합니다.**

*transform*에는 *translating(변환)*, *rotate(회전)*, *scaling(크기조정)* 애니메이션 같은 많은 멋진 것들이 있습니다.
하지만 이 예제에서는*translate*을 사용할 것입니다.

transform 속성을 *transform: translate (-50%, -50%)*으로 작성합니다.

우리의 빨간 사각형은 가로와 세로 모두 중앙에 위치 했습니다!

저는 이 방법이 마음에 듭니다. 요소의 폭이나 높이에 상관없이 항상 페이지 중앙에 있기 때문입니다.

이 방법은 반응형 설계에 자주 사용되며, *position:absolute* 방법처럼 *여백이 정의될 필요가 없습니다.*


## Flexbox 방법

[Codepen 예제](https://codepen.io/stephen_sun/pen/ERvxqa)

Flexbox에 익숙하지 않아도 괜찮습니다! 
Flexbox는 페이지에 요소를 정렬하고, 배치하는 효율적인 방법을 제공하는 레이아웃 속성입니다.

Flexbox 학습에 관심이 있다면 [Flexbox Froggy](https://flexboxfroggy.com/)(매우 권장)는 재미 있고 배우기 쉬운 방법입니다.
p.s 물론 Flexbox를 배우는 데 사용 된 것입니다.^^

Flexbox를 사용하여 수평 및 수직을 중앙에 정렬하는 네 가지 단계는 다음과 같습니다.
1. HTML, body 및 부모 컨테이너의 높이가 100%이어야합니다.
2. 부모 컨테이너에서 display를 flex로 설정
3. 부모 컨테이너에 *align-items: center* 설정
4. 부모 컨테이너에 * justify-content: center* 설정

부모에서 display를 flex로 설정하면 플렉스 컨테이너로 정의됩니다.

align-items을 center로 설정하면 children 또는 flex 항목을 부모 내에서 세로 중앙에 배치됩니다.
Justify-content는 같은 방식으로 작동하지만 예제의 경우 가로 방향으로 작동합니다.

저는 *반응형작업*에도 좋고 *여백 계산도 필요 없기 때문*에 이 방법을 사용하는 것을 좋아합니다.

이 게시물이 유익하고 도움이 되었기를 바랍니다. 
당신의 의견을 듣고 싶습니다!

읽어 주셔서 감사합니다! :)

********
## 출처

이 글은 [Medium](https://medium.com/)의 [Stephen Sun](https://medium.freecodecamp.org/@stephen_sun)의 [포스팅 글](https://medium.freecodecamp.org/how-to-center-things-with-style-in-css-dc87b7542689)을 번역한 것입니다.