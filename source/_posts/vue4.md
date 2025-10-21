---
title: vue 알아보기 4편
categories:
  - 공부
  - Javascript
  - Vue
tags:
  - vue
  - vue.js
  - vue.js2
  - tutorial
  - Vue.component
  - refs
  - vue-cli
  - vue init
  - npm install
  - npm run dev
date: 2017-09-20 14:13:27
thumbnail: https://tuhbm.github.io/images/bnr-vue.jpg
---
## Vue
프론트엔드 개발 공부를 위해 SPA페이지 제작을 위한 Javascript 프레임워크 중 Vue를 공부해보도록하겠습니다.
Vue에 대한 설명 및 장단점은 추후 포스팅하도록 하고, 지금은 사용방법에 대해서만 포스팅을 하도록 하겠습니다.
*****


# Vue.component
우리는 SPA(single page application)을 제작할때 컴포넌트를 만들고 재사용하는 방법을 일반적으로 많이 사용합니다.
그만큼 컴포넌트를 만드는 것이 중요합니다.
이번에는 Vue를 이용해서 컴포넌트를 만드는 방법을 알아보겠습니다.
기존의 방식과 같이 뷰 프레임워크를 연동 후 부터 진행을 해보겠습니다.
<!-- more -->
app.js파일을 살펴보겟습니다.
컴포넌트를 만드는 가장 쉬운 방법은
Vue.component(컴포넌트이름,리턴할객체)의 형태입니다.
실제 만들어 보겠습니다.
```javascript
Vue.component('greeting',{
  template:'<p> 안녕하세요. 저는 {{name}}. <button @click="changeName">이름바꾸기</button></p>',
  data:function(){
    return {
      name:'태균'
    }
  },
  methods:{
    changeName:function(){
      this.name = '현석'
    }
  }
});
new Vue({
  el:'#app-one',
  data:{

  },
  methods:{},
  computed:{}
});
new Vue({
  el:'#app-two',
  data:{},
  methods:{},
  computed:{}
});
```
이제 html에서 사용해보도록 하겠습니다.
```html
<div id="app-one">
    <h2>Vue app one</h2>
    <greeting></greeting>
</div>
<div id="app-two">
    <h2>Vue app two</h2>
    <greeting></greeting>
</div>
```
![vue.component](https://tuhbm.github.io/images/vue/4/img1.png)
랜더링은 잘되었습니다.
각각의 컴포넌트가 연결이 잘되었는지 확인해보겠습니다.
![vue.component gif](https://tuhbm.github.io/images/vue/4/img1.gif)
클릭시 각각 이벤트가 진행되는 컴포는트가 완성되었음을 확인 할 수 있습니다.

# refs
ref는 [한국어번역 vue](https://kr.vuejs.org/v2/api/#ref)을 살펴보면 
>ref는 엘리먼트 또는 자식 컴포넌트에 대한 참조를 등록하는데 사용합니다. 
>참조는 부모 컴포넌트의 $refs 객체 아래에 등록됩니다. 
>일반 DOM 엘리먼트에서 사용되는 경우 참조는 해당 엘리먼트입니다. 
>하위 컴포넌트에서 사용되는 경우 참조는 컴포넌트 인스턴스 입니다.

이렇게 표현되어있습니다.
**쉽게말해 ref어트리뷰트 이용해 scope안에 있는 자식들은 참조하고, $refs를 통해 객체를 활용할 수 있다는 말입니다.**
실제 사용을 해보겠습니다.
```html
<div id="app">
    <h2>Refs</h2>
    <input type="text" ref="input">
    <button @click="readRefs">Submit</button>
    <p>당신이 좋아하는 음식은 무엇인가? :{{output}}</p>
</div>
```
```javascript
new Vue({
  el:'#app',
  data:{
    output:''
  },
  methods:{
    readRefs:function(){
      console.log(this.$refs);
      this.output = this.$refs.input.value;
    }
  }
});
```
이제 input[type=text]에 글을 입력하면, 밑에 답변이 적히게 됩니다.
그리고 콘솔의 영역을 살펴보도록 하겠습니다.
![ref](https://tuhbm.github.io/images/vue/4/img2.gif)
보시면 우리가 원하는 결과물이 나오는것을 확인하실 수 있습니다.
콘솔영역을 살펴보면 input이 찍히고 우리가 입력한 '새우'가 value값에 찍히는 것을 확인 할 수 있습니다.
스코프내에 엘리먼트를 조정할수도 있습니다.
```html
<div id="app">
    <h2>Refs</h2>
    <input type="text" ref="input">
    <button @click="readRefs">Submit</button>
    <p>당신이 좋아하는 음식은 무엇인가? :{{output}}</p>
    <div ref="test">Vue ref를 공부해보자.</div>
</div>
```
```javascript
new Vue({
  el:'#app',
  data:{
    output:''
  },
  methods:{
    readRefs:function(){
      console.log(this.$refs.test.innerText);
      this.output = this.$refs.input.value;
    }
  }
});
```
![ref2](https://tuhbm.github.io/images/vue/4/img3.gif)
제대로 된 값이 console.log에 찍히는것을 확인 할 수 있습니다.
이처럼 ref를 이용해 참조를 통해 간단한 값을 뽑아내거나 이벤트를 발생시키도록 합니다.

# vue-cli설치
우리는 Vue를 이용한 프로젝트를 구성할때 하나하나 모든 설정을 해야합니다.
하지만 이를 간단하게 줄일 수 있는 방법이 있습니다.
NPM(Node Package Module)을 이용한 방법입니다.
node를 이용한 방법으로 vue도 설치하고, 빌드도구 등의 작업등을 쉽게 할수 있습니다.

일반적으로 GUI(graphic user interface)를 이용하는 방법도 있겠지만,
Window에서는 CMD창을
Mac OS에서는 터미널을 이용하여 text를 입력하여 사용가능합니다.(node 및 vue가 설치되어있다는 가정하에 진행하겠습니다.)

vue-cli를 설치하기위서는 우선
> npm install -g vue-cli

명령어를 통해 설치합니다.
그런 후 프로젝트를 생성합니다.
## vue init

> vue init template-name project-name

을 통해 프로젝트를 생성합니다.

[template-name설명 링크](https://medium.com/witinweb/vue-cli-로-vue-js-시작하기-browserify-webpack-22582202cd52/#43b5) 를 통해 템플릿네임에 대해 알아보세요.

> vue init webpack-simple vuejs-playlist
저는 이렇게 생성하였습니다.
![vue init](https://tuhbm.github.io/images/vue/4/img4.png)

프로젝트 생성 후에는 생성된 프로젝트 내에 package.json의 module을 인스톨해야합니다.
## npm install
> npm install

명령어를 입력하면 
![vue install](https://tuhbm.github.io/images/vue/4/img5.png)
그림과 같이 package.json의 기록되어있는 모듈이 설치됩니다.
설치가 완료된 후 파일들을 살펴보겠습니다.
![vue install file](https://tuhbm.github.io/images/vue/4/img6.png)
기본 구조입니다.
Vue는 기본으로 javascript는 ES6문법을 사용하므로, ES6문법을 ES5문법으로 변경하기위해 babel을 사용하므로 babel설정파일 그리고 웹팩 설정파일등등이 구성되어 있습니다.
## npm run dev
현재 작업내용을 확인하기위해 live server를 띄우며 작업을 확인 할 수 있습니다.
> npm run dev

를 통해 확인할 수 있습니다.

![vue run dev](https://tuhbm.github.io/images/vue/4/img7.png)
이처럼 현재 기본 템플릿형태가 나오는 것을 확인 할 수 있습니다.
이제 Vue를 이용해서 본인의 작업을 완성해보세요


*****

오늘은 
- Vue.component
- refs
- vue-cli설치
- vue init
- npm install
- npm run dev

에 대해 배웠습니다.
Vue 공부를 통해 지속적인 포스팅 하도록 하겠습니다. 감사합니다.