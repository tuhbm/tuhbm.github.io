---
title: Axios를 사용하여 HTTP요청하기
categories:
  - 공부
  - Javascript
tags:
  - http
  - request
  - get
  - post
thumbnail: https://tuhbm.github.io/images/bnr-js.jpg
date: 2019-03-21 19:02:50
---
![Axios](https://tuhbm.github.io/images/javascript/img_axios.png)

# Axios

## 소개
Axios는 HTTP통신을 하는데 매우 인기있는 Javascript라이브러리입니다. Axios는 브라우저와 [Node.js](https://flaviocopes.com/nodejs/) 플랫폼에서 모두 사용할 수 있습니다.

또한 IE8이상을 포함한 모든 최신 브라우저를 지원합니다.



Axios는 Promise를 기반으로하여 async/await문법을 사용하여 [XHR](https://flaviocopes.com/xhr/)요청을 매우 쉽게 할 수 있습니다.

[Fetch API](https://flaviocopes.com/fetch-api/)보다 Axios가 더 좋은 장점은 아래와 같습니다.

1. 구형브라우저를 지원합니다.(Fetch API의 경우는 [폴리필](http://hacks.mozilla.or.kr/2014/12/an-easier-way-of-using-polyfills/)이 필요합니다.)
2. 요청을 중단시킬 수 있습니다.
3. 응답 시간 초과를 설정하는 방법이 있습니다.
4. [CSRF](https://laravel.kr/docs/5.5/csrf) 보호 기능이 내장되어있다.
5. JSON 데이터 자동변환
6. Node.js에서의 사용
<!-- more -->

## 설치

#### [npm](https://flaviocopes.com/npm/)에서 설치

```text
npm install axios
```

#### [yarn](https://flaviocopes.com/yarn/)에서 설치

```text
yarn add axios
```

또는 단순하게 CDN을 로드해서 사용 할 수 있습니다.



## Axios API

`axios`객체는 아래와 같이 간단하게 HTTP요청을 할 수 있습니다.

```javascript
axios({
  url: 'https://test/api/cafe/list/today',
  method: 'get',
  data: {
    foo: 'diary'
  }
});
```

그러나 보기 명확하게 method를 분리하여 사용할 수도 있습니다.

- `axios.get()`
- `axios.post()`

`$.ajax()`를 분리해 명확하게 사용하는 `$.get()`, `$.post()`처럼 사용하는 jQuery와 매우 흡사합니다.



Axios가 아직 핫한 라이브러리는 아니지만 HTTP요청에서 사용하는 다양한 method도 제공하고 있습니다.

- `axios.delete()`
- `axios.put()`
- `axios.patch()`
- `axios.options()`

그리고 HTTP헤더를 가져와 본문을 삭제하는 방법 또한 제공합니다.



## GET 요청

Axios를 사용하는 편한 방법 중 하나는 moden javascript의 요소인 async/ await 구문을 사용하는 것 입니다.

이 Node.js예제는 [Dog APi](https://dog.ceo/)를 사용하여 모든 Dog의 breed 목록을 가져와 `axios.get()` 합니다.

```javascript
const axios = require('axios');

const getBreeds = async () => {
  try {
    return await axios.get('https://dog.ceo/api/breeds/list/all');
  } catch (error) {
    console.error(error);
  }
};

const countBreeds = async () => {
  const breeds = await getBreeds();
  
  if (breeds.data.message) {
    console.log(`현재 강아지의 수는 ${Object.entries(breeds.data.message).length}입니다.`);
  }
};

countBreeds();
```



만약 async / await 구문을 사용하지 않는다면 [Promise](https://flaviocopes.com/javascript-promises/) 구문을 사용 할 수 있습니다.

```javascript
const axios = require('axios');

const getBreeds = () => {
  try {
    return axios.get('https://dog.ceo/api/breeds/list/all');
  } catch (error) {
    console.error(error)
  }
};

const countBreeds = () => {
  const breeds = getBreeds()
  	.then(response => {
      if (response.data.message) {
        console.log(`현재 강아지의 수는 ${Object.entries(breeds.data.message).length}입니다.`);
      }
  	})
  	.catch(error => {
      console.log(error);
  	})
};

countBreeds();
```



### GET 요청에 매개 변수 추가

GET 응답에는 URL에 매개변수가 포함 될 수 있습니다.

`https://test.com/?foo=bar`

Axios를 사용하여 GET 요청시 간단하게 매개변수를 추가 할 수 있습니다.

```javascript
axios.get('https://test.com/?foo=bar');
```

또는 `params`옵션에서 추가하여 사용 할 수 있습니다.

```javascript
axios.get('https://test.com/', {
  params: {
    foo: 'bar'
  }
});
```



## POST 요청

 `axios.post`처럼 POST 요청은 `axios.get`GET 요청과 같이 거의 같습니다. 

```javascript
axios.post('https://test.com');
```

POST 역시 매개변수를 추가하는방법은 GET과 같습니다.

```javascript
axios.post('https://test.com/', {
  params: {
    foo: 'bar'
  }
});
```



## 마무리

`axios`를 통해 api 통신을 하는 것은 매우 간단하고, 러닝커브 또한 매우 낮습니다. 순수 자바스크립트를 사용하는 것으로도 매우 간단하게 api통신이 가능하지만 위에 말한 것처럼 axios의 장점을 생각하며, 도입을 권장합니다.

**Good Luck**