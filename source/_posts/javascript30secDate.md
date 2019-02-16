---
title: 번역 - 자바스크립트 코드 30초 시리즈<Date> 1편
tags:
  - 30sec
  - js
  - transform
  - date
categories:
  - Javascript
thumbnail: 'https://tuhbm.github.io/images/bnr-js.jpg'
date: 2019-02-17 01:38:48
---


# [Date]코드 30초 시리즈
![Javascript 30 seconds](https://tuhbm.github.io/images/javascript/img-javascript30.png)

### 개요
기능을 직접 한땀 한땀 개발하는 것은 개발자로써 매우 중요한 업무입니다.
하지만 모든 기능을 미리 만들어 놓고 util함수 처럼 사용한다고 하면 어떨까요?
코드 30초만 있다면 빠르게 필요한 기능을 찾아 개발 할 수 있습니다.
어떠한 라이브러리도 사용하지않고 오로지 ES6로만 작성되어 있습니다.
이제 필요한 코드 찾아 사용하세요.
코드 30초 시리즈는 <https://30secondsofcode.org/index>를 기반으로 번역 & 정리하였습니다.

## Date편
******
###dayOfYear
`Date`객체에서 새해로부터 몇번째 날인지 가져옵니다.
`new Date()`를 하고 `Date.prototype.getFullYear()`를 사용하여, 해당 연도의 첫날의 `Date`객체에서 인자로 받은 `date`를 뺀 값을 milliseconds로 나누워 결과를 얻습니다.
`Math.floor()`으로 결과를 정수로 적절하게 반올림하여 사용하세요.
````javascript
const dayOfYear = date => {
	return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24); 
}
// EXAMPLES
dayOfYear(new Date()); // 272
````
*****
<!-- more -->
### formatDuration

주어진 milliseconds 숫자를 사람이 읽을 수 있는 형식을 반환합니다.

인수로 받은 `ms`을 값으로 나누어 `day`, `hour`, `minute`, `second`, `millisecond`에 해당하는 각각의 값을 구합니다.

 `Object.entries()`와 `Array.prototype.filter()`를 함께 사용하여 0이 아닌 값을 유지합니다.

`Array.prototype.map()`를 사용하여 각 값에 대한 적절한 문자열이 들어갈 수 있도록 합니다.

`String.prototype.join()`을 사용하여 값을 합치도록 합니다.

```javascript
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};
// EXAMPLES
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

*****

### getColonTimeFromDate

`Date` 객체에서 `HH:MM:SS` 형식의 문자열을 반환합니다.

`Date.prototype.toTimeString()` 및 `String.prototype.sliice()`를 사용하여 인자로 받은 날짜의 `HH:MM:SS` 부분을 구합니다.

```javascript
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
// EXAMPLES
getColonTimeFromDate(new Date()); // "23:31:58"
```

*****

### getDaysDiffBetweenDates

두개의 날짜를 인자로 받아 첫번째로 받은 값과 두번째로 받은 값의 차이(일 단위)를 반환합니다.

```javascript
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => {
	return (dateFinal - dateInitial) / (1000 * 3600 * 24); 
}
// EXAMPLES
getDaysDiffBetweenDates(new Date('2019-02-12'), new Date('2019-02-21')); // 9
```

*****

### getMeridiemSuffixOfInteger

숫자 정수를 받아 `오전`과 `오후`를 구분한 시간으로 반환됩니다.

`%`나누기 연산자로 조건부 검사를 사용하여 정수를 `오전`과 `오후`로 구분한 값이 있는 12시간 형태의 값으로 변환합니다.

```javascript
const getMeridiemSuffixOfInteger = num => {
  if(num > 24) {
	throw new Error('num 값이 너무 큽니다.');
  }
  return num === 0 || num === 24
    ? 12 + 'am'
    : num === 12
      ? 12 + 'pm'
      : num < 12
        ? (num % 12) + 'am'
        : (num % 12) + 'pm';
}
```

*****

### isAfterDate

두 날짜를 받아 연산자(`>`)를 사용하여 앞에 받은 `날짜A`가 두번째 `날짜B` 보다 `뒤`의 날짜인지 확인합니다.
```javascript
const isAfterDate = (dateA, dateB) => dateA > dateB;
// EXAMPLES
isAfterDate(new Date(2019, 02, 21), new Date(2019, 02, 20)); // true
```

*****

###  isBeforeDate

두 날짜를 받아 연산자(`<`)를 사용하여 앞에 받은 `날짜A`가 두번째 `날짜B` 보다 `앞`의 날짜인지 확인합니다.

```javascript
const isBeforeDate = (dateA, dateB) => dateA < dateB;
// EXAMPLES
isBeforeDate(new Date(2019, 02, 20), new Date(2019, 02, 21)); // true
```

*****

### isSameDate

`Date.prototype.toISOString()`를 사용하여 첫 번째 `날짜A`와 두 번째 `날짜B`가 동일한 지 확인합니다.

엄격한 검사 ( `===`)를 사용합니다.

```javascript
const isSameDate = (dateA, dateB) => dateA.toISOString() === dateB.toISOString();
// EXAMPLES
isSameDate(new Date(2019, 02, 17), new Date(2019, 02, 17)); // true
```

*****

### maxDate

여러 개의 날짜를 인자로 받아 그 중 가장 최대 날짜(늦은날짜)를 리턴해줍니다.

`Math.max.apply()`를 사용하여 최대 날짜 값을 찾고, `new Date()`를 사용하여`Date`객체로 변환하여 리턴합니다.

```javascript
const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates));
// EXAMPLES
const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2019, 1, 17)
];
maxDate(array); // Sun Feb 17 2019 00:00:00 GMT+0900 (한국 표준시)
```

*****

### minDate

여러 개의 날짜를 인자로 받아 그 중 가장 최소 값(빠른날짜)를 리턴해줍니다.

`Math.min.apply()`를 사용하여 최소 날짜 값을 찾고, `new Date()`를 사용하여`Date`객체로 변환하여 리턴합니다.

```javascript
const minDate = (...dates) => new Date(Math.min.apply(null, ...dates));
// EXAMPLES
const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];
minDate(array); // Sat Jan 09 2016 00:00:00 GMT+0900 (한국 표준시)
```

*****

### tomorrow

```javascript
const tomorrow = () => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toString();
};
EXAMPLES
tomorrow(); // Mon Feb 18 2019 01:34:01 GMT+0900 (한국 표준시)
```

*****

지금까지 코드 30초 시리즈 `Date`편 이었습니다.

앞서 서론에서 말한 것과 같이 업무를 진행하면서 `util`함수처럼 공통으로 사용 할 만한 함수들을 소개하였습니다.

또는 조금 쉽게 가져가서 사용할 수 있는 메소드들을 앞으로도 소개드리겠습니다.

이상입니다.