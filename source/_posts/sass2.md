---
title: SASS에 대해 알아보자2
tags:
  - sass
  - scss
  - 사스
  - 변수
  - mixin
  - include
categories:
  - 공부
  - CSS
  - SASS
date: 2018-01-24 20:01:13
thumbnail: https://tuhbm.github.io/images/bnr-css.jpg
---

# SASS
`SASS를 통칭 사스 라고 표기하겠습니다.`
[지난 포스팅](https://tuhbm.github.io/2018/01/24/sass1/)을 통해 SASS의 확장자가 최종적으로 `.scss`로 확정되었다고 말씀드렸습니다.
이번 포스팅부터는 사스의 문법에 대해 알아보겠습니다.

## 변수사용
변수를 사용하므로써, 한번의 변경으로 사용한 모든 변수의 값을 바꿀 수 있는 효율적인 방법이라고 말씀드렸었습니다.
변수를 `키`와`값`으로 표현해 보겠습니다.
```scss
$normalFontSize: 14px;
```
<!-- more -->
이제 `14px`은 `$normalFontSize`에 담겨있습니다.
여러가지의 형태로도 담을 수 있습니다.
이때 사용하는것이 `@mixin`입니다.
예를 들어보겠습니다.
대표적인 예로 우리는 `float을 해제` 할 때 여러방법이 있지만 가상선택자인 `:after를 사용한 클리어` 방법을 상황에 따라 사용합니다.
이것을 사스로 표현해보겠습니다.
```scss
@mixin afterClear {
  display: block;
  content: '';
  clear: both;
}

ul {
  &:after{
    @include afterClear;
  }
  li{
    float:left;
  }
}
```
사스에서 CSS의 컴파일 된 코드를 보겠습니다.
```css
ul:after {
   display: block;
   content: '';
   clear: both;
}

ul li {
   float: left;
}
```
이처럼 코드 뭉치의 재사용도 가능합니다. 이처럼 선언시에는 `@mixin`으로 사용할때에는 `@include`로 사용하는 것을 볼 수 있습니다.
또한
```scss
@mixin setImageMaskRotate {
    @include setImageMask;
    @include rotate;
}
@mixin setImageMask {
    position: relative;

    &:after{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 10px solid #000;
        opacity: 0.2;
        content: '';
    }
}
@mixin rotate {
    transform: rotate(45deg);
}
```
이처럼 `@mixin`안에 `@mixin`을 넣는것 역시 가능합니다.
사실 `@mixin`은 `변수`의 개념보다는 `함수`의 개념에 가깝습니다. 이유를 살펴보도록 하겠습니다.
```scss
@mixin center($width, $height) {
    position: absolute;
    top: 50%;
    margin-top: - $height / 2;
    left: 50%;
    margin-left: - $width / 2;
    height: $height;
    width: $width;
}

.ex_box_1{
    @include center(100px, 100px);
    background-color: pink;
}
.ex_box_2{
    @include center(300px, 100px);
    background-color: orange;
}
```
`매개변수`의 사용이 가능합니다. 컴파일 코드를 보면
```css
.ex_box_1 {
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 50%;
    margin-left: -50px;
    height: 100px;
    width: 100px;
    background-color: pink;
}
.ex_box_2 {
    position: absolute;
    top: 50%;
    margin-top: -50px;
    left: 50%;
    margin-left: -150px;
    height: 100px;
    width: 300px;
    background-color: orange;
}
```
이처럼 매개변수의 값을 통해 `연산` 또한 가능함을 알 수 있습니다.
사스의 기능을 설명 드리려고 하니, 기능이 너무너무 많아서 한번에 다 설명이 힘들어 여러편에 나누어야 할 것 같습니다.
다음시간에는 `@extend`에 부터 설명을 드리겠습니다.