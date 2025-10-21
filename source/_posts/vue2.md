---
title: vue 알아보기 2편
categories:
  - 공부
  - Javascript
  - Vue
tags:
  - vue
  - vue.js
  - vue.js2
  - tutorial
  - v-on
  - v-bind
  - v-model
date: 2017-09-18 17:02:20
thumbnail: https://tuhbm.github.io/images/bnr-vue.jpg
---

## Vue
프론트엔드 개발 공부를 위해 SPA페이지 제작을 위한 Javascript 프레임워크 중 Vue를 공부해보도록하겠습니다.
Vue에 대한 설명 및 장단점은 추후 포스팅하도록 하고, 지금은 사용방법에 대해서만 포스팅을 하도록 하겠습니다.
*****

# v-on
v-on 어트리뷰트를 통해 이벤트를 발생시킬 수 있습니다.
그리고
약어 **[ @ ]** 를 통해 단축이 가능합니다.
```html
<button v-on:click.once="Function">이벤트</button>
<button @click.once="Function">이벤트</button>
```
<!-- more -->
## keyboard event
```html
<input type="text" v-on:keyup="logName()"><!-- keyup 이벤트가 발생할때마다 logName 함수실행 -->
<input type="text" v-on:keyup.enter="logName()"><!--  enter를 눌렀을때마다 logName 함수실행 -->
<input type="text" v-on:keyup.alt,enter="logName()"><!--  alt키와 enter를 눌렀을때마다 logName 함수실행 -->
```
![keyboard event](https://tuhbm.github.io/images/vue/2/img2.png)

## mouse event 
### mousemove
키보드 이벤트와 마찬가지로 마우스 이벤트도 가능합니다.
```html
<div id="canvas" v-on:mousemove="updataXY">{{x}},{{y}}</div>
```
선언 후
```javascript
new Vue({
  el:'#app',
  data:{
    x:0,
    y:0
  },
  methods:{
    updataXY:function(event){
      this.x = event.offsetX;
      this.y = event.offsetY;
    }
  }
});
```
이렇게 마우스의 현재값(offset)값을 알려주는 이벤트도 발생시킬 수 있습니다.


### click
```html
<button v-on:click="minus(1)">1년빼기</button>
```
#### dblclick
```html
<button v-on:dblclick="minus(10)">10년빼기</button><!-- 클릭이벤트 앞에 dbl을 붙여주므로써 더블클릭시 이벤트가 발생하도록 할수있다 -->
<button @dblclick="add(10)">10년더하기</button>
```
#### once
```html
<button @click.once="add(1)">1년더하기</button> <!-- once를 통해 한번만 실행되게 할 수 있다 -->
```
#### prevent
a태그 클릭시 링크되는기능을 막아줄 수 있다.
```javascript
e.preventDefault();
```
보통 우리는 a태그시 링크되는것을 막기위해서 위와같은 방법을 사용했었다. 하지만 Vue에서는 prevent를 통해 이를 수행 할 수 있다.
```html
<a v-on:click.prevent="click()" href="https://tuhbm.github.io">블로그 바로가기</a>
```
를 html에서 설정할 수 있다는것이다.

더많은 [v-on](https://kr.vuejs.org/v2/api/#v-on) 한국어 설명은 링크를 통해 확인
****
# v-bind
[1편](https://tuhbm.github.io/2017/09/15/vue1/) 에서도 잠시 소개해 드린 v-bind 어트리뷰트는 동적으로 하나 이상의 컴포넌트 속성 또는 표현식을 바인딩 합니다.
클래스나 스타일을 넣을때도 많이 사용됩니다.
그리고 
약어 **[ : ]** 를 통해서 줄일 수도 있습니다.
예를 들어
```html
<div v-bind:class="className"></div>
<div :class="className"></div>
<div v-bind:style="display:none"></div>
<div :style="display:none"></div>
```
이런식으로 사용이 가능합니다.

## class binding
클래스를 바인딩 할때 아래와같은 표현도 가능합니다.
```html
<div v-bind:class="{red:true, blue:true}"></div>
<div v-bind:class="{red:true, blue:false}"></div>
```
![v-bind:class](https://tuhbm.github.io/images/vue/2/img1.png)
이렇게 표현되는것을 보실 수 있습니다.
이를통해 토글이벤트도 발생시킬수 있습니다.
### toggle event
```html
<div v-on:click="available = !available" v-bind:class="{available:available}">
    <span>box</span>
</div>
```
```css
span{
    background:red;
    display:inline-block;
    padding:10px;
    color:#fff;
    margin:10px 0;
}
.available span{
    background:green;
}
```
```javascript
new Vue({
  el:'#app',
  data:{
    available: false,
    nearby: false
  }
});
```
![toggle event](https://tuhbm.github.io/images/vue/2/img3.png)
****
# v-model
v-model은 2way binding에 적합한 어트리뷰트입니다.
예를 들어보겠습니다.
```html
<label for="">Name:</label>
<input type="text" v-model="name"><!-- v-model 어트리뷰트를 이용하면 데이터의 키에 맞게 설정됨 -->
<span>{{name}}</span>
```
![v-model](https://tuhbm.github.io/images/vue/2/img4.png)
*****

오늘은 
- v-on
  + keyboard event
  + mouse event
- v-bind
  + class binding
   * toggle event
- v-model

에 대해 배웠습니다.
Vue 공부를 통해 지속적인 포스팅 하도록 하겠습니다. 감사합니다.


