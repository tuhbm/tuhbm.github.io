---
title: 번역 - Vue 2 + Firebase 인증 시스템을 사용하여 15분 안에 Vue 앱을 만드는 방법 2편
date: 2018-10-20 14:20:24
categories:
  - Javascript
  - Vue
tags:
- vue
- vue.js
- tutorial
- vue-router
- history mode
- to
- 컴포넌트
- compontent
thumbnail: https://tuhbm.github.io/images/vue-firebase/vue-firebase1.png
---

## 코드 작성하기!

[지난 포스팅](https://tuhbm.github.io/2018/10/20/vue-firebase1/)에서 우리는 vue에 대해 알아보고 실습을 위한 이론 및 프로젝트를 생성해 보았습니다.
이번시간에는 코드를 작성하면서 vue-router 실습을 진행해 보겠습니다.

#### 우리의 미래 App 아키텍처

우리의 APP은 인증없이 접근 할 수 있는 2개의 View(로그인보기 및 가입보기)와 인증을 통해서만 접근 할 수 있는 1개의 뷰 View (Hello보기)로 총 3개의 View로 구성됩니다.
![APP의 View구성](https://tuhbm.github.io/images/vue-firebase/vue-firebase7.png)

로그인이 성공적으로 완료되거나 새 계정을 만든 후에는 앱의 인증 된 부분 Hello의 View로 리다이렉션됩니다.

## 스텝1. 로그인과 회원가입
### 1-1 로그인 View

Login 컴포넌트를 만들어봅시다. src / components 아래에 Login이라는 새로운 Vue 구성 요소를 만듭니다.

일단 컴포넌트는 단순히 제목, 두 개의 input 필드, 버튼 그리고 간단한 문장으로 구성됩니다.
![Login 컴포넌트](https://tuhbm.github.io/images/vue-firebase/vue-firebase8.png)

이제 컴포넌트가 생성되었습니다! 하지만이 새로운 컴포넌트를 우리 앱에 어떻게 보여 줄 수 있을까요?
음... 우리는 vue-router를 사용할것입니다. 기억하시나요? 우리는 Vue-cli로 앱을 초기 구성할때 이미 vue-router를 설치했습니다.
<!-- more -->
*Vue-router* 무엇인가?

```text
vue-router는 Vue.js의 공식 라우터입니다. Vue와 깊은 관계입니다. Vue.js를 사용하여, Javscript만으로 SPA(Single Page Applications)을 쉽게 만들 수 있습니다.

Vue.js + vue-router를 사용하여 SPA(Single Page Applications)을 만드는 것은 매우 간단합니다. Vue.js를 통해 우리는 이미 컴포넌트로 애플리케이션을 구성하고 있습니다. vue-router를 사용 할 때, 우리가해야 할 일은 우리의 구성 요소를 route에 매핑하고 vue-router가 어디서 렌더링할지 알려주는 것입니다.

vue-router 설명서 <https://github.com/vuejs/vue-route>
```
이제 방금 만든 새로운 로그인 컴포넌트를 앱 라우터에 추가해 보겠습니다.

src/roubter/index.js 파일을 열고 다음과 같이 로그인 구성 요소를 라우터에 추가합니다.
![src/roubter/index.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase9.png)

그런 다음 브라우저 URL을 *http://localhost:8080/#/login*으로 변경하면 방금 만든 로그인 컴포넌트가 브라우저에 표시됩니다.
```text
url중간에 #을 제거하고싶다면 router에 mode를 history 모드로 지정하면됩니다. mode:history
```
![router histroy모드](https://tuhbm.github.io/images/vue-firebase/vue-firebase10.png)

![http://localhost:8080/#/login](https://tuhbm.github.io/images/vue-firebase/vue-firebase11.png)

*로그인* 컴포넌트의 html템플릿에 이미지를 넣지 않았는데도 Vue 로고가있는 왜 있을까요? App.vue 파일을 열면 *App* 컴포넌트의 템플릿은 다음과 같습니다.
![App 컴포넌트의 html 템플릿](https://tuhbm.github.io/images/vue-firebase/vue-firebase12.png)
*App* 컴포넌트는 앱의 주요 구성 요소이며 처음 렌더링됩니다. Vue 로고 이미지와 *router-view*라는 html템플릿에 들어 있습니다.

*router-view*는 *vue-router*의 구성 요소입니다.
```text
<router-view>는 지정된 경로에 대해 일치하는 컴포넌트를 렌더링하는 기능의 구성 요소입니다. <router-view>에서 렌더링 된 컴포넌트에는 동일한 위치에 대한 컴포넌트를 포함시킬 수 있습니다. 

vue-router 설명서 <https://router.vuejs.org/en/api/router-view.html>
```

*http://localhost:8080/#/login*에 요청을 받으면 *vue-router*는 *router-view* 구성 요소 내의 *router/index.js*에 정의 된 경로 */Login*의 첨부 된 구성 요소를 렌더링합니다. App 컴포넌트에는 템플릿에 Vue.js 로고의 이미지가 포함되어 있으므로 표시 할 수도 있습니다.

로그인 컴포넌트에 스타일을 추가해 보겠습니다.

![로그인 컴포넌트 스타일 코드](https://tuhbm.github.io/images/vue-firebase/vue-firebase13.png)

Login.vue 파일의 *style* 요소 안에 이러한 스타일을 추가하십시오.

![스타일이 적용된 로그인 컴포넌트](https://tuhbm.github.io/images/vue-firebase/vue-firebase14.png)


이제 로그인 페이지가 조금 더 예뻐졌습니다.

### 1-2- 가입하기 페이지

이번에는 로그인 컴포넌트를 만든 것과 마찬가지로 가입하기 컴포넌트를 만들 것입니다. 
이를 위해 *src/components/*에 *SignUp*이라는 새 vue 컴포넌트를 생성합니다.

로그인 컴포넌트와 마찬가지로 SignUp 컴포넌트는 간단하고 비슷한 같은 스타일로 구성됩니다.

![components/SignUp.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase15.png)

다음으로 src/router/index.js 내의 경로에 새 구성요소를 추가합니다.
![src/router/index.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase16.png)

그런 다음 브라우저의 url을 *http://localhost:8080/#/sign-up*으로 열면 다음과 같은 화면을 확인 할 수 있습니다.
![SignUp view](https://tuhbm.github.io/images/vue-firebase/vue-firebase17.png)

*******
지금까지 vue-router에 대한 이론 및 실습을 진행해보았습니다.
다음 포스팅에선 *vue-router*의 *router-link*를 통해 컴포넌트간 이동을 실습해보겠습니다.


*******
## 출처
해당 글은 [medium](https://medium.com/)에 [Anas Mammeri](https://medium.com/@anas.mammeri)의 [포스팅 글](https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c)을 번역한것입니다.
