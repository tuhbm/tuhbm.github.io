---
title: 얕은복사(shallow copy)&깊은복사(deep copy)
date: 2021-03-17 21:45:01
categories:
  - 공부
  - 용어정리
tags:
   - shallow copy
   - deep copy
   - 원시값
   - 참조값
thumbnail: https://tuhbm.github.io/images/bnr-etc.jpg
---

## 용어정리

이 카테고리는 비전공자로서 개발자로써 공부하며, 평소 이해하지 못한 단어를 제방식대로 정리하는 카테고리입니다.  
제방식대로 풀어 쓴것이므로 오류가 있을 수 있습니다.  
오류가 있을시 댓글로 남겨주시면 참고하도록 하겠습니다.
***
![복사 아이콘](https://tuhbm.github.io/images/terms/copy_img1.png)
### 사전적정의
**복사** - 원본을 베낌.  원본을 본뜨거나 그대로 옮겨 놓는것
<!-- more -->
자바스크립트에서 복사( a = b)의 방법은 값에 타입에 따라 할당 또는 참조의 형태로 실행된다. 사실 어떠한 값을 변수에 지정시 변수명은 데이터의 메모리 공간에 대한 주소를 가르킨다. 이러한 부분은 데이터의 형태에 따라 복사시 실제 값을 할당하거나, 그 데이터의 값을 참조하는 형태로 복사된다.

#### 원시타입
-   Number
-   String
-   Boolean
-   Null
-   Undefined

원시타입은 깊은 복사로 해당 값에 대한 메모리에 저장된 데이터를 **'원본데이터값 자체를 복사한다.'** 라고 생각하면 이해가 쉽다. 그렇기에 새로 복사된 데이터을 직접 조작 및 변경해도 기존의 **원본 데이터에는 영향이 없다.**

#### 참조타입
-   Object
-   Symbol

참조타입은 말그대로 해당 메모리에 대한 주소를 참조(해당 주소를 바라본다 정도로 해석)한다고 볼 수 있다. 그렇기에 원본 데이터 또는 복사된 데이터의 값을 조작한다면 **같은 메모리의 주소값을 참조하므로 값이 변경된다.**

데이터의 타입에 따라 깊은 복사와 얕은 복사가 진행되지만, 참조타입의 데이터도 얕은 복사를 할 수 있는데, 그 방법은 아래와 같다
##### 참조타입의 얕은복사
- [Object.assign() 메소드 사용](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Spread operator 사용](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 요약
얕은 복사(참조타입) = 같은 메모리 주소를 참조하므로 값이 기존 데이터도 변경
깊은 복사(원시타입) = 데이터의 값만 복사하므로 변경시 기존 데이터 영향 없음
### 예시
얕은 복사(참조)
```javascript
let a = 1;
let b = a;

console.log(a); // 1
console.log(b); // 1

a = 2;
console.log(a) // 2
console.log(b) // 1
```

깊은 복사
```javascript
let a = { name: 'Park'};
let b = a; // 참조

console.log(a); //{name: "Park"}
console.log(b); //{name: "Park"}

a.name = 'Kim';

console.log(a); //{name: "Kim"}
console.log(b); //{name: "Kim"}
```
