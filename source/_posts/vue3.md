---
title: vue 알아보기 3편
categories:
  - 공부
  - Javascript
  - Vue
tags:
  - vue
  - vue.js
  - vue.js2
  - tutorial
  - methods
  - computed
  - v-if
  - v-show
  - v-for
date: 2017-09-19 14:58:26
thumbnail: https://tuhbm.github.io/images/bnr-vue.jpg
---
## Vue
프론트엔드 개발 공부를 위해 SPA페이지 제작을 위한 Javascript 프레임워크 중 Vue를 공부해보도록하겠습니다.
Vue에 대한 설명 및 장단점은 추후 포스팅하도록 하고, 지금은 사용방법에 대해서만 포스팅을 하도록 하겠습니다.
*****

# computed
계산된 속성을 바인딩할때 사용.
 ## computed 사용법
```javascript
new Vue({
  el:'#app',
  data:{},
  methods:{},
  computed:{}
});
```
<!-- more -->
이처럼 computed의 메소드를 추가하여 사용할 수 있습니다.
 ## computed와 methods의 차이
지난 [1편](https://tuhbm.github.io/2017/09/15/vue1/#Vue-함수-바인딩) 을 통해 함수를 methods의 메소드안에 입력한다고 배웠습니다.
**하지만 이번시간에 배우는 computed와의 차이는 무엇일까요?**
예를 들어 살펴보겠습니다.

먼저
methods에 함수를 추가하여 입력해보겠습니다.
```html
<button v-on:click="a++">Add to A</button>
<button v-on:click="b++">Add to B</button>
<p>A - {{ a }}</p>
<p>B - {{ b }}</p>
<p>Age + A = {{ addToA }}</p>
<p>Age + B = {{ addToB }}</p>
```
html에 연결을 해보겠습니다.
```javascript
new Vue({
  el:'#app',
  data:{
    age:29,
    a:0,
    b:0
  },
  methods:{
    addToA: function(){
      return this.a + this.age
    },
    addToB: function(){
      return this.b + this.age
    }
  }
});
```
결과를 살펴보도록 하겠습니다.
![methods write](https://tuhbm.github.io/images/vue/3/img2.png)
에러가 조금있지만
데이터 a와 b의 값은 잘들어가 있습니다.
함수값을 바인딩 했던 부분에 문제가 있습니다.
![methods write2](https://tuhbm.github.io/images/vue/3/img2.gif)
하지만 data값을 바인딩한곳은 이벤트도 잘 일어나는 것을 확인할 수 있습니다.
무엇이 문제일까요?
이번에는 computed 메소드에 함수를 넣어보겠습니다.
```javascript
new Vue({
  el:'#app',
  data:{
    age:29,
    a:0,
    b:0
  },
  computed:{
    addToA: function(){
      return this.a + this.age
    },
    addToB: function(){
      return this.b + this.age
    }
  }
});
```
![computed write](https://tuhbm.github.io/images/vue/3/img3.png)
보시는 바와같이 계산이 된값이 랜더링 되는 모습을 보실수 있습니다.
![computed write2](https://tuhbm.github.io/images/vue/3/img3.gif)
이벤트도 잘 작동됩니다.
**차이는 무엇일까요?**

차이는 렌더링시 함수를 미리 계산해서 적용할수 있느냐 없느냐의 차이입니다.
methods의 입력함 함수는 랜더링시 바로 본인을 계산하지 못한다는것인데요.
반면 computed의 에 입력한 함수는 미리 계산을 해서 캐싱해둔다는것입니다.

한마디로 정리를 하면,
**"랜더링 시 methods는 계산을 하지못한다. 그러므로 계산된 속성을 캐싱해두는 computed를 사용해야한다."**
라고 정리할 수 있습니다.
*****

# v-if
[2편](https://tuhbm.github.io/2017/09/18/vue2/#toggle-event) 을 통해 우리는 토글 이벤트를 만들어보았습니다.
그때 방식은 class명을 추가 제거하는 방식으로 진행했습니다.
하지만 이번에는 v-if 어트리뷰트를 통해 돔을 조작하는 방법을 사용해보겠습니다. 
```html
<button @click="error = !error">Toggle Error</button>
<p v-if="error">error</p>
<p v-else="!error">Success</p>
```
```javascript
new Vue({
  el:"#app",
  data:{
    error:false
  }
});
```
v-if를 통해 data의 error의 값을 true와 false값을 변경하는 형태입니다.
v-if 뿐만아니라 v-else를 통해 data값에 따라 돔을 조작하는 방법입니다.(v-else="!error"에 값을 넣어주었지만 비워놓아도 작동을 합니다.)
![v-if](https://tuhbm.github.io/images/vue/3/img1.gif)
*****

# v-show
v-show를 이용해서도 이벤트를 발생시킬 수있습니다. 예를 들어보겠습니다.

```html
<button @click="error = !error">Toggle Show Error</button>
<button @click="success = !success">Toggle Show  Success</button>
<p v-show="error">show error :)</p>
<p v-show="success">show success :)</p>
```
```javascript
new Vue({
  el:"#app",
  data:{
    error:false,
    success:false
  }
});
```
![v-show](https://tuhbm.github.io/images/vue/3/img4.gif)
v-show를 통해 데이터에 값에 접근해 true & false값을 확인하여 돔의 style중 display속성을 none과 block형태를 토글하는 것을 볼 수 있습니다.
## v-if와 v-show의 차이
그렇다면 v-if와 v-show를 이용해 둘다 토글이벤트등을 발생시킬 수 있습니다.
매우 자주 사용할 것입니다. display를 통해서 또는 dom조작을 통해서 컨텐츠를 표현하는 것은 텝, 메뉴 등등에서 매우 자주 사용하는 이벤트입니다.

그렇다면 차이는 무엇일까요?
바로

**v-show는 스타일(display)조작**
**v-if는 돔자체를 생성하고 제거 하는 조작**
이정도의 차이입니다.

평소에 어떤 방법을 사용하느냐에 따라 렌더링이나 성능에 영향을 줄수 있으므로 잘판단해서 사용하는 냉철한 판단이 있어야겠죠?
*****

# v-for
vanilla js를 통해 우리는 데이터를 받아 랜더링 할때 주로 이런방법을 사용했습니다.
```javascript
var data = {
  ninjas:[
    {name:'Ryu',age:25},
    {name:'Youshi',age:35},
    {name:'Ken',age:55}
  ]
}

function write(){
  var html = '';
  for(var i =0; i < data.ninjas.length; i++){
    html += '<li>'+data.ninjas[i].name+','+data.ninjas[i].age+'</li>'
  }
  console.log(html);
}
```
이러한 힘든 과정을 통해서 데이터를 바인딩해왔습니다.

그렇지만 우리는 Vue의 v-for어트리뷰트를 통해 쉽게 데이터를 바인딩 할 수 있습니다.
예제를 통해 살펴보겠습니다.

먼저 데이터형태를 보겠습니다
```javascript
new Vue({
  el:'#app',
  data:{
    characters:['Mario','luigi','Yoshi','Bowser'],
    ninjas:[
      {name:'Ryu',age:25},
      {name:'Youshi',age:35},
      {name:'Ken',age:55}
    ]
  },
  methods:{},
  computed:{}
});
```
데이터 형태는 객체에 배열,
객체에 배열에 객체를 또 key,value로 묶은 객체가 들어가 있는 형태 두가지로 준비했습니다.
html에 랜더링 시켜보겠습니다.
```html
<ul>
    <!--<li v-for="character in characters">{{character}}</li> 원래는 이렇게 사용-->
    <!-- <li v-for="x in characters">x</li> 이렇게 변수 명을 바꿔서도 사용가능-->
    <li v-for="(x,index) in characters">{{index}}.{{x}}</li><!-- 이처럼 자동으로 인덱스도 계산이 가능 -->
</ul>
<ul>
    <!--<li v-for="ninja in ninjas">{{ninja.name}} - {{ninja.age}}</li>-->
    <li v-for="(ninja,index) in ninjas">{{index}}.{{ninja.name}} - {{ninja.age}}</li>
</ul>
```
결과를 보도록 하죠.
![v-for](https://tuhbm.github.io/images/vue/3/img5.png)
이 처럼 똑똑한 우리 Vue!!

데이터를 ul>li의 구조가 아닌 다른 형태로도 렌더링 시켜보겠습니다.
특별한 태그에 바인딩 시키는것이아니라 단순 구조 반복이라면,
**template**  이라는 가상 태그를 이용해서 바인딩이 가능합니다.
데이터는 위의 것과 같은 것을 사용하겠습니다.

```html
<template v-for="(ninja,index) in ninjas">
    <h3>{{index}}.{{ninja.name}}</h3>
    <p>{{ninja.age}}</p>
</template>
<template v-for="ninja in ninjas">
    <div v-for="(val,key) in ninja">
        <p>{{key}} - {{val}}</p>
    </div>
</template>
```
결과를 보겠습니다.
![v-for template](https://tuhbm.github.io/images/vue/3/img6.png)
이것처럼 특정 태그에 바인딩시키는 것이 아니면 **template** 가상태그를 사용하면 된다는 것 기억해주세요.
*****

오늘은 
- computed
  + computed 사용법
  + computed와 methods의 차이
- v-if
- v-show
  + v-if와 v-show의 차이
- v-for

에 대해 배웠습니다.
Vue 공부를 통해 지속적인 포스팅 하도록 하겠습니다. 감사합니다.
