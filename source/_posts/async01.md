---
title: 번역 - 비동기 자바스크립트의 간단한 참고서 1편
categories:
  - 공부
  - Javascript
tags:
- callback
- 동기
- 비동기
- synchronous
- asynchronous

thumbnail: 'https://tuhbm.github.io/images/bnr-js.jpg'
date: 2018-11-05 21:45:03
---


# 비동기 자바스크립트의 간단한 참고서
## JavaScript로 비동기 프로그래밍 배우기

![image](https://tuhbm.github.io/images/javascript/async/async_main_img.png)

JavaScript의 비동기 특성은 많은 사람들을 혼란스럽게 할 수있는 언어 측면 중 하나입니다. 그러나 기본 비동기 구문을 잘 이해하면 언어에 대한 많은 혼란을 줄일 수 있습니다. 이 가이드의 목표는 JavaScript로 *비동기 프로그래밍*을 소개합니다. 그리고 깨끗하고 유지 보수가 가능한 비동기 코드를 작성하는 데 필요한 기술을 제공하는 것입니다. 동기식 및 비동기식 실행 모델과 그 차이점을 살펴 보는 것으로 시작합니다. 그런 다음 콜백 기능에 대해 자세히 알아보고 비동기 작업 결과를 캡처하는 데 어떻게 사용되는지 조사하겠습니다. 그런 다음, *promise*에 대해 알아보고 콜백 기능을 추상화하여 비동기 흐름을 단순화하는 방법에 대해 알아보겠습니다. 
또한 제너레이터를 살펴보고 비동기 흐름에 어떻게 사용할 수 있는지 알아보겠습니다. 끝으로 *async* 함수를 살펴보고 비동기 작업을 더욱 단순화하기 위해 *promise*와 함께 사용할 수있는 방법을 보여줍니다.

## 예제코드
이 가이드의 모든 코드 예는 Gitlab에서 확인할 수 있습니다.
<https://gitlab.com/aj_meyghani/asyncjs-code-examples>

당신은 Repository를 복제하거나 [zip](https://gitlab.com/aj_meyghani/asyncjs-code-examples/-/archive/master/asyncjs-code-examples-master.zip) 파일로 다운로드 할 수 있습니다.

### 기타 간단한 참고서
다른 간단한 참고서를 확인해보세요
1. [JavaScript Functions](https://medium.com/p/d42597ceb496)
2. [JavaScript Prototypes](https://medium.com/p/d88f550ffce3)

## 소개

JavaScript에서 비동기 프로그래밍을 처음 접한 경우 다음 코드를 보고 놀랄 수 있습니다.
<!-- more -->
```javascript
setTimeout(() => console.log('1'), 0);
console.log('2');
```
위 코드의 출력은 무엇이라고 생각하십니까? 당신은 1과 2를 말하고 싶지만 정답은 2이고 그 다음은 1입니다.
이제에서는 JavaScript에서 사용되는 비동기 모델에 대해 살펴보고 위의 코드가 2와 1을 출력되는 이유를 설명합니다.

## 동기 vs 비동기

우리는 일상에서 작업을 할 때 비동기식으로 할 가능성이 높습니다. 실행의 동기 모델과 비동기식 모델 간의 차이를 보여 주는 비유를 살펴보겠습니다.

할 일 목록에서 할일이 3개가 있다고 가정해보겠습니다.
1. 빨래하기
2. 장보기
3. 저녁밥하기

동기식 모델의 경우 다음 할일으로 이동하기 전에 각 작업을 완료해야 합니다. 즉 장보기 전에 빨래를 끝마쳐야합니다. 만약 세탁기가 고장난 경우 장보기를 할 수 없습니다. 세번째 할 일도 똑같이 적용됩니다. 장보기를 끝내야만 저녁밥을 할 수 있습니다.

비동기 모델을 사용하면 각 작업이 다음 작업으로 이동하기를 마칠 때까지 기다릴 필요가 없습니다. 세탁기를 돌리고 그동안 장보기를 할 수 있습니다. 장보기를 끝내고 돌아오면 빨래가 끝날 것입니다. 그후 옷을 말려야 한다면 건조기에 넣고 옷을 말리는 동안 저녁을 만들 수 있습니다.

이것은 기본적으로 동기식 및 비동기식 실행 모델 간의 주요 차이점입니다. 동기식 모델에서 다음 작업으로 이동하기 전에 각 작업이 완료될 때까지 기다려야 합니다. 그러나 비동기식 모델에서는 작업을 효율적으로 수행 할 수 있게 일정을 계획 세울 수 있으며, 앞선 작업이 완료 될 때까지 기다릴 필요가 없습니다.

다음으로 이벤트 루프를 살펴보고 JavaScript가 비동기 작업을 처리하는 방법을 알아봅니다.

## 이벤트 루프

앞서 보았던 코드를 살표 보겠습니다.
```javascript
setTimeout(() => console.log('1'), 0); //A
console.log('2'); //B
```

A 행에서 *setTimeout* 메소드를 호출하면 콜백 함수 *() => console.log('1')*가 대기열인 큐에 푸시됩니다. `앞으로 큐라고만 쓰겠습니다.`
그 다음, B 행에서 *console.log(2)*가 스택에 push되며, 즉시 호출되어 콘솔에 *2*를 출력합니다. *console.log(2)*를 호출하면 스택이 비어 있고 JavaScript가 큐로 이동하여 큐에 있는 항목을 스택으로 이동하여 실행합니다. 그 후 콜백함수인 *() => console.log('1')*가 실행되어 *1*이 출력됩니다.

이 흐름을 관리하는 메커니즘을 이벤트 루프라고합니다. 이벤트 루프는 스택과 큐의 항목을보고 올바른 순서로 실행을 예약하는 역할을 합니다. 아래 그림에서 실행될 스택에 세 가지 작업이 있습니다. 작업이 완료되면 큐에서 두 개의 작업(예: 콜백 기능)을 선택하고 실행할 스택에 배치됩니다.
![이벤트 루프는 작업 스케줄러처럼 지금 실행해야하는 일과 앞으로 수행해야 할 일을 결정](https://tuhbm.github.io/images/javascript/async/async_sub_img1.png)

간단한 설명하면, 이벤트 루프는 현재 실행될 수 있는 일과 나중에 실행되어야하는 일을 결정합니다.

## 콜백 함수

비동기 컨텍스트에서 콜백 함수에 대해 이야기하기 전에 함수가 다른 함수로 전달되는 방법을 배우는 것이 중요합니다.
예제를 보고 자바 스크립트의 모든 값처럼 함수를 전달하는 방법을 살펴보겠습니다.

```javascript
let name = 'Tom';
hello(name);
```
위 코드에서 name이라는 변수를 선언하고 문자열을 할당합니다. 그런 다음 인자로 hello 함수에 전달합니다. 함수를 사용하여 똑같은 작업을 수행 할 수 있습니다. name을 함수로 정의하고 hello로 전달할 수 있습니다.

```javascript
let name = () => 'Tom';
hello(name);
```
기술적으로 다른 함수로 전달 되었기 때문에 콜백 함수이지만, 비동기 작업의 컨텍스트에서 콜백 함수가 무엇인지 확인해 봅시다.

비동기 컨텍스트에서 콜백 함수는 비동기 작업이 완료되면 JavaScript에서 호출하는 일반적인 JavaScript 함수입니다. 일반적으로 각 Node에서 설정된 콜백 함수는 두 개의 인자를 사용합니다. 첫 번째는 오류를 캡처하고 두 번째는 결과를 캡처합니다. 콜백 함수의 이름을 지정하거나 익명으로 지정할 수도 있습니다.
Node의 `fs.readFile`을 사용하여 파일의 내용을 비동기 적으로 읽는 방법을 보여주는 간단한 예제를 살펴 보겠습니다.

```javascript
const fs = require('fs');
const handleReading = (err, content) => {
	if(err)  throw new Error(err);
	return console.log(content);
};
fs.readFile('./my-file.txt', 'utf-8', handleReading);
```
fs 모듈에는 readFile이라는 메서드가 있습니다. 이메서드는 두 개의 필수 인자가 필요합니다. 첫 번째 인자는 파일 경로이며, 마지막 인자는 콜백 함수입니다. 위의 코드에서 콜백 함수는 두 개의 인자를 취하는 handleReading입니다. 첫 번째로 잠재적 오류를 포착하고 두 번째로 내용을 캡처합니다.

다음은 원격 API 서버에 GET 요청을 보내는 https 모듈의 또 다른 예입니다.
```javascript
// code/callbacks/http-example.js
const https = require('https');
const url = 'https://jsonplaceholder.typicode.com/posts/1';

https.get(url, (response) => {
	response.setEncoding('utf-8');
	let body = '';
	response.on('data', (d) => {
		body += d;
	});
	response.on('end', (x) => {
		console.log(body);
	});
});
```

get 메소드를 호출하면 JavaScript에 의해 요청이 예약됩니다. 결과를 사용할 수 있으면 JavaScript에서 기능을 호출하여 결과를 제공합니다.

### 비동기 결과 "반환"
비동기 작업을 수행 할 때 단순히 return명령문을 사용한다고 해서 결과값을 얻을 수는 없습니다. 비동기 호출의 결과를 가지는 함수가 있다고 가정 해 보겠습니다. 변수를 생성하고 비동기 콜백에 변수를 설정하여 값을 반환하여도 외부에서 함수의 결과를 얻을 수 없습니다.

```javascript
function getData(optioins) {
	var finalResult;
	asyncTask(options, function(err, result) {
		finalResult = result;
	});
	return finalResult;
}
getData(); // returns undefined
```
위 코드에서 실행해보면 `getData`함수가 즉시 실행되고 반환 값은 undefined가 나옵니다. 함수를 호출할때 `finalResult`에는 아무것도 설정되지 않았기 때문입니다. 함수가 실행이 된 후 콜백 함수가 실행되어 나중에 `finalRsult`값이 설정되기 때문입니다. 비동기 콜백의 값을 전달하는 방법은 외부 함수에 콜백의 값을 전달해야합니다.

```javascript
function getDate(options, callback) {
	asyncTask(options, callback);
}
getData({}, function(err, result) {
	if(err) return console.log(err);
	return console.log(result);
});
```
위 코드에서는 `getDate`의 두번째 인자로 콜백함수를 사용하도록 정의 되어있습니다. `getData`에서 콜백 함수를 두번째 인자로 사용한다고 callback이라는 이름을 명시하였습니다.

## 비동기 순서대로 수행
서로 의존하는 비동기 태스크가 두 개인 경우 다른 태스크의 콜백 내에서 각 태스크를 호출해야합니다. 예를 들어 파일 내용을 복사해야하는 경우 다른 파일에 쓰기 전에 먼저 파일의 내용을 읽어야합니다. 이 때문에 콜백 `writeFile`내에서 `readFile`메서드를 호출해야합니다.

```javascript
const fs = require('fs');
fs.redFile('file.txt', 'utf-8', function readContent(err, content) {
	if(err) {
		return console.log(err);
	}
	fs.writeFile('copy.txt', content, function(err) {
		if(err) {
			return console.log(err);
		}
		return console.log('done');
	});
});
```
서로 의존하는 많은 비동기 작업이 있으면 코드가 지저분해질 수 있습니다.(콜백지옥) 이러한 경우 혼란을 피하기 위해 각각 콜백 함수의 이름을 지정하고 별도로 정의하는 방법이 좋습니다.

```javascript
const fs = require('fs');
fs.readFile('file.txt', 'utf-8', readCb);

function readCb(err, content) {
	if(err) {
		return console.log(err);
	}
	return fs.writeFile('copy.txt', content, writeCb);
}

function writeCb(err) {
	if(err) {
		return console.log(err);
	}
	return console.log('Done');
}
```
위 코드에서는 별도로 `readCb`와 `writeCb`로 두개의 콜백함수를 정의하였습니다. 위코드가 *무조건으로 좋은코드다* 라고 말할 순 없지만 여러 종속성이 있는 작업의 경우 각각의 정의된 콜백함수를 사용하면 많은 수고를 덜어 줄 수 있습니다.

## 연습: 간단한 콜백
`compute`라는 두개의 조건을 부합하는 함수를 정의해보세요.

1. 정수 배열
2. 전달 된 배열에서 작동하는 콜백 함수

예를 들어, 다음코드는 6을 반환합니다.(`addAll` 함수가 정의되어 있다고 가정합니다.)
```javascript
const result = compute([1, 2, 3], addAll);
```
## 해결책
가능한 해결책은 첫 번째 인자가 정수 배열인지 확인한 후 다음을 사용하여 콜백 함수를 호출하는 것입니다 `args`.
```javascript
// code/callbacks/exercises/simple-callback.js
function compute(nums, fn) {
	if(!Array.isArray(nums)) return NaN;
	const isAnyNotInteger = nums.some(v => !Number.isInteger(v));
	if(isAnyNotInteger) {
		console.log(isAnyNotInteger)
		return NaN;
	}
	return fn(nums);
}
```

## 연습: 비동기 콜백 순서대로 수행
이번 연습에서는 GET http호출을 통해 응답결과를 파일내용에 추가하고, 그 내용을 다른파일에서도 추가하여 사용합니다.
연습은 이순서로 진행하겠습니다.

1. 게시물의 제목을 얻기 위한 GET http 요청
2. 파일 내용 읽기
3. 파일 내용에 게시물 제목 추가
4. 결과 파일에 추가

## 해결책
이번 연습에서는 콜백을 사용하여, 작업을 수행하는 연습입니다. Promise 세션에서는 Promise를 사용하여 비동기 결과를 수집하고 동시 작업을 하는방법을 살펴보겠지만 지금은 콜백결과에 의존하여 작업을 수행하겠습니다.
```javascript
// code/callbacks/exercises/read-write/main.js
const fs = require('fs');
const request = require('request');
const url = 'https://jsonplaceholder.typicode.com/posts/2';

request.get(url, handleResponse);

function handleResponse(err, resp, body) {
	if(err) throw new Error;
	const post = JSON.parse(body);
	const title = post.title;
	fs.readFile('./file.txt', 'utf-8', readFile(title));
}

const readFile = title => (err, content) => {
	if(err) throw new Error(err);
	const result = title + content;
	fs.writeFile('./result.txt', result , writeResult);
}

function writeResult(err) {
	if(err) throw new Error(err);
	console.log('done');
}
```
다음시간에는 `Promise`를 사용하여 비동기로 기능구현을 해보겠습니다.

********
## 출처

이 글은 [Medium](https://medium.com/)의 [AJ Meyghani](https://medium.com/@ajmeyghani?source=post_header_lockup)의 [포스팅 글](https://medium.com/@ajmeyghani/async-javascript-a-pocket-reference-2bb16ac40d21)을 번역한 것입니다.