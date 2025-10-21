---
title: 번역 - Vue 2 + Firebase 인증 시스템을 사용하여 15분 안에 Vue 앱을 만드는 방법 4편
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
thumbnail: 'https://tuhbm.github.io/images/vue-firebase/vue-firebase1.png'
date: 2018-10-22 22:01:25
---
지난 앞선 포스팅에서 [1편](https://tuhbm.github.io/2018/10/20/vue-firebase1/)에서는 기본 이론을 알고,
[2편](https://tuhbm.github.io/2018/10/20/vue-firebase2/)에선 컴포넌트를 각각 구성해보고, vue-router에 대한 이론을 알아보았습니다.
[3편](https://tuhbm.github.io/2018/10/20/vue-firebase3/)에선 vue-router를 사용해 컴포넌트간 이동을 진행해보았습니다.

이번편에서는 firebase를 연결하고 회원가입&로그인을 진행해 보겠습니다.

## 스텝3 firebase 사용

우리의 프론트 엔드 애플리케이션을 준비가 되었습니다. 인증 시스템을 사용할 수 있도록 Firebase를 구현합시다!

### 3.1 Firebase에서 새로운 프로젝트 만들기

Firebase를 사용하려면, 먼저 firebase 콘솔에 새로운 프로젝트를 생성해야합니다.
가입된 계정이 없으면 계정을 만든 다음으로 이동하십시오.
<console.firebase.google.com>

![Firebase console](https://tuhbm.github.io/images/vue-firebase/vue-firebase23.png)

_Add project - 프로젝트추가_ 를 클릭하세요. 새 프로젝트를 만드는 팝업이 활성화됩니다. 
그리고 원하는 이름을 정하세요. 나는 *vue-firebase-tutorial* 라고 정했습니다.
<!-- more -->
![Firebase console](https://tuhbm.github.io/images/vue-firebase/vue-firebase24.png)

그후 프로젝트의 콘솔 페이지에 접속합니다.
![프로젝트 firebase 콘솔 페이지](https://tuhbm.github.io/images/vue-firebase/vue-firebase25.png)

축하합니다! 당신의 Firebase 프로젝트가 생성되었습니다. 
이제 우리의 프로그램에 그것을 적용하려면 웹 어플리케이션에 Firebase 추가를 클릭하세요.

웹의 아이콘을 클릭하면 코드 스니펫이있는 팝업이 나타납니다. 두번째 script 내부의 코드를 복사합니다.
다음과 같은 코드입니다.
```javascript
let config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SEND_ID"
};
firebase.initializeApp(config);
```

이제 vue 프로젝트로 돌아가 보겠습니다. Firebase 모듈을 프로젝트에 추가해야합니다.
다음과 같이 터미널에 코드를 작성하여 추가합니다.

```commandline
$ npm install ——save firebase
```
설치가 끝나면 Firebase 모듈을 앱의 모듈로 추가하겠습니다.

main.js 파일을 열고 앞서 복사 한 설정 코드로 Firebase를 초기화하겠습니다.

![src/main.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase26.png)

튜토리얼의 단순성을 위해, Firebase 구성을 main.js 파일에 넣었지만, 실무에서는 특정파일에 구성합니다.

Firebase에서 가입신청을 받을 준비가되었습니다!

### 3.2 SignUp 컴포넌트에서 Firebase에 사용자 생성

*SignUp* 컴포넌트에서 Firebase에서 사용자를 생성하는 데 필요한 것을 구현합시다.
새로운 사용자를 만들려면 컴포넌트에 입력폼에서 *email*과 *password*를 받아야합니다.
이를 위해 Vue2의 *v-model* 지시문을 사용합니다.

```text
v-model 지정 문을 사용하여 입력양식 및 텍스트 영역 요소에 양방향 데이터 바인딩을 만들 수 있습니다. 
input type에 따라 요소를 업데이트하는 올바른 방법을 자동으로 선택합니다. 놀랍게도, v-model은 기본적으로 사용자 입력 이벤트에 대한 데이터를 업데이트하기 위해 사람이 이해 하고 표현하기 쉽게 디자인된 프로그래밍 언어 문법입니다. 
하지만 몇 가지 주요 사례 경우에는 특별한 주의하셔야합니다.
Vue2 문서:<https://vuejs.org/v2/guide/forms.html>
```

생성하려는 새 사용자의 전자 메일과 암호를 검색한 후 createUserWithEmailAndPassword라는 Firebase 기능을 사용할 것입니다.
이 Firebase 기능은 이름이 말하는 것과 똑같은 일을합니다. 전자 메일과 암호로 새로운 사용자를 만듭니다.

Firebase 공식 문서에서이 함수에 대해 더 많이 알 수 있습니다.
<https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword>

SignUp 컴포넌트에 모든 것을 추가합시다.

![SignUp 컴포넌트](https://tuhbm.github.io/images/vue-firebase/vue-firebase27.png)

createUserWithEmailAndPassword 함수는 onResolve 및 onReject 콜백과 함께 Firebase의 Promise를 반환합니다.
<https://firebase.google.com/docs/reference/js/firebase.Promise>

일단 우리는 기능의 결과를 경고창으로 표시해보겠습니다.

이제 유저를 생성해보겠습니다.

![SignUp에서 가입테스트](https://tuhbm.github.io/images/vue-firebase/vue-firebase28.png)

제대로 작동하지 않는 이유는 무엇일까요?

에러 메시지를 살펴보겠습니다.
```text
The given sign-in provider is disabled for this Firebase project. 
Enable it in the Firebase console, under the sign-in method tab of the Auth section.
(해당 로그인 공급자는이 Firebase 프로젝트에 대해 비활성화되어 있습니다. 
Auth섹션의 로그인 방법 탭에서 Firebase 콘솔에서 활성화하십시오.)
```

새로운 사용자를 생성 할 수있게하려면 Firebase의 로그인 공급자를 활성화해야합니다. 
3.1 단계에서 생성 한 프로젝트의 Firebase 콘솔로 돌아가 봅시다.

*Authentication - 인증 부분*에는 *SIGN-IN METHOD*라는 탭이 있습니다.

![Firebase SIGN-IN METHOD](https://tuhbm.github.io/images/vue-firebase/vue-firebase29.png)

이렇게 *이메일/비밀번호* 공급자를 활성화하면됩니다.

![SIGN-IN METHOD 활성창](https://tuhbm.github.io/images/vue-firebase/vue-firebase30.png)
![SIGN-IN METHOD 활성완료 후 표시](https://tuhbm.github.io/images/vue-firebase/vue-firebase31.png)

이제 다시 vue앱에서 사용자 가입을 해보겠습니다.

![가입 완료](https://tuhbm.github.io/images/vue-firebase/vue-firebase32.png)

정상 가입이 되었습니다. 축하합니다. 지금 당신의 Firebase프로젝트에 새로운 사용자를 등록했습니다.

가입완료를 정확하게 확인하기 위해 firebase 콘솔에서 Authentication 부분을 살펴보고 사용자 목록을 볼 수 있습니다.
방금 만든 사용자가 목록에 있어야합니다.

![Firebase Authentication List](https://tuhbm.github.io/images/vue-firebase/vue-firebase33.png)

### 3.3 새로운 사용자와의 로그인

이제 새로운 사용자를 만들었으므로이 사용자로 로그인 해 봅시다!(Firebase에 새로운 사용자를 성공적으로 만들면 자동으로 사용자가 응용 프로그램에 로그인하지만,이 예에서는 로그인보기에서 다시 로그인하게됩니다.)

Login 컴포넌트로 이동해봅시다. 로그인을 시도한 사용자의 *이메일*과 *비밀번호*를 다시 받아서이 사용자를 Firebase에 로그인해야합니다.
이 컴포넌트는 SignUp 컴포넌트처럼 보이지만 변경 사항은 우리가 호출 할 함수입니다. Firebase에서 사용자를 로그인하려면 Firebase에서 제공하는 signInWithEmailAndPassword 함수를 사용합니다. 이메일과 암호를 매개 변수로 사용하고 Firebase의 Promise를 반환합니다.

![Login 컴포넌트 코드](https://tuhbm.github.io/images/vue-firebase/vue-firebase34.png)

이제 새로 가입한 유저정보로 로그인해보겠습니다.

![Login 성공](https://tuhbm.github.io/images/vue-firebase/vue-firebase35.png)

로그인 성공! 이제 이 사용자는 Firebase에서 인증된 사용자입니다!

*******

지금까지 firebase 사용 및 User 가입 & 로그인을 해보았습니다.
다음 포스팅에서는 마지막으로 firebase의 인증기능을 통해 이번 주제를 마무리해보도록 하겠습니다.

*******
## 출처
해당 글은 [medium](https://medium.com/)에 [Anas Mammeri](https://medium.com/@anas.mammeri)의 [포스팅 글](https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c)을 번역한것입니다.
