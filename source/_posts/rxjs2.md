---
title: RxJS 시작하기
categories: 
- Javascript
- RxJS
tags:
  - RxJS
  - 스트림
  - Observable
  - observer
  - pipe
  - 도트체이닝
  - 오퍼레이터
  - subscription
  - 구독
  - subscribe
date: 2019-07-14 21:49:08
thumbnail: https://tuhbm.github.io/images/bnr-rxjs.png
---

## RxJS
![RxJS](https://tuhbm.github.io/images/bnr-rxjs.png)
RxJS 시리즈 포스팅은 Quick Start RxJS를 읽으면서 공부하고 정리한 내용입니다.
******
# RxJS 시작하기
지난 포스팅인 [Rxjs를 시작하기전에](https://tuhbm.github.io/2019/06/28/rxjs1/)편에서 최근 개발트랜드와 Rxjs를 사용해야 하는 원인에 대해 알아보았습니다.
최근 개발패턴인 SPA(Single Page Application)는 데이터의 상태를 통해 웹페이지의 View와 데이터가 변경됩니다.
그렇기에 RxJS를 통해 상태체크를 통해 데이터의 흐름을 관리하는 라이브러리인 RxJS를 사용해 개발한다고 말씀드렸습니다.
실제로 [RxJS 공식사이트](https://rxjs-dev.firebaseapp.com/guide/overview)에서도 `'Observable을 사용하여 비동기 및 이벤트 기반 프로그램을 작성하기 위한 라이브러리이다.'`라고 써있
`'이벤트용 lodash정도...'`라고 써있기도합니다. 
그러면 이제부터 RxJS를 사용해 개발하는 패턴을 알아보겠습니다.
<!-- more -->
## 설치
최근 node를 통해 개발하는 방법인 npm을 통해 설치가 가능합니다.
````commandline
npm install rxjs
````
추가적으로 Typescript와 같이 사용하려면 아래와 같이 설치합니다.
```commandline
npm install @reactivex/rxjs
```
### 시작하기
Rxjs를 시작하기에 앞서 JavaScript 코드와 RxJS를 사용한 개발방법에 대해 간단한 코드를 통해 차이를 살펴보겠습니다.
먼저 'Click'이벤트를 통해 console.log를 실행하는 코드를 살펴보겠습니다.

```javascript
const eventHandler = event => {
	console.log(event.currentTarget);
}

document.addEventListener("click", eventHandler);
```

우리가 흔히 개발하는 JavaScript의 클릭 이벤트입니다.
다음으로 RxJS입니다.

```javascript
import { fromEvent } from 'rxjs';
const click$ = fromEvent(document, "click"); // observable
const observer = event => {
	console.log(event.currnetTarget);
}
click$.subscribe(observer);
```

비슷한듯 하나 *fromtEvent*를 통해 이벤트 Observable로 생성하고,
observer가 Observable 객체를 구독합니다.

Observable는 어떠한 행위를 하는 **객체 또는 데이터**라고 이해 하시면됩니다.
어떠한 동작을 하기 위해 데이터 또는 이벤트를 Observable로 생성하고, 이를 구독하여 어떠한 observer행위를 하여 개발을 진행하는 방식이 RxJS의 개발 패턴입니다.

그렇기에 RxJS개발 패턴중에 가장 `먼저 해야하는 것이 Observable을 생성하는 것`입니다.

다음 데이터를 다루는 예제를 살펴보겠습니다.


```javascript
const users = [{
		name: "유비",
		birthYear: 161,
		nationality: "촉",
	}, {
		name: "손권",
		birthYear: 182,
		nationality: "오"
	}, {
		name: "관우",
		birthYear: 160,
		nationality: "촉",
	}, {
		name: "장비",
		birthYear: 168,
		nationality: "촉",
	}, {
		name: "조조",
		birthYear: 155,
		nationality: "위"
	}, {
		name: "손권",
		birthYear: 182,
		nationality: "오"
	}
].filter(user => user.nationality === '촉');

const log = user => console.log(user);
users.forEach(log);
```

위 방법은 데이터에서 원하는 값을 골라 새로운 배열을 만들고, 이를 console.log 이벤트를 발생시키는 코드입니다.
다음은 RxJS코드입니다.

```javascript
import { from } from 'rxjs';
import { filter } from 'rxjs.operators';

const users$ = from([{
	name: "유비",
	birthYear: 161,
	nationality: "촉",
}, {
	name: "손권",
	birthYear: 182,
	nationality: "오"
}, {
	name: "관우",
	birthYear: 160,
	nationality: "촉",
}, {
	name: "장비",
	birthYear: 168,
	nationality: "촉",
}, {
	name: "조조",
	birthYear: 155,
	nationality: "위"
}, {
	name: "손권",
	birthYear: 182,
	nationality: "오"
}
]).pipe(
	filter(user => user.nationality === "촉")
)

const observer = user => console.log(user);
users$.subscribe(observer);
```

먼저 데이터를 from 메소드를 사용하여 Observable객체를 생성합니다.
그후 observer가 'user$'를 구독하여 실행합니다.(Observable객체의 변수명은 뒤에 $를 붙이는 것을 권장합니다.)

패턴을 보면 obsever객체가 Observable객체를 구독하는 상태 전파를 하기 위해 리액티브 프로그래밍의 패러다임도 녹아있고, 로직오류를 방지하기 위한 함수형 프로그래밍의 패러다임 기법도 사용하고 있습니다.


Rxjs의 중요한 개념들을 알아보겠습니다.

#### Observable
계속적으로 나오는 Observable은 시간을 축으로 `연속적인 데이터를 저장한 객체`입니다.
또한 이러한 Observable객체를 observer에 전달 하여 처리하는 과정을 스트림이라고 합니다.

#### 오퍼레이터
위에서 예제 코드에서 사용하였던, 'filter'를 오퍼레이터라고합니다. `Observable 객체를 생성 또는 조작하는 함수`를 **오퍼레이터**라고 합니다. 이러한 오퍼레이터를 통해 Observable객체를 생성하기도하고, 각각의 Observerbel객체를 서로 연결 또는 분리 합치기도 합니다. 오퍼레이터는 현재의 Observable의 인스턴스를 기반으로 항상 새로운 Observable인스턴스를 반환합니다. RxJS는 다양한 오퍼레이터들을 제공하고 있고, 상황에 맞는 오퍼레이터를 사용 해야합니다.
[RxJS 오퍼레이터]([https://rxjs-dev.firebaseapp.com/guide/operators)

또한 과거에는 오퍼레이트 사용시 도트체이닝을 사용하여 개발하였으나, Rxjs 6.0부터 지원 도트체이닝을 제공하지 않고, pipe 오퍼레이터만 제공합니다.
`도트체이닝 사용 시 Observable 객체가 모든 오퍼레이터를 가지고 있어야 하는데, 이는 불필요한 오퍼레이터도 모두 가지고 있어야 하기에 파일 사이즈 증가`
pipe오퍼레이터 사용 시 webpack을 통해 트리쉐이킹(사용하지 않는 모듈을 번들링 할때 제거)하여 사용됩니다.

```javascript
/// 도트체이닝 오퍼레이터 예제
ajax$
	.switchMap(data => ...)
    .filter(user => ...)
	.map(user => ...);
         
/// pipe 오퍼레이터 예제
ajax$
	.pipe(
		switchMap(data => ...),
		filter(user => ...),
		map(user => ...)
	);
```

#### Observer
Observable에 전달된 `데이터를 소비하는 주체`이며, next, error, complete 함수를 가진 객체입니다.

```javascript
const observer = {
	next : x => console.log(`Observer가 Observable로 받은 데이터: ${x}`),
	error: err => console.error(`Observer가 Observable로 받은 에러 데이터: ${error}`),
	complete: () => console.log(`Observer가 Observable로 부터 종료 되었다는 알림 메시지`)
}

click$.subscribe(observer);
```

#### Subscription
Observable.prototype.subscribe의 반환값입니다.
Subscription 객체는 자원의 해제를 담당하고 더이상 데이터를 전달받고 싶지 않은 경우 **unsubscribe** 메소드를 호출하여 자원을 해제야합니다.
유한한 데이터의 경우 Observable의 자원을 해지할 필요가 없습니다.
하지만 이벤트 핸들러 또는 interval를 통해 데이터를 계속 전달 받는 경우 자원해제가 필요합니다.

```javascript
// ...
const subscription = currentTarget$.subscribe(observer);

// ...
subscription.unsubscribe();
```

## RxJS 개발방법
이벤트를 Observable로 변환하고 filter 등의 오퍼레이터를 이용하여 데이터를 변경데이터를 처리할 Observer를 만들고 subscribe메소드를 통해 Observerable을 구독한다.
1. 데이터를 Observable로 변경
2. 오퍼레이터를 통해 변경 또는 추출 또는 여러 개의 Observable을 결합 또는 분리
3. 원하는 데이터를 처리할 Observer를 생성
4. Observable의 subscribe를 통해 Observer를 등록
5. Observable의 구독을 정지하고 자원을 해제

