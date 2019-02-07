---
title: 번역 - 비동기 자바스크립트의 간단한 참고서 3편
tags:
  - promise
  - return
  - then
  - all
  - method
  - 동기
  - 비동기
  - synchronous
  - asynchronous
categories:
  - Javascript
thumbnail: 'https://tuhbm.github.io/images/bnr-js.jpg'
date: 2018-11-24 17:18:14
---

# 비동기 자바스크립트의 간단한 참고서 3편

지난시간 [1편](https://tuhbm.github.io/2018/11/05/async01/)에서 동기와 비동기에 대해 배우고, `callback`을 통해 비동기 통신을 해보았습니다.
[2편](https://tuhbm.github.io/2018/11/14/async02/)에서는 callback이 아닌 `Promise`을 알아보고 정적메소드를 알아보았습니다.
이번시간에는 `Promise`를 순서대로 진행해보고, 실습을 진행해 보겠습니다.

## `Promise`순서대로 실행하기

만약 두 개의 비동기 작업을 순서대로 실행하려면 다음과 같은 패턴을 따라야합니다.
```javascript
const promiseChain = task1()
  .then(function(task1Result) {
    return task2();
  })
  .then(function(task2Result) {
    return task3();
  })
  .then(function(task3Result){
    return task4();
  })
  .then(function(task4Result) {
    console.log('done', task4Result);
  })
  .catch(function(err) {
    console.log('Error', err);
  });
```
<!-- more -->
Promise 체이닝은 Promise를 반환하는 첫번째 작업을 호출하며 시작합니다.
이후에 `then`메소드를 통해 연결 유지할 수 있는 Promise를 반환하며 호출을 연결합니다.
이패턴을 언제 사용하는지 예를 들어보겠습니다.

우리는 유효하지 않은 무작위의 문자가 들어있는 텍스트 파일이 있다고 가정해보겠습니다. 이러한 문제를 해결하려면 우선 파일의 내용으 읽어야합니다.
그런 다음 유효하지 않은 문자를 제거하고 그 결과를 다른 파일에 기록해야합니다. Promise를 반환하는 각 연산에 대한 함수가 있다고 가정하면,
아래와 같이 Promise 체이닝을 사용할 수 있습니다.

```javascript
// code/promise/promise-in-sequence.js
const promiseChain = readFile('example.txt')
  .then(function(content) {
    return removeInvalidChracters(content);
  })
  .then(function(cleanContent) {
    return writeToFile('./clean-file.txt', cleanContent);
  })
  .then(function() {
    console.log('done');
  })
  .catch(function(error) {
    console.log(error);
  });
```
위의 코드는 Promise 체이닝을 사용하여 작업이 시작되어 각 작업이 원하는 순서대로 수행되고 완료됩니다.
각각의 `.then`메소드를 사용한 블록({})에서는 **return**을 통해 값을 반환해야합니다. 그렇지 않으면 의도한 순서대로 실행되지 않습니다.
그래서 `then`메소드를 사용한 각각의 블록({})에서 비동기 함수를 호출하여 올바른 순서대로 실행합니다.
아래는 항상 피해야 하는 코드의 예입니다.

```javascript
getUserData () 
  .then (info => { 
    authenticate (info) 
    .then (authResult => { 
      doSomething (authResult); 
    }); 
  });
```
위와 같은 방식은 적절하지 못한 방법입니다.
위의 방법 대신 적절한 체인을 통해 연결하여 사용하고, 각단계마다 값을 **return**해야 합니다.
아래와 같은 방법으로 말이죠!

```javascript
getUserData () 
.then (info => authenticate (info)) 
.then (authResult => doSomething (authResult))
```
위 코드에서는 한줄로 블록({})없이 화살표 함수를 사용했기 때문에 오른쪽의 `=>` 다음에 암시적으로 값이 **return**됩니다.

## 동시 Promise 실행하기
Promise를 반환하는 비동기 함수를 호출하면 해당 작업이 비동기적으로 실행된다고 가정해 볼 수 있습니다.
따라서 각행에서 각각의 함수를 하나씩 호출하면, 사실각 각 작업을 동시에 실행합니다.

```javascript
function runAll() {
  const p1 = taskA();
  const p2 = taskB();
  const p3 = taskC();
}

runAll();
```

이후 모든 작업이 끝났을때 무언가 하고 싶다면 `Promise.all`을 다음코드 처럼 사용 수 있습니다.
```javascript
// code/promises/run-all.js
function runAll() {
  const p1 = taskA();
  const p2 = taskB();
  const p3 = taskC();
  return Promise.all([p1, p2, p3]);
}

runAll()
  .then(d => console.log(d, 'all done'))
  .catch(e => console.log(e));
```
이제 동시적으로 실행해되는 Promise를 결합하는 방법에 대해 살펴 보겠습니다.

## Promise의 결합
동시적으로 실행해야 하는 작업을 진행해보겠습니다. 비동기적으로 저작해야하는 파일이 있다고 가정해보겠습니다. 
3개의 다른파일에 A,B,C,D의 작업을 순서대로 수행해보겠습니다. 처리순서는 신경쓰지 않아도 됩니다. A,B,C,D순서대로 발생됩니다.
이를 실행하기 위한 순서는 아래와 같습니다.

1. Promise List 작성
2. 각각의 Promise 작업 A,B,C,D 순서대로 실행
3. `Promise.all`을 통해 모든 Promise 실행. 앞서 언급대로 `all`은 Promise를 동시에 처리하는 메소드 입니다.
```javascript
const files = ['a.txt', 'b.txt', 'c.txt'];

function performInOrder(file) {
  const promise = taskA(file)
  .then(taskB)
  .then(taskC)
  .then(taskD);
  return promise;
}

const operations = files.map(performInOrder);
const result = Promise.all(operations);

result.then(d => console.log(d)).catch(e => console.log(e));
```
앞선 가정이 아닌 실제 실행할 수 있는 `a.txt`, `b.txt`, `c.txt`를 가공하는 코드를 작성해 보겠습니다.
[2편](https://tuhbm.github.io/2018/11/14/async02/)에서 소개했던 `util.promisify`를 사용해 보겠습니다.

```javascript
// code/promises/read-write-multiple-files/main.js
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const copyFile = (file) => (content) => (writeFile(file + '-copy.txt', content));
const replaceContent = input => (Promise.resolve(input.replace(/-/g, 'zzzz')));
const processEachInOrder = file => {
  return readFile(file, 'utf-8')
    .then(replaceContent)
    .then(copyFile(file));
}

const files = ['./a.txt', './b.txt', './c.txt'];
const promises = files.map(processEachInOrder);
Promise.all(promises)
  .then(d => console.log(d))
  .catch(e => console.log(e));
```
이러한 처리는 입력 크기가 큰 경우에 CPU에 많은 부담을 줄 수 있습니다. 더 좋은 방법은 동시에 처리되는 작업의 수를 제한하는 것입니다. 
비동기 라이브러리는 한 번에 처리되는 비동기 작업의 수를 제한하는 qeueue 메소드가있어, CPU의 추가 부하를 줄일 수 있습니다.

## 연습문제

### 디렉토리(1뎁스)의 파일을 읽고 `output`이라는 폴더에 복사하는 스크립트를 작성하시오.
### 힌트1 이전의 예제를 이용하시오.
### 힌트2 폴더내용을 읽고 `util.stat`메소드를 사용하여 항목이 파일인지 확인 후 폴더를 만들고 각 파일을 읽고 폴더에 작성합니다.

## 해결방법
`Promise.all`을 사용하여 읽고 쓰기를 처리하는 Promise 반환하는 방법입니다.

```javascript
// code/promises/exercise/main.js
/*
  List the content of the folder, filter out the files only
  then copy to the output folder.
 */
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const outputFolder = './output';

function isFile(f) {
  return stat(f).then(d => d.isFile() ? f : '');
}

function filterFiles(list) {
  return Promise.all(list.map(isFile))
    .then(files => files.filter(v => v));
}

function readWrite(result) {
  const files = result[1];
  return Promise.all(files.map(f => {
    return readFile(f)
    .then(content => writeFile(path.join(outputFolder, f), content));
  }));
}

const getFiles = readdir('./').then(filterFiles);

Promise.all([mkdir(outputFolder), getFiles])
  .then(readWrite)
  .then(_ => console.log('done!'))
  .catch(e => console.log(e));
```

지금까지 Promise를 동시 실행하고 실습해보았습니다.
다음글에서는 좀 더 나아가 제너레이터에 대해 알아보겠습니다.

********
## 출처

이 글은 [Medium](https://medium.com/)의 [AJ Meyghani](https://medium.com/@ajmeyghani?source=post_header_lockup)의 [포스팅 글](https://medium.com/@ajmeyghani/async-javascript-a-pocket-reference-2bb16ac40d21)을 번역한 것입니다.