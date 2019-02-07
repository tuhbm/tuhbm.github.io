---
title: let 과 const
date: 2018-03-05 22:32:46
categories: 
- Javascript

tags:
- scope
- ES6
- var
- let
- const
thumbnail: https://tuhbm.github.io/images/bnr-js.jpg
---

# let과 const
과거 ES5이하에서는 변수를 선언할때 아래와 같은 방식을 사용하였다.
```javascript
var a = 1;
var b = 2;
var c = a + b;
```
이러한 선언 방식은 javascript에게 유연함을 선물해 준 대신, 타언어를 공부한 많은 개발자들에게 혼란을 초래 했다.
2015년 ECMAscript2015 또는 ES6로 자바스크립트가 변화하면서, 많은 혼란을 조금을 달래줄 수 있었다.

오늘은 ES6의 변수 선언방식인 `let`과 `const`에 대해 알아보겠다.
과거 javascript의 변수를 `var`로 선언하였을때 함수스코프, 호이스팅 등 많은 자유로움으로 인해 작은 문제가 큰문제로 발생하는 경우가 많았다.

ES6의 변수 선언방식인 `let`과 `const`는 *block-scope*로 스코프범위를 일반적인 다른 언어들과 맞추었다.
예를 들어보자.

<!-- more -->

```javascript
console.log(a); // undefined
var a = 1;
console.log(a);1
{
  var a = 2;
}
console.log(a); //2
```
이처럼 `var`로 선언한 변수는 블록스코프 규칙을 따르지 않는다.


`let`의 경우를 살펴보자.
```javascript
console.log(a); //Uncaught ReferenceError: a is not define. - 선언되지 않은 함수로써 호이스팅이 되지않아 실행조차 되지 않는다.
//위에 콘솔이 없다는 가정하에 계속 진행해보겠다.
let a = 1;
console.log(a); //1
{
  let a = 2;
  console.log(a); //2
}
console.log(a); //1
```
이처럼 `{  }`블록스코프로 인해 블록안에 변수만 2로 재할당 된것을 볼 수 있다.

또한, 중복 선언도 금지되어있다.
```javascript
var a = 1;
var b = 2; //2

let b = 1;
let b = 2; //Uncaught SyntaxError: Identifier 'b' has already been declared
b = 2; //2
```
같은 스코프 내에서 let은 재선언이 불가능하다.

## let과 const의 차이
ES6의 변수인 `let`과 `const`의 차이는 바로 할당에 있다.
위의 경우에 `let`은 재선언이 불가능 하였지만, 재할당은 가능함을 볼 수 있었다.
하지만 `const`는 [상수](https://ko.wikipedia.org/wiki/%EC%88%98%ED%95%99_%EC%83%81%EC%88%98)로 재할당이 불가능하다.

```javascript
const a; //Uncaught SyntaxError: Missing initializer in const declaration
const a = 1;
const a = 2; //Uncaught SyntaxError: Identifier 'a' has already been declared
a = 3; //Uncaught TypeError: Assignment to constant variable.
```

이처럼 상수 `const`는 *할당* 그리고 *재선언*도 불가능하다. 그리고 특이한점은 `const`를 사용하여 선언시 할당이 불가능하므로, 선언과 동시에 할당을 해야합니다.

## let과 const의 사용
`let`과 `const`의 특징에 대해 알아보았다. 그렇다면 언제 사용할까?

`let`은 재할당이 가능하다. 그러므로 원시형자료인 *string, number, bloolean, null, undefined*에 사용하고,
`const`는 재할당이 불가능하므로, *array, Object*등 참조형자료인경우 사용한다. 왜냐하면 `const`는 `immutable`하지만 프로퍼티의 할당 및 재할당은 가능하다.
