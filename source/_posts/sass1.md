---
title: SASS에 대해 알아보자1
tags:
  - sass
  - compile
  - scss
  - 전처리기
  - processors
  - 사스
categories:
  - 공부
  - CSS
  - SASS
date: 2018-01-24 16:12:13
thumbnail: https://tuhbm.github.io/images/bnr-css.jpg
---

# SASS

`SASS를 통칭 사스 라고 표기하겠습니다.`
금일은 사스에 대해 알아보겠습니다. 
우선 컴파일 하는 방법에 대해 지난번 포스팅한 것이 있는데요.
> **1. [scout앱 사용하여 컴파일하기](https://tuhbm.github.io/2017/07/17/sass-compile/) (지난번 포스팅내용입니다.)**
> **2. [Ruby를 설치해 Cli를 통해 컴파일하기](https://velopert.com/1712)**
> **3. [gulp등 Task runner(또는 webpack같은 빌드도구)이용하여 컴파일하기](http://webclub.tistory.com/470)**
> **4. [prepros](https://prepros.io/) 또는 [kolal](http://koala-app.com/)등의 앱사용하기**

사스는 이렇게 컴파일 하시면 되겠구요.
<!-- more -->
## 사스등 CSS 전처리기의 사용 이유
우선 [전처리기(위키바로가기)](https://ko.wikipedia.org/wiki/%EC%A0%84%EC%B2%98%EB%A6%AC%EA%B8%B0)란?
요약해보면 입력 데이터를 처리하여 다른 프로그램에 대한 입력으로서 사용되는 출력물을 만들어내는 프로그램입니다.

CSS는 웹을 구현하는데 `스타일`을 담당하고 있습니다. 그렇기에 CSS만으로 웹을 정복하겠다는 생각을 가지신분을 없으시겠죠...?
CSS는 웹의 스타일을 담당하는 웹에서 필수는 아니지만, 보이는 부분을 처리해주는 중요한 역할을 하고 있습니다. CSS가 없는 웹을 상상해 보셨나요?
보신적있으신가요? 대부분 없을테니 보여드리겠습니다.
![css](https://tuhbm.github.io/images/sass/sass_img1.png)
어떤가요. 우리나라의 녹색사이트 입니다.
이처럼 CSS로 인해 스타일을 입히는 것은 매우 `중요`한 작업입니다.
물론 모든 회사들이 이부분을 알기 때문에 css를 빼고 웹개발을 진행 할리없습니다.
서론이 길었습니다.

현대시대에 웹개발 기술은 지속적인 발전을 이루었습니다.
웹에서 돔을 구성하는 HTML도 템플릿화 된 jade 또는 pug등의 방법으로 발전하였고,
현재 가장 화두가 되고 있는 Javascript도 각각 라이브러리와 프레임워크등으로 발전하고 있습니다.
여기서 `발전 === 효율적으로 작업자들이 작업`을 할 수 있고, 깊게는 렌더링등의 성능적인 부분에도 영향을 줄 수 있습니다.(성능적인 부분은 문서가 짧아지고 그러므로써.)

개발자들에게 작업을 효율적으로 할 수 있는 일은 참 대단히 반가운 소리입니다.
이처럼 CSS도 전처리기를 통해 효율적으로 작업을 할 수 있습니다.

## CSS 전처리기의 종류
- [SASS](http://sass-lang.com/)
- [LESS](http://lesscss.org/)
- [Stylus](http://stylus-lang.com/)
- [CssNext](http://cssnext.io/)
- [PostCSS](http://postcss.org/)
현존하고 있는 `CSS전처리기`는 이정도 입니다.
각각의 차이는 있지만 변수나 함수등을 사용하여, `코드를 효율적으로 작성 및 관리` 할 수 있다는 공통적인 부분은 같습니다.

------

이제부터 SASS에 대해 본격적으로 알아보겠습니다.

## SASS의 특징
- `가장 오래된 역사`를 가진 전처리기이다.
- `Ruby` 언어를 기반으로 동작한다.
- 기존 CSS 문법과 `호환성`이 높다.
- `함수, 제어문`까지 제공하며 완성도 높은 프로그래밍 언어처럼 동작한다.
- 확장자명이 .SASS 와 .SCSS 로 두가지 방식의 확장자 사용이 가능하다.

### .SASS와 .SCSS의 차이
같은 사스라도 말씀드린 것처럼 .sass와 .scss가 있습니다.
차이를 알아보도록 하겠습니다.
````css
$normalFont: 14px
header
    font-size: $normalFont
    
.container
    display: block
    font-size: $normalFont
    
    p
      font-size: $normalFont
      color: #000
    
````
먼저 `.sass의 문법`입니다.
어떤가요? 보시는 바와 같이 괄호가 없습니다.
개인적으로는 보기 매우 불편하고, 헷갈릴것 같은 느낌이 듭니다.
이처럼 .sass는 `{}`괄호 대신 들여쓰기등의 `공백문자(white space)`를 통해 선택자를 구분합니다.
지금은 짧은 내용이지만, 내용이 길어지면 더욱 헷갈릴듯 합니다.

그렇게에 사스는 3.0버전부터는 문법이 .scss로 통일되었습니다.

````css
$normalFont: 14px;
header {
  font-size: $normalFont;
}
.container {
    display: block;
    font-size: $normalFont;
    
    p {
        font-size: $normalFont;
        color: #000;
    }
}    
````
통일된 .scss문법을 보시죠 괄호를 통해 매우 정갈함이 느껴집니다.
그런데 혹시 이 간단한 예제에서 CSS와 차이점을 느끼셨습니까?
네 맞습니다. `$normalFont: 14px;`를 지정하고 `$normalFont`를 호출하여 사용하고 있습니다.
이처럼 변수형태로 작성이 가능합니다.
에이... 별거아니네... 변수를 무시하시면 안됩니다. Javascript나 다른 언어에서도 사용하고 있는 변수는 매우 중요합니다.
지금처럼 몇번 사용하지 않았을 경우 직접 바꿔주거나, 에디터의 찾은 후 변경 같은 기능을 사용하면 됩니다.
하지만 10,000번을 사용한 부분이라면 어떨까요...?(여기부분은 마치 자바스크립트를 설명하는 느낌이네요..)
변수를 지정한 부분의 1번 수정으로 10,000번 이상 수정해야 할 부분을 변경할 수 있습니다.

그럼 위에 부분을 컴파일 하면 어떻게 나올까요?
````css
header {
    font-size: 14px;
}
.container{
    display: block;
    font-size: 14px;
}
.container p{
    font-size: 14px;
    color: #000;
}
````
이처럼 CSS의 원래 형태로 나오게 됩니다.
이러한 사스의 강점은 CSS가 길어지면 길어질 수록 강점을 발휘합니다.
잘 사용하면, 1000줄의 CSS를 700줄의 CSS로 줄일 수 있는 CSS전처리기 어떤가요?

다음시간엔 계속해서 `사스의 문법`에 대해 알아보겠습니다.
