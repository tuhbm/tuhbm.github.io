---
title: 번역 - 자바스크립트 분해(destructuring)
tags:
  - array
  - object
  - destructuring
categories:
  - Javascript
thumbnail: 'https://tuhbm.github.io/images/bnr-js.jpg'
date: 2018-12-01 16:02:03
---


# 자바스크립트 객체와 배열 분해(destructuring)

![destructuring](https://tuhbm.github.io/images/javascript/destructuring_intro.jpg)

`destructuring`은 `배열` 및 `객체`의 값으로 변수를 생성하는 강력한 방법입니다. 
이 방법은 코드를 더 간결하게 만드는 방법입니다.

다만 `destructuring`은 ES2015(ES6)의 일부이며 모든 브라우저와 호환되지 않습니다.
모든 사용자에게 완전한 호환성을 보장하기 위해 babel, typescript 또는 코드를 ES5로 컴파일하는 모든 것을 사용할 것을 권장합니다.

## 배열 분해(destructuring)

배열의 값을 별도의 변수에 할당하려는 경우, destructuring을 통해 간단하고 깨끗하게 할당 할 수 있습니다. 
인덱스나 루프를 사용할 필요가 없습니다!
<!-- more -->
아래 예제에 4개의 값을 4개의 변수에 할당하려는 경우 다음과 같이 배열을 `destructuring`을 사용할 수 있습니다.
```javascript
const organizations = ['Pyke', 'Black Sun', 'Kanjiklub', 'Crimson Dawn'];
const [firstGang, secondGang, thirdGang, fourthGang] = organizations;

console.log(firstGang); // Outputs 'Pyke'
console.log(secondGang); // Outputs 'Black Sun'
console.log(thirdGang); // Outputs 'Kanjiklub'
console.log(fourthGang); // Outputs 'Crimson Dawn'
```
`변수 vs 값` 은 위치는 여기에서 중요합니다. 첫 번째 새 변수는 항상 배열의 첫 번째 값을 상속합니다.

하지만 `처음 두 값만 변수`로, `나머지는 배열`로 만들면 어떻게 될까요? 매우 간단합니다.
```javascript
const organizations = ['Pyke', 'Black Sun', 'Kanjiklub', 'Crimson Dawn'];
const [firstGang, secondGang, ...theRest] = organizations;

console.log(firstGang); // Outputs 'Pyke'
console.log(secondGang); // Outputs 'Black Sun'
console.log(theRest); // Outputs ['Kanjiklub', 'Crimson Dawn']
```

원하는 경우 기본값을 설정할 수도 있습니다! 
이렇게 하면 전달된 어레이의 값이 충분하지 않더라도 모든 변수의 값이 정의됩니다!
```javascript
const organizations = ['Pyke', 'Black Sun'];
const [
  firstGang = 'First Order',
  secondGang = 'Resistance',
  thirdGang = 'New Republic'
] = organizations;

console.log(firstGang); // Outputs 'Pyke'
console.log(secondGang); // Outputs 'Black Sun'
console.log(thirdGang); // Outputs 'New Republic'
```
### 일반적인 사례
지금은 당장 이러한 방법을 언제 사용할지 궁굼 할 것입니다. 이러한 사례들은 도대체 언제 사용하나요?
실제로 많은 곳에서 사용 할 수 있습니다. 예를 들어 블로그 게시물이 배열로 있지만 다른 게시물과 다르게 첫번째 게시물을 조작하고 싶다면,
이러한 경우 `destructuring`을 사용하여, 첫번째 게시물과 나머지 게시물을 두개의 변수로 나눌 수 있습니다. 
```javascript
const [starPost, ... otherPosts] = blogPosts;
```
또는 배열의 처음 게시물 새가지만 메인에 노출하기위해 필요하다면, 세개의 변수를 선언하여 저장하면 됩니다.
```javascript
const [post1, post2, post3] = blogPosts;
```

*******

## 객체 분해(destructuring)
`destructuring`을 사용하여 `객체`의 값을 변수에 할당 할 수도 있습니다. 배열에서 사용했을때의 방법과 매우 유사합니다.

```javascript
const planet = {
  name: 'Hosnian Prime',
  faction: 'New Republic',
  weather: 'Temperate'
};
const { name, faction, weather } = planet;

console.log(name); // Outputs 'Hosnian Prime'
console.log(faction); // Outputs 'New Republic'
console.log(weather); // Outputs 'Temperate'
```

위의 예제에서 볼 수 있듯이, 우리는 객체의 키의 이름과 `같은 이름을 변수`에 사용했습니다.
그러나 키와 이름이 다른 변수를 정의할 수 있습니다. 방법은 아래와 같습니다.
```javascript
const planet = {
  name: 'Hosnian Prime',
  faction: 'New Republic',
  weather: 'Temperate'
};
const {
  name: system,
  faction: team,
  weather: conditions
} = planet;

console.log(system); // Outputs 'Hosnian Prime'
console.log(team); // Outputs 'New Republic'
console.log(conditions); // Outputs 'Temperate'
```

배열과 마찬가지로 기본값을 설정할 수도 있습니다.
```javascript
const planet = {
  name: 'Hosnian Prime'
};
const {
  name = 'Unknown planet',
  faction = 'Unknown faction',
  weather = 'Unknown conditions'
} = planet;

console.log(name); // Outputs 'Hosnian Prime'
console.log(faction); // Outputs 'Unknown faction'
console.log(weather); // Outputs 'Unknown conditions'
```
### 일반적인 사례
객체에서 하나 이상의 값만 필요로 하면 그동안 우리는 `객체의이름.키이름`을 사용하여 접근하였습니다. 
하지만 우리는 `destructuring`을 통해 매우 간단하게 새 변수에 저장하면됩니다.(코드가 매우 간결하게 유지됩니다.)

그러나 객체 destructuring의 가장 주요한 기능은 `옵션에 대한 처리`입니다.
기본값을 사용하여 옵션을 처리하는 함수가 있다고 가정하면 다음과 같은 간단한 방법으로 옵션을 처리할 수 있습니다.
```javascript
function shipGenerator(options = {}) {
  const {
    cannons = 4,
    engines = 2,
    crew = 10
  } = options; // Default options
  
  return `This ship has ${cannons} cannons, ${engines} engines, and ${crew} crew members.`;
}

console.log(shipGenerator({ engines: 10, crew: 20 })); // Outputs 'This ship has 4 cannons, 10 engines and 20 crew members.'
console.log(shipGenerator({ cannons: 0 })); // Outputs 'This ship has 0 cannons, 2 engines and 10 crew members.'
console.log(shipGenerator()); // Outputs 'This ship has 4 cannons, 2 engines and 10 crew members.'
```
위에서 본것처럼 `option = {}`을 인수로 쓰면 아무것도 전달되지 않았을 경우 기본적으로 빈 객체의 값을 사용하도록 지정하였습니다.

그후 우리는 `destructuring`를 사용하여 기본 옵션값을 `오버라이드(override)`를 계속 하며 사용합니다. 우리가 만든 함수는 간단하게 `cannons`의 값을 변경하며 사용하였습니다.

## `destructuring`사용을 다른사람에게 권장하세요.
당신은 `destructuring`과 같은 멋진 방법을 프로젝트에서 사용하였나요? 아래 댓글을 통해 의견을 남겨 동료 개발자들을 돕고 소통하세요~!

그리고 지속적인 코딩을 하세요~! :)

********
## 출처

이 글은 [Medium](https://medium.com/)의 [AJ Meyghani](https://medium.com/@etiennetalbot)의 [포스팅 글](https://medium.com/poka-techblog/destructuring-in-javascript-f4f56d5cbd80)을 번역한 것입니다.