---
title: 자바스트립트 함수 정리 1편
date: 2017-08-17 21:50:26
categories: 
- Javascript
tags:
- function
- 함수
- 함수표현식
- 함수선언문
- 생성자함수
- new
- javascript function
- javascript 
thumbnail: https://tuhbm.github.io/images/bnr-js.jpg
---

# 함수정리

## > 사용법편

함수란 무엇일까요?
우리는 중학교를 나왔다면, 이미 들어봤을것입니다.
간단한 함수를 보며 살펴 보겠습니다.

 y = f(x)
<!-- more -->
중학교 교과에서 보아왔던 간단한 함수입니다.
x는 정의역 
y는 치역으로
x라는 정의된 값을 함수에 넣으면, y라는 치역값이 나오는것입니다.
이러한 함수를 자바스크립트에서도 사용하고 있습니다.

자바스크립트에서 함수는 여러 방법으로 사용될 수 있습니다.
****
### 1. 함수 표현식
```javascript
var 식별자 = function(){
  //이곳에 함수내 처리할 식을 적어주세요.
}
```
이런식으로 식별자에 함수를 대입하는 것이라고 볼 수 있습니다.
식별자에 값을 대입하는 것 입니다.
"값을 대입하는것인대, 왜 함수를 넣는나요..?"
함수는 값입니다.
우리는 함수는 치역(y)라는 값을 배출합니다.
그러므로 함수는 값으로 볼 수 있습니다.

```javascript
var practice = function(num){
  return num;
}
practice(5); //5
```
위함수를 예로 들어보면 5를 배출하는것으로 볼 수 있습니다.
*****
### 2. 함수 선언문
```javascript
function 식별자(){
  //이곳에 함수내 처리할 식을 적어주세요.
}
```
이런식으로 함수를 선언 하는 것입니다.
함수표현식과는 다르게 함수를 대입하는것이 아니라 그차제가 함수인 것 입니다.
```javascript
function practice2(num){
  return num;
}
practice2(1) //1
```
이처럼 1을 리턴 하는것을 볼 수 있습니다.
"음…그럼 함수는 값이라고 했으니 매개변수(parameter)에 함수를 넣어도 되나요?"

**"네 됩니다. 함수는 값이니까요."**

예를 들어보겠습니다.
```javascript
var practice = function(num){
  return num;
}
function practice2(num){
  return num;
}
///함수 표현식으로 만든 함수에 num(parameter)에 함수를 넣으면
practice(practice2(5)); ///5
```
이처럼 매개변수(parameter)값으로 함수를 넣어도 잘 실행이 되는것을 볼 수 있습니다.
****
### 3. 생성자 함수
생성자 함수는 어렵습니다.
생성자 함수를 만들고,
새로운 식별자에 생성자 함수를 대입하여,
반복되는 함수를 줄이는 방법, 그리고 
```javascript
var Person = function(name) {
  this.name = name;
  this.introduce = function() {
    return "Hi, my name is " + this.name;
  };
};
var ktk = new Person('ktk');
var jhk = new Person('jhk');
console.log(ktk.introduce()); // Hi, my name is ktk
console.log(jhk.introduce()); // Hi, my name is jhk
```
예제에서 Person은 **생성자 함수**이다. 
**이처럼 함수는 반복될 수 있는 구조를 줄이기 위해 생성자 함수를 사용합니다.**



**마무리**
함수사용법에 대해 포스팅을 해보았는데요.
**함수는 값이다.**
**함수는 반복을 줄이기위해 사용한다.**
이외에도 함수를 사용하는 이유는 다음번기회에 포스팅하겠습니다.

오늘의 포스팅을 마치겠습니다.