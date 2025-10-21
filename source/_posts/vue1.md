---
title: vue 알아보기 1편
categories:  
- 공부
- Javascript
- Vue
tags:
  - vue
  - vue.js
  - vue.js2
  - tutorial
  - v-bind
  - v-html
  - vue를 시작하는방법
  - 텍스트 바인딩
  - 함수 바인딩
date: 2017-09-15 12:49:08
thumbnail: https://tuhbm.github.io/images/bnr-vue.jpg
---

## Vue
프론트엔드 개발 공부를 위해 SPA페이지 제작을 위한 Javascript 프레임워크 중 Vue를 공부해보도록하겠습니다.
Vue에 대한 설명 및 장단점은 추후 포스팅하도록 하고, 지금은 사용방법에 대해서만 포스팅을 하도록 하겠습니다.
*****
# Vue 시작하기
Vue도 다른 프레임워크와 같이 npm 모듈을 이용해 설치해서 사용할 수 있습니다.
```html
<script src="node_modules/vue/dist/vue.min.js"></script>
```
<!-- more -->
이렇게 스크립트 파일로 준비해 불러오면 Vue를 사용할 준비가 되었습니다.
*****
# Vue 텍스트 바인딩
```html
<div id="app"></div>
```
이렇게 아이디 또는 클래스(클래스는 스타일잡을때만 사용하고, 큰단위이므로 아이디를 사용하길 권장)로 선택자를 만들어놓고

```javascript
new Vue({
  el:'#app',
  data:{
    name:'태균'
  }
});
```
el키값을 통해 Vue의 선택자를 지정해줍니다.

```html
<div id="app">
  <h1>Name:{{name}}</h1>
</div>
```
이렇게 data안에 있는 name 객체를 바인딩 합니다. 결과를 어떨까요?
![name binding](https://tuhbm.github.io/images/vue/1/img1.png)

이렇게 바인딩이 되는 결과를 확인 할 수 있습니다.
*****
# Vue 함수 바인딩
이번에는 함수를 바인딩 해보겠습니다.
```html
<div id="app">
  <h1>{{greet()}}</h1>
</div>
```
이렇게 greet라는 함수실행문을 바인딩하고,
```javascript
new Vue({
  el:'#app',
  data:{
    name:'태균'
  },
  methods:{
    greet: function(){
      return '안녕하세요'
    }
  }
});
```
Vue의 methods라는 객체를 통해 바인딩 할 함수를 넣습니다.
결과를 볼까요?
![function binding](https://tuhbm.github.io/images/vue/1/img2.png)
이처럼 함수가 바인딩 된 결과를 확인할 수 있습니다. 그렇다면 함수의 매개변수도 사용이 가능합니다.

```javascript
new Vue({
  el:'#app',
  data:{
    name:'태균'
  },
  methods:{
    greet: function (time) {
      return '안녕하세요 좋은 ' + time + '입니다.';
    }
  }
});
```
```html
<h1>{{greet('밤')}}</h1>
```
이렇게 입력을 해보겠습니다.
![function binding2](https://tuhbm.github.io/images/vue/1/img3.png)

역시 매개변수 사용도 가능하다는 것을 확인해보았습니다.
*****
# v-bind
보통 템플릿에 데이터를 받아와 태그에 넣고 바인등을 합니다.
Vue 역시 그러합니다. 태그 바인딩에 대해 알아보겟습니다.
예를 들어 저의 블로그인 [https://tuhbm.github.io](https://tuhbm.github.io)를 태그에 넣고 추가해보겠습니다.
```javascript
new Vue({
  el:'#app',
  data:{
    name:'태균'
    website:'https://tuhbm.github.io'
  }
});
```
이렇게 데이터를 넣고
```html
<a href="{{website}}"></a><!-- 이렇게 하면 당연히 텍스트만 연결이 됩니다.-->
```
그렇다면 어떻게 넣어야할까요? 바로 여기서 사용할것은 바로 Vue만의 특이한 방법인 v-bind라는 어트리뷰트입니다.
```html
<a v-bind:href="{{website}}">블로그바로가기</a>
```
이런식으로 연결을해보면 올바르게 나오는 것을 확인 할 수 있습니다.
![v-bind](https://tuhbm.github.io/images/vue/1/img4.png)
*****
# v-html
태그 자체를 지정해서 넣는 방법도 있습니다.
```javascript
new Vue({
  el:'#app',
  data:{
    name:'태균'
    websiteTag:'<a href="https://tuhbm.github.io">블로그바로가기</a>'//시멘틱한 객체이름을 지어줍니다.
  }
});
```
여기선 태그를 바로 바인딩 하므로 v-html이란 어트리뷰트를 사용합니다.
```html
<p v-html="websiteTag"></p>
```
결과는?
![v-html](https://tuhbm.github.io/images/vue/1/img5.png)

*****

오늘은 
- vue를 시작하는방법
- 텍스트 바인딩
- 함수 바인딩
- v-bind
- v-html

에 대해 배웠습니다.
Vue 공부를 통해 지속적인 포스팅 하도록 하겠습니다. 감사합니다.
