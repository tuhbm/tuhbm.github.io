---
title: 번역 - Vue 2 + Firebase 인증 시스템을 사용하여 15분 안에 Vue 앱을 만드는 방법 3편
date: 2018-10-20 14:20:32
categories:
  - 공부
  - Javascript
  - Vue
tags:
- vue
- vue.js
- tutorial
- vue-router
- router-link
- to
- 컴포넌트
- compontent
thumbnail: https://tuhbm.github.io/images/vue-firebase/vue-firebase1.png
---

지난 앞선 포스팅에서 [1편](https://tuhbm.github.io/2018/10/20/vue-firebase1/)에서는 기본 이론을 알고,
[2편](https://tuhbm.github.io/2018/10/20/vue-firebase2/)에선 컴포넌트를 각각 구성해보고, vue-router에 대한 이론을 알아보았습니다.
이제 vue-router를 사용해 컴포넌트간 이동을 진행해보도록 하겠습니다. 

## 스텝2 컴포넌트에서 컴포넌트의 이동

우리가 정의한 앱 구조를 살펴보면 Login 컴포넌트에서 SignUp컴포넌트로 이동하고 두 컴포넌트에서 Hello 컴포넌트로 이동할 수 있습니다.
어떻게 해야할까요?

우리는 *router-link*라는 _vue-router_ 구성 요소를 사용할 것입니다.

```text
<router-link>는 라우터를 사용하는 앱에서 사용자가 이동하기 위한 구성 요소입니다. 목표 위치는 to라는 prop으로 지정됩니다.
기본적으로 올바른 href로 <a> 태그로 렌더링되지만 tag의 prop으로 구성할 수 있습니다.

<router-link tag="li" to="/foo">
   <a>/foo</a>
</router-link>

또한 대상 경로가 활성화되어 있으면 링크가 자동으로 활성화된 CSS 클래스를 가져옵니다.

vue-router 설명서<https://router.vuejs.org/en/api/router-link.html>
```
<!-- more -->
이제 Login 및 SignUp 컴포넌에서 *router-link*를 사용하여 두 가지 컴포넌트끼리 이동 할 수 구현 하겠습니다.

![Login.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase18.png)
![SignUp.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase19.png)

이제 방금 만든 링크를 사용하여 두 컴포넌트 사이를 이동 할 수 있습니다.

마지막으로 *Login*/*SignUp* 컴포넌트에서 *Hello*컴포넌트로 이동시켜야합니다.
현재 구현된 코드가 없으므로, 인증확인 확인 없이 *Connection* 버튼을 클릭할 때 _Hello_ 컴포넌로 간단히 리다이렉션 시킬 것입니다.

라우터 링크를 사용하면 구성 요소의 html부분에서 이동을 위한 값을 탐색이 이루어집니다.
그러나 우리는 계획에따라 경로를 이용하려 합니다.
이렇게 하기위해선 *Connection* 버튼을 클릭할때 vue.js의 v-on메소드를 통해 이벤트를 바인딩하여 처리 할 수 있습니다.

```text
이벤트 바인딩

우리는 v-on 지시문을 사용하여 DOM 이벤트를 수신하고, 
호출하였을때 JavaScript를 실행할 수 있습니다.

Vue2 문서: <https://vuejs.org/v2/guide/events.html#Listening-to-Events>
```
우리는 이벤트를 바인딩하고 클릭하여 실행합니다. 지금은 Connection 버튼을 클릭하여 이벤트가 발생해서 Hello 컴포넌트로 이동합니다.

각 컴포넌트 사이를 프로그래밍 방식으로 이동하려면 *vue-router*에는 앱에서 사용할 수 있는 메소드들이 있습니다.
이러한 메소드에 대한 자세한 내용은 *vue-router*의 설명서를 참조하세요. 
<https://router.vuejs.org/en/essentials/navigation.html>


이 예제에서는 사용자가 로그인하면 _Hello_ 컴포넌트를 시작 경로로 사용하기 때문에 _replace_ 메소드를 사용하려고합니다.

*로그인* 컴포넌트를 변경하여 구현해 보겠습니다.

![Login.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase20.png)
우리는 login 함수안에 *this.$router.replace('hello') 가 있는 것을 볼 수 있습니다.

왜 우리는 router에 접근할때 _this_ 를 함께 사용할까요? *main.js* 파일을 살펴보면, router객체가 Vue 앱에 삽입되어있는 것을 알 수 있습니다.
이러한 방법은 우리가 어플리케이션의 모든 컴포넌트를 쉽게 접근 할 수 있는 방법입니다.
 
![src/main.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase21.png)

또한 우리는 _'hello'_ 로 접근하지만 아직 hello에 대한 경로가 없습니다.

Hello 컴포넌트의 _'/'_ 라는 기본 경로는 앱을 실행시켰을 때에 접속합니다. 
사용자가 인증을 완료한 후 Hello 컴포넌트에 접근해야 하므로 _/hello_ 경로에 접근했을 할 때 Hello 컴포넌트에 접근 할 수 있도록 경로를 추가해야 합니다.

![src/router/index.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase22.png)

이제 *Login* 컴포넌트에서 연결 버튼을 클릭하면 *Hello* 컴포넌트로 리디렉션됩니다.

*******

지금까지 router-link를 통해 컴포넌트에서의 이동 및 이벤트를 작성해서 실행해 보았습니다.
다음 포스팅에서는 firebase를 실습해보도록 하겠습니다.

*******
## 출처
해당 글은 [medium](https://medium.com/)에 [Anas Mammeri](https://medium.com/@anas.mammeri)의 [포스팅 글](https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c)을 번역한것입니다.
