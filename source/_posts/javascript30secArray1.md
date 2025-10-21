---
title: 번역 - 자바스크립트 코드 30초 시리즈<Array> 1편
categories:
  - 공부
  - Javascript
tags:
  - 30sec
  - js
  - transform
  - array
thumbnail: https://tuhbm.github.io/images/bnr-js.jpg
date: 2019-02-10 01:38:48
---

# [Array 1편]코드 30초 시리즈
![Javascript 30 seconds](https://tuhbm.github.io/images/javascript/img-javascript30.png)

### 개요
기능을 직접 한땀 한땀 개발하는 것은 개발자로써 매우 중요한 업무입니다.
하지만 모든 기능을 미리 만들어 놓고 util함수 처럼 사용한다고 하면 어떨까요?
코드 30초만 있다면 빠르게 필요한 기능을 찾아 개발 할 수 있습니다.
어떠한 라이브러리도 사용하지않고 오로지 ES6로만 작성되어 있습니다.
이제 필요한 코드 찾아 사용하세요.
코드 30초 시리즈는 <https://30secondsofcode.org/index>를 기반으로 번역 & 정리하였습니다.

## Array편
******
### all
제공된 조건부 함수가 컬렉션의 모든 요소에 대해 true를 반환하면 true를 반환하고 그렇지 않으면 false를 반환합니다.
`Array.prototype.every()`를 사용하여 컬렉션의 모든 요소가 fn에 따라 `true`를 반환하는지 테스트합니다. 부울을 기본값으로 사용하려면 두 번째 인수 fn을 생략하십시오.
```javascript
const all = (arr, fn = Boolean) => arr.every(fn);
// EXAMPLES
all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```
******
<!-- more -->
### allEqual
배열의 모든 요소가 같은지 확인하십시오.
`Array.prototype.every()`를 사용하여 배열의 모든 요소가 첫 번째 요소와 동일한 지 확인합니다.
```javascript
const allEqual = arr => arr.every(val => val === arr[0]);
// EXAMPLES
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```
******
### any
제공된 조건부 함수가 컬렉션의 적어도 하나의 요소에 대해 true를 반환하면 true를 반환하고 그렇지 않으면 false를 반환합니다.
`Array.prototype.some()`을 사용하여 콜렉션의 모든 요소가 `fn`에 따라 `true`를 반환하는지 테스트합니다. 부울을 기본값으로 사용하려면 두 번째 인수 fn을 생략하십시오.
```javascript
const any = (arr, fn = Boolean) => arr.some(fn);
// EXAMPLES
any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true
```
******
### arrayToCSV
2D 배열을 쉼표로 구분 된 값 comma-separated values(CSV) 문자열로 변환합니다.
`Array.prototype.map()` 및 `Array.prototype.join(구분 기호)`을 사용하여 개별 1D 배열 (행)을 문자열로 결합합니다. `Array.prototype.join( '\ n')`을 사용하여 모든 행을 CSV 문자열로 결합하여 각 행을 개행 문자로 분리합니다. 2번째의 인수 delimiter를 생략해, 디폴트 단락 문자 ','를 사용합니다.
```javascript
const arrayToCSV = (arr, delimiter = ',') => {
  return arr.map(v => v.map(x => ` '${x}' `).join(delimiter)).join('\n');
}
// EXAMPLES
arrayToCSV([['a', 'b'], ['c', 'd']]); // " 'a','b'\n'c','d' "
arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // "'a';'b'\n'c';'d'"
```
******
### bifurcate
값을 두 그룹으로 나눕니다. 필터의 요소가 `truey`이면 컬렉션의 해당 요소가 첫 번째 그룹에 속합니다. 그렇지 않으면 두 번째 그룹에 속합니다.
`Array.prototype.reduce()` 및 `Array.prototype.push()`를 사용하여 필터를 기반으로 그룹에 요소를 추가합니다.
```javascript
const bifurcate = (arr, filter) => {
  return arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []]);
}
// EXAMPLES
bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```
******
### bifurcateBy
입력 컬렉션의 요소가 속한 그룹을 지정하는 조건부 함수에 따라 값을 두 그룹으로 나눕니다. 콜백 함수가 truthy 값을 리턴하면 콜렉션 요소는 첫번째 그룹에 속합니다. 그렇지 않으면 두 번째 그룹에 속합니다.
각 요소에 대해 fn이 반환 한 값을 기반으로 `Array.prototype.reduce()` 및 `Array.prototype.push()`를 사용하여 그룹에 요소를 추가합니다.
```javascript
const bifurcateBy = (arr, fn) => {
  return arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);
}
// EXAMPLES
bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]
```
******
### chunk
배열을 지정된 크기의 더 작은 배열로 채웁니다.
`Array.from()`을 사용하여 생성 될 청크의 수에 맞는 새 배열을 만듭니다.
`Array.prototype.slice()`를 사용하여 새 배열의 각 요소를 청크에 크기의 길이로 매핑합니다.
원래 배열을 균등하게 분할 할 수없는 경우 최종 청크에는 나머지 요소가 포함됩니다.
```javascript
const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}
// EXAMPLES
chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
chunk([1, 2, 3, 4, 5], 3); // [[1,2,3],[4,5]]
```
******
### compact
배열에서 거짓 값을 제거합니다.
`Array.prototype.filter()`를 사용하여, `falsey`값(false, null, 0, "", 정의되지 않음 및 NaN)을 필터링합니다.
```javascript
const compact = arr => arr.filter(Boolean);
// EXAMPLES
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]
```
******
### countOccurrences
배열에있는 값의 발생을 계산합니다.
`Array.prototype.reduce()`를 사용하여 배열 내부의 특정 값을 만날 때마다 카운터를 증가시킵니다.
```javascipt
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
// EXAMPLES
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
countOccurrences([1, 1, 2, 1, 2, 3], 2); // 2
countOccurrences([1, 1, 2, 1, 2, 3], 3); // 1
```
******
### deepFlatten
Deep은 배열을 평평하게합니다.
재귀를 사용하십시오. 배열을 평평하게하려면 `Array.prototype.concat()`에 빈 배열 `([])`과 스프레드 연산자 `(...)`를 사용합니다. 배열 인 각 요소를 재귀 적으로 병합합니다.
```javascript
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// EXAMPLES
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```
******
### difference
2개의 배열의 차이를 돌려줍니다.
b에서 Set을 만든 다음 a에 `Array.prototype.filter()`를 사용하여 b에 포함되지 않은 값만 유지합니다.
```javascript
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
// EXAMPLES
difference([1, 2, 3], [1, 2, 4]); // [3]
```
******
### drop
왼쪽부터 `n`개만큼 제거된 새 배열을 반환합니다.
`Array.prototype.slice()`를 사용하여 왼쪽에서 지정된 수만큼 `slice`합니다.
```javascript
const drop = (arr, n = 1) => arr.slice(n);
// EXAMPLES
drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 5); // []
```
******
### dropRight
오른쪽부터 `n`개만큼 제거된 새 배열을 반환합니다.
`Array.prototype.slice()`를 사용하여 왼쪽에서 지정된 수만큼 `slice`합니다.
```javascript
const dropRight = (arr, n = 1) => arr.slice(0, -n);
// EXAMPLES
dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 5); // []
```
******
### dropRightWhile
전달 된 함수가 `true`를 반환 될 때까지 배열의 끝에서부터 제거하고, 배열의 나머지를 반환합니다.
`Array.prototype.slice()`를 사용하여 함수에서 반환 된 값이 `true`가 될 때까지 배열의 끝부터 값을 제거 나머지 요소를 반환합니다.
```javascript
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};
// EXAMPLES
dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
```
******
### dropWhile
전달 된 함수가 `true`를 반환 될 때까지 배열의 처음에서부터 제거하고, 배열의 나머지를 반환합니다.
`Array.prototype.slice()`를 사용하여 함수에서 반환 된 값이 `true`가 될 때까지 배열의 처음부터 값을 제거 나머지 요소를 반환합니다.
```javascript
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
// EXAMPLES
dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
```
******
### everyNth
배열에서 모든 n의 배수 번째 값을 반환합니다.
`Array.prototype.filter()`를 사용하여 지정된 배열에서 모든 n의 배수 번째 값을 포함한 새 배열을 만듭니다.
```javascript
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
//EXAMPLES
everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
everyNth([1, 2, 3, 4, 5, 6], 3); // [ 3, 6 ]
```
******
### filterFalsy
배열의 거짓 값을 필터링합니다.
`Array.prototype.filter()`을 사용하여, truey 값만 포함하는 배열을 가져옵니다.
```javascript
const filterFalsy = arr => arr.filter(Boolean);
/// EXAMPLES
filterFalsy(['', true, {}, false, 'sample', 1, 0]); // [true, {}, 'sample', 1]
```
******
### filterNonUnique
배열의 고유하지 않은 값을 필터링합니다.
`Array.prototype.filter()`고유 한 값만 포함하는 배열에 사용 합니다.
```javascript
const filterNonUnique = arr => {
  return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}
// EXAMPLES
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```
******
### filterNonUniqueBy
인자의 값으로 받은 비교 함수를 기반으로 배열의 고유하지 않은 값을 필터링합니다.
`fn`값으로 받은 인자인 비교 함수를 기반으로 고유 한 값만 포함하는 배열의 경우 `Array.prototype.filter()`와` Array.prototype.every()`를 사용하십시오.
비교 함수는 네 개의 인수를 취합니다 : 비교되는 두 요소의 값과 그 인덱스.
```javascript
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
// EXAMPLES
filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]
```
******
### flatten
지정된 뎁스까지 배열을 병합합니다.
재귀를 사용하여 `depth`각 깊이마다 1 씩 감소시킵니다. `Array.prototype.reduce()`및 `Array.prototype.concat()`을 사용 하여 값과 배열을 병합합니다. 기본 재귀의 `depth`는 `1`로 설정합니다. 
두 번째 인수는 생략한다면 1만큼의 `depth`만 플랫합니다.
```javascript
const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
// EXAMPLES
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
```
******
### head
리스트의 첫번째 값을 리턴합니다.
`arr[0]`을 사용하여 전달된 배열의 첫 번째 값을 반환합니다.
```javascript
const head = arr => arr[0];
// EXAMPLES
head([1, 2, 3]); // 1
head([[1, 2, 3], 4, 5]) // [1, 2, 3]
head([{'a': 1,'b': 2,'c': 3}, 4, 5]) //{a: 1, b: 2, c: 3}
```
******
### last
리스트의 마지막 값을 리턴합니다.
`arr.length - 1`를 사용하여 전달된 배열의 마지막 값을 반환합니다.
```javascript
const last = arr => arr[arr.length - 1];
//EXAMPLES
last([1, 2, 3]); // 3
last([1, 2, [3, 4, 5]]); // [3, 4, 5]
last([1, 2, {'a': 3, 'b': 4, 'c': 5}]) // {a: 3, b: 4, c: 5}
```
******
### indexOfAll
배열의 값 중 `val`과 일치하는 모든 값의 인덱스를 반환합니다 . `val`의 값이 없으면 `[]`이 반환됩니다.
`Array.prototype.reduce()`를 사용하여 `val`와 일치하는 값을 저장, 루프를 통해 배열의 인덱스를 반환해줍니다.
```javasript
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
// EXAMPLES
indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
```
******
## 1편을 마치며...
코드 30초 시리즈를 <https://30secondsofcode.org/index> 살펴보면, 내용이 매우 많다는것을 알 수 있습니다.
현재 Array에 대한 부분을 진행하고 있음에도 아직 반도 번역하지 못했습니다.
앞으로도 꾸준히 진행하도록 하겠습니다. 