---
title: 리터럴이란 무엇일까?
date: 2018-01-26 19:43:00
categories:
  - 공부
  - 용어정리
tags:
   - var
   - let
   - const
   - 리터럴
   - literal
   - 상수
   - 변수
   - 값
   - 메모리
thumbnail: https://tuhbm.github.io/images/bnr-etc.jpg
---

## 용어정리
이 카테고리는 비전공자로서 개발자로써 공부하며, 평소 이해하지 못한 단어를 제방식대로 정리하는 카테고리입니다.
제방식대로 풀어 쓴것이므로 오류가 있을 수 있습니다.
오류가 있을시 댓글로 남겨주시면 참고하도록 하겠습니다.
*****
![리터럴](https://tuhbm.github.io/images/terms/literal_img1.jpg)
# 리터럴
프로그램 개발을 하다보면, 리터럴이라는 단어를 많이 사용한다.
먼저 위키를 살펴보자
<!-- more -->
[리터럴](https://ko.wikipedia.org/wiki/%EB%A6%AC%ED%84%B0%EB%9F%B4)
리터럴이란? `소스 코드의 고정된 값을 대표하는 용어`이다.
고정된 값은 숫자, 문자, 함수 등 더이상 나눌 수 없는 명확하게 데이터를 표현하는 값이다.

예를 들어보자.
````javascript
const intergerNum = 123; // 정수인 number리터럴
const floatingPointNum = 54.5413; // 실수인(소수점) number리터럴
const str = '글자'; // 문자 리터럴
const func = function (a) { return a;} // 함수 리터럴
const obj = { x: 123, y : 456} // 객체 리터럴
const regex = /[a-z]/; // 정규표현식 리터럴
const arr = [1,2,3]; // 배열 리터럴
const bool = true; // boolean 리터럴
````
이와같이 Javascript의 리터럴 종류가 있다.
리터럴은 더이상 나눌 수 없는 값이므로(`변화가 불가능하다 라는 뜻은 아니다`) 변수 선언한다면, `const`로 선언 해야한다.