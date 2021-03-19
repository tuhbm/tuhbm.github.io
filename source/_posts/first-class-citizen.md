---
title: 일급객체
categories:
  - 용어정리
tags:
   - 함수
   - 값
   - function
   - value
   - parameter
   - first class citizen
thumbnail: https://tuhbm.github.io/images/bnr-etc.jpg
---

## 용어정리

이 카테고리는 비전공자로서 개발자로써 공부하며, 평소 이해하지 못한 단어를 제방식대로 정리하는 카테고리입니다.  
제방식대로 풀어 쓴것이므로 오류가 있을 수 있습니다.  
오류가 있을시 댓글로 남겨주시면 참고하도록 하겠습니다.
***

## 일급객체
다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다. 보통 함수에 매개변수로 넘기기, 수정하기, 변수에 대입하기와 같은 연산을 지원할 때 일급 객체라고 한다.
<!-- more -->
- 변수, 배열내에 요소 객체의 프로퍼티등에 할당 가능
- 함수의 파라미터값으로 전달 및 반환 가능

````javascript
const sayHello = () => {
    return'Hi!!! nice to meet you';
}; //변수에 할당가능
const nationsHello = [
    '안녕하세요', 
    '싸와디캅', 
    'Hello', 
    () => {
        return '곤니찌와', '봉쥬르';
    }
]; // 배열내에 값으로 사용 가능
const sayIntroduce = (greeting, name) => {
    return `${greeting} \n my name is ${name}`;
};
sayIntroduce(sayHello(), 'john') // 함수의 파라미터로 사용 및 반환 가능
````

### 요약
일급객체: 변수, 배열등에 프로퍼티로 할당가능하고, 함수의 파라미터의 값으로 전달 가능
자바스크립트에서 함수는 결국 값을 리턴하고, 그러므로 어디든 함수로 전달가능하므로 일급객체이다.
