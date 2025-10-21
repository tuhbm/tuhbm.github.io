---
title: 번역 - 비동기 자바스크립트의 간단한 참고서 2편
tags:
  - promise
  - resolve
  - reject
  - all
  - method
  - 동기
  - 비동기
  - synchronous
  - asynchronous
categories:
  - 공부
  - Javascript
thumbnail: 'https://tuhbm.github.io/images/bnr-js.jpg'
date: 2018-11-14 21:31:06
---


# 비동기 자바스크립트의 간단한 참고서 2편

지난시간 [1편](https://tuhbm.github.io/2018/11/05/async01/)에서 동기와 비동기에 대해 배우고, `callback`을 통해 비동기 통신을 해보았습니다.
이번시간에는 callback이 아닌 `Promise`을 알아보고 이를 통해 비동기 작업을 진행하는 방법을 알아보겠습니다.

## Promises

```text
Promise는 아마도 자바 스크립트로 비동기 프로그래밍에서 가장 중요한 추상적인 개념 일 것입니다. 
Promise는 다른 많은 비동기 추상적인 개념을 위한 토대를 마련하기 때문에 이 섹션을 반드시 주의 깊게 읽으십시오.
```
Promise는 미래의 특정 시점에서 실행될 때 성공하거나 실패할 수 있는 비동기 작업의 결과를 나타내는 개체입니다. 예를 들어 API 서버에 요청을 할 때 api 호출의 결과를 나타내는 약속을 반환할 수 있습니다. 
api 호출은 성공할 수도 있고 성공하지 못할 수도 있지만 결국에는 사용할 수있는 promise 객체를 얻게됩니다. 아래의 함수는 api 호출을 수행하고 그 결과를 promise 형식으로 반환합니다.

```javascript
// code/promises/axios-example.js
const axios = require('axios'); // A
function getDataFromServer() {
  const result = axios.get('https://jsonplaceholder.typicode.com/posts/1'); // B
  return result; // C
}
```
- A 행 [axios](https://github.com/axios/axios)에서 promise 기반 http 클라이언트 인 모듈을 로드합니다.
- B 행에서 우리는 axios api의 endpoint에서 GET 요청을하고 그 결과를 result 상수로 저장합니다.
- C 행에서 우리는 promise를 리턴합니다.
<!-- more -->
이제 함수를 호출하고 결과에 접근하여 오류를 캐치 할 수 있습니다.
```javascript
getDataFromServer()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

모든 Promise에는 `then`과 `catch` 메서드를 가지고있습니다. `then`메소드는 실행 후 성공한 결과를 캡쳐하고, `catch`메서드의 경우 실행에 실패한 경우 사용된다. 
`then`과 `catch 모두 단일 인자의 콜백 함수를 사용하여 결과를 캡처합니다. 또한이 두 방법 모두 메서드 체인을 연결할 수 있는 Promise을 반환한다는 점에 주목할 필요가 있습니다.

다음은 Promise를 반환 할 수 있는 비동기 작업의 몇 가지 예입니다.
- 파일의 내용 읽기 : 반환 된 Promise에는 파일의 내용이 포함됩니다.
- 디렉토리 내용 나열 : 반환 된 Promise에는 파일 목록이 포함됩니다.
- csv 파일 구문 분석 : 반환 된 Promise에는 구문 분석 된 내용이 포함됩니다
- 데이터베이스에 대해 일부 쿼리 실행 : 반환 된 Promise에는 쿼리 결과가 포함됩니다.

아래 그림은 Promise의 상태를 요약 한 것입니다.
![Promise에는 보류 중, 이행 중 또는 거부 중이라는 세 가지 상태가 있습니다. 비동기 작업이 진행 중일때 약속은 보류 상태입니다. 비동기 작업이 완료되면 Promise는 값으로 해결되거나 오류와 함께 거부됩니다.](https://tuhbm.github.io/images/javascript/async/async_sub_img2.png)

## Promise의 이점

Promise는 다른 언어로 존재했으며 콜백 메커니즘에 대한 추상화를 제공하기 위해 JavaScript에 도입되었습니다. 콜백은 비동기식 작업을 처리하는 주요 메커니즘이지만, 작업하기가 지루하거나 매우 복잡해질 수 있습니다. 
Promise는 콜백 및 비동기 작업 작업을 단순화하기 위해 JavaScript에서 구현되었습니다.

## Promise 만들기
우리는 글로벌 생성자를 사용하여 Promise를 만들 수 있습니다.
```javascript
const myPromise = new Promise();
```

글로벌 생성자는 두개의 인자로 콜백 함수를 사용합니다. 첫 번째 인자는 비동기 작업 결과를 성공하여 값을 캡처하는데 사용되며 두 번째 인자는 오류가 났을때 사용됩니다.

```javascript
const myPromise = new Promise(function(resolve, reject) {
  if(someError) {
      reject(new Error(someError));
  } else {
      resolve('ok');
  }
});
```
그리고 앞서 말했듯이 `then` 메서드는 약속을 해결할 때 사용하고, 오류를 처리할때 `catch` 메서드를 사용 할 수 있습니다.

```javascript
myPromise
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.log(error);
  });
```

모든 비동기식 작업을 *promise*로 처리할 수 있습니다. 예를 들어, `fs.readFile`메소드는 파일의 내용을 비동기 적으로 읽는 메소드입니다. 
`fs.readFile`방법은 다음과 같이 사용됩니다.
```javascript
fs.readFile('some-file.txt', 'utf-8', function(error, content) {
  if(error) {
    return console.log(error);
  }
  console.log(content);
});
```
`fs.readFile`로 이를 파일의 내용을 읽고, Promise를 통해 사용하거나 오류가 있는 경우 거부하는 `readFile`함수를 만들 수 있습니다.

```javascript
// code/promises/wrap-readfile1.js
const fs = require('fs');
function readFile(file, format) {
  format = format || 'utf-8';
  function handler(resolve, reject) {
    fs.readFile(file, format, function(err, content) {
      if(err) {
        return reject(err);
      }
      return resolve(content);
    });
  }
  const promise = new Promise(handler);
  return promise;
}
```
동일한 기능의 코드로 이처럼 간결하게 작성할 수 있습니다.

```javascript
// code/promises/wrap-readfile2.js
const fs = require('fs');
function readFile(file, format = 'utf-8') {
  return new Promise((resolve, reject) => {
    fs.readFile(file, format, (err, content) => {
      if(err) return reject(err);
      resolve(content);
    });
  });
}
```
이제 함수를 호출하고 `then`메서드로 결과를 가져오고 `catch`메서드로 오류를 처리할 수 있습니다.

```javascript
readFile('./example.txt')
  .then(content => console.log(content))
  .catch(err => console.log(err));

```
Node8에서 소개 된 방법인 `util.promisify`메서드를 사용하여 더 간결하게 우리는 위의 코드를 작성할 수 있습니다 .
```javascript
// code/promises/promisify-example.js
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('./example.txt', 'utf-8')
  .then(content => console.log(content))
  .catch(err => console.log(err));
```
`util.promisify`메서드는 Node에서 콜백 규칙을 따르고 Promise-based 버전을 반환하는 함수를 사용합니다.
당신은 이제 왜 모든 메서드를 Promise-based로 하지 않는지 궁굼해 할 수 있습니다. Promise는 콜백보다 높은 수준의 추상화이기 때문에 로우 레벨의 노드 메소드는 Promise 기반이 아닙니다.
비동기식 운영을 처리하기 위해 Promise와 같은 높은 추상화가 필요한지 결정하는 것은 프로그래머에게 달려 있습니다.

## Promise 정적 메서드
`Promise` 생성자는 자주 사용하는 몇가지 유용한 정적인 메소드들을 가지고 있습니다. 
모든 코드는 여기 [code/promises/static-methods.js](https://gitlab.com/aj_meyghani/asyncjs-code-examples/blob/master/promises/static-methods.js) 스니펫이 있습니다. 
주목할만한 것들은 다음과 같습니다.

`Promise.resolve`: 승인된 Promise 객체 사용
```javascript
function getData() {
  return Promise.resolve('some data');
}
getData()
  .then(d => console.log(d));
```

`Promise.reject`: 거절 Promise 객체 사용
```javascript
function rejectPromise() {
  return Promise.reject(new Error('something went wrong'));
}
rejectPromise()
  .catch(e => console.log(e));
```

`Promise.all`: 여러개의 승인된 Promise 객체를 사용

```javascript
const p1 = Promise.resolve('v1');
const p2 = Promise.resolve('v2');
const p3 = Promise.resolve('v3');

const all = Promise.all([p1, p2, p3]);

all.then(values => console.log(values[0], values[1], values[2]));
```
`Promise.all`은 Promise 객체의 배열을 무작위 순서로 평가하고, 그들 모두 해결 될때까지 "대기"합니다.
배열에 있는 모든 값을 제출한 순서대로 모든 Promise객체를 반환하지만, 처리된 순서는 반환하지 않습니다. `Promise.all`은 순서대로 Promise를 처리하지 않고 원하는 순서대로 평가하게 된다는 것을 기억하세요.

지금까지 Promise에 대해 알아보았습니다.
다음글에서 순서대로 Promise를 실행 및 좀 더 실습을 해보겠습니다.

********
## 출처

이 글은 [Medium](https://medium.com/)의 [AJ Meyghani](https://medium.com/@ajmeyghani?source=post_header_lockup)의 [포스팅 글](https://medium.com/@ajmeyghani/async-javascript-a-pocket-reference-2bb16ac40d21)을 번역한 것입니다.