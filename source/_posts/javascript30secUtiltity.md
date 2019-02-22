---
title: 번역 - 자바스크립트 코드 30초 시리즈<Utiltity> 1편
categories:
  - Javascript
tags:
  - 30sec
  - js
  - transform
  - Utiltity
thumbnail: https://tuhbm.github.io/images/bnr-js.jpg
---

# [Utiltity]코드 30초 시리즈
![Javascript 30 seconds](https://tuhbm.github.io/images/javascript/img-javascript30.png)

### 개요
기능을 직접 한땀 한땀 개발하는 것은 개발자로써 매우 중요한 업무입니다.
하지만 모든 기능을 미리 만들어 놓고 util함수 처럼 사용한다고 하면 어떨까요?
코드 30초만 있다면 빠르게 필요한 기능을 찾아 개발 할 수 있습니다.
어떠한 라이브러리도 사용하지않고 오로지 ES6로만 작성되어 있습니다.
이제 필요한 코드 찾아 사용하세요.
코드 30초 시리즈는 <https://30secondsofcode.org/index>를 기반으로 번역 & 정리하였습니다.

## Utiltity편
******
### castArray
인자로 받은 값을 배열로 변경합니다.
`Array.prototype.isArray()`를 사용하여 인자로 받은 val을 값을 배열에 넣어 리턴합니다.

```javascript
const castArray = val => (Array.isArray(val) ? val : [val]);
// EXAMPLES
castArray('foo'); // ['foo']
castArray([1,2,3,4]); // [1,2,3,4]
```

*****

### cloneRegExp
정규식을 복제합니다.
`new RegExp()`를 사용하고 [RegExp.source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)와 [RegExp.flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags)지정된 정규 표현을 복제 할 수 있습니다.
```javascript
const cloneRegExp = regExp => new RegExp(regExp.source, regExp.flags);
// EXAMPLES
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // /lorem ipsum/gi
```
*****

### coalesce
`Array.prototype.find()`를 사용하여 전달받은 인자값 중에서 null이나 undefined가 아닌 첫번째 값을 리턴합니다.
```javascript
const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_));
// EXAMPLES
coalesce(null, undefined, 'Waldo', '', NaN ); // "Waldo"
```
*****

### coalesceFactory
전달받은 인자를 순회하여 `args`로 제공한 값(배열)과 일치하는 값을 리턴합니다.
`Array.prototype.find()`을 사용하여 인자값 중 `true`와 일치하는 첫번째 값을 리턴합니다.
__아래 예제는 !(부정연산자)를 사용하여, false인 값을 찾습니다.__
```javascript
const coalesceFactory = valid => (...args) => args.find(valid);
// EXAMPLES
const customCoalesce = coalesceFactory(_ => ![null, undefined, '', NaN].includes(_));
customCoalesce(undefined, null, NaN, '', 'Waldo'); // "Waldo"
```
*****

### extendHex
3 자리 컬러 코드를 6 자리 컬러 코드로 확장합니다.
`Array.prototype.map()`, `String.prototype.split()`, `Array.prototype.join()`을 사용하여 3자리 RGB 컬러 코드는 6자리로 변환합니다.
`Array.prototype.slice()`은 메소드가 시작할때 `#`을 제거합니다.
```javascript
const extendHex = shortHex => {
  return '#' +
  shortHex
    .slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('');
}
// EXAMPLES
extendHex('#03f'); // '#0033ff'
extendHex('05a'); // '#0055aa'
```
*****

### getURLParameters
현재 URL의 파라미터값을 객체로 반환합니다.
`String.match()`에서 정규표현식을 사용하여 모든 키- 값 쌍을 가져와서 `Array.prototype.reduce()`로 매핑하고 결합합니다.
```javascript
const getURLParameters = url => {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );
}
// EXAMPLES
getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
getURLParameters('google.com'); // {}
```
*****

### hexToRGB
인자로 받은 `hex` 표현된 컬러값을 `RGB`의 컬러값으로 변환해줍니다.
```javascript
const hexToRGB = hex => {
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};
// EXAMPLES
hexToRGB('#27ae60ff'); // 'rgba(39, 174, 96, 255)'
hexToRGB('27ae60'); // 'rgb(39, 174, 96)'
hexToRGB('#fff'); // 'rgb(255, 255, 255)'
```
*****

### httpGet
`XMLHttpRequest`웹 API를 사용하여 `GET`으로 전달될 `URL`에 대한 요청합니다.
`onload`이벤트를 호출하여 `callback`으로 `responseText`값을 제공합니다. 선언된 `err`함수를 사용하여 `onerror`처리를 합니다. 세번째로 오류를 `error` 의 디폴트값으로 기록합니다.
```javascript
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
// EXAMPLES
httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
); 
/*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/
```
*****

### httpPost

`XMLHttpRequest`웹 API를 사용하여 `POST`으로 전달 될 `URL`에 대한 요청합니다.
`HTTP`요청 header값을 `setRequestHeader`메소드를 통해 셋팅합니다. `onload`이벤트를 호출하여 `callback`으로 `responseText`값을 제공합니다. 선언된 `err`함수를 사용하여 `onerror`처리를 합니다. 제공된 `URL`로 데이터를 전송하지 않으려면, 세 번째 인수인 `data`를 생략합니다. 오류를 `error` 의 디폴트값으로 기록합니다.

```javascript
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};
EXAMPLES
const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};
const data = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data,
  console.log
); /*
Logs: {
  "userId": 1,
  "id": 1337,
  "title": "Foo",
  "body": "bar bar bar"
}
*/
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  null, // does not send a body
  console.log
); /*
Logs: {
  "id": 101
}
*/
```
*****

### randomHexColorCode
임의의 16 진수 색상 코드를 생성합니다.
`Math.random`로 무작위 24 비트(6x4bits)의 16 진수를 생성하는 데 사용 합니다. toString(16)사용하여 16 진수 문자열로 변환하십시오.
```javascript
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
// EXAMPLES
randomHexColorCode(); // "#e34155"
```
*****

### RGBToHex
RGB 구성 요소의 값을 색상 코드로 변환합니다.
주어진 RGB 매개 변수를 비트 시프트 연산자 (`<<`)를 사용하여 16 진수 문자열을 `toString(16)`변환한 다음 `String.padStart(6,'0')`으로 6 자리 16 진수 값을 가져옵니다.
```javascript
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
// EXAMPLES
RGBToHex(255, 165, 1); // 'ffa501'
```
*****

### toDecimalMark
`toLocaleString()`부동 소수점 산술을 소수점 표시 형식 으로 변환하는 데 사용 합니다 . 문자열에 쉼표로 구분 된 숫자를 만듭니다.
```javascript
const toDecimalMark = num => num.toLocaleString('en-US');
// EXAMPLES
toDecimalMark(12305030388.9087); // "12,305,030,388.909"
```
*****

### validateNumber

인자값이 정수인지 확인하여, `true`또는 `false`를 리턴합니다.
!isNaN메서드에 parseFloat한 인자값을 넣어 NaN이 아닌 정수값을 확인하고, isFinite 메서드를 실행하여 유한한 숫자인지 확인하고, `Number메서드를 통해 강제로 지정한 숫자인지를 확인합니다.
```javascript
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
// EXAMPLES
validateNumber('10'); // true
```

*****

지금까지 코드 30초 시리즈 `Utility`편 이었습니다.

업무 또는 공부를 진행하면서 `util`함수처럼 공통으로 사용 할 만한 함수들을 통하여 더욱 좋은 개발을 진행해 보세요.

이상입니다.