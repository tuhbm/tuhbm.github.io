---
title: 번역 - Vue 2 + Firebase 인증 시스템을 사용하여 15분 안에 Vue 앱을 만드는 방법 5편
categories:
  - Javascript
  - Vue
tags:
  - vue
  - vue.js
  - tutorial
  - vue-router
  - router-link
thumbnail: 'https://tuhbm.github.io/images/vue-firebase/vue-firebase1.png'
date: 2018-10-30 20:06:19
---
지난 앞선 포스팅에서 [1편](https://tuhbm.github.io/2018/10/20/vue-firebase1/)에서는 기본 이론을 알고,
[2편](https://tuhbm.github.io/2018/10/20/vue-firebase2/)에선 컴포넌트를 각각 구성해보고, vue-router에 대한 이론을 알아보았습니다.
[3편](https://tuhbm.github.io/2018/10/20/vue-firebase3/)에선 vue-router를 사용해 컴포넌트간 이동을 진행해보았습니다.
[4편](https://tuhbm.github.io/2018/10/22/vue-firebase4/)에서는 firebase를 연결하고 회원가입&로그인을 진행해 보겠습니다.

마지막으로 firebase에 가입된 데이터에 인증을 통해 페이지 접속이 가능하도록 해보겠습니다.

## 스텝4 인증 후 앱 접속

### 4.1 router에 meta 추가

이제 인증을 받았습니다! 하지만 아무 일도 일어나지 않습니다. 사용자를 인증 한 경우에만 응용 프로그램으로 접근 가능하도록 사용자를 리다이렉션시켜야합니다. 우리는 앱에서 인증 후 이동 될 컴포넌트가 *Hello* 컴포넌트라고 정의 하였습니다.

Vue 애플리케이션에서 이를 구현하기 위해 vue-router의 메타 필드를 사용할 수 있습니다. 메타 필드는 경로에 설정할 수있는 추가 정보입니다.

메타에 대한 자세한 내용을 보려면 여기에서 vue-router 설명서를 확인하십시오.
<https://router.vuejs.org/en/advanced/meta.html>

이 예제에서 사용할 Hello 뷰에 메타 필드를 추가해 보겠습니다.
이 메타는 requiresAuth라고하며 *Hello* 컴포넌트에 인증이 필요함을 알립니다.

모든 컴포넌트에 경로가 존재하며, 기본 디폴트 페이지의 앱 기본경로를 재정의해야합니다.
<!-- more -->
![src/router/index.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase36.png)

__path : '*'__를 사용하여 존재하지 않는 모든 경로를 _로그인_ 컴포넌트로 리다이렉션합니다.
사용자가 인증 된 경우 사용자가 로그인하면 로그인 페이지에 접근 없이 자동으로 Hello 컴포넌트로 리다이렉션됩니다.
이제 잘못된 URL을 입력하면 로그인 컴포넌트로 리다이렉션되는 것을 볼 수 있습니다.

### 4.2 사용자 인증 시 경로 재연결

이제 모든 준비가 되었으므로 사용자가 Firebase에서 인증되었는지 확인해야 합니다. 
Firebase는 현재 사용자를 찾기 위한 함수를 제공합니다 : *firebase.auth (). currentUser*

이 함수는 *currentUser* 속성을 사용하여 현재 로그인 한 사용자를 다시 보냅니다. 사용자가 로그인하지 않은 경우 *currentUser*의 값은 null입니다.

앞 부분에서는 메타 필드를 경로에 설정하여 어떤 컴포넌트에 인증에 필요한지를 알 수 있습니다.
이제 각 컴포넌트에 접속하기 전에 사용자가 인증되었는지, 접속하려는 컴포넌트에 인증이 필요한지 확인해야 합니다.

그렇게하기 위해 우리는 vue-router의 네비게이션 가드를 사용할 것입니다.

```text
네비게이션 가드

이름에서 알 수 있듯이 vue-router가 제공하는 네비게이션 가드는 주로 리다이렉트나 취소하여 vue-router를 보호하는 데 사용됩니다.
경로 탐색 프로세스에 연결하는 방법에는 globally, per-route, or in-component(전역, 경로 별 또는 구성 요소)가 있습니다.

vue-router 설명서
<https://router.vuejs.org/en/advanced/navigation-guards.html>
```

이 예에서는 global navigation guard인 beforeEach를 사용하려고합니다.

src/router/index.js 파일에서 구현하겠습니다.

*beforeEach* 함수는 *to*, *from* 및 *next*의 세 매개 변수를 사용하며 탐색이 실행 될 때마다 호출됩니다.
> *to* 매개 변수는 탐색중인 대상 Route 객체입니다.
> *from* 매개 변수는 탐색되는 현재 경로입니다.
> *next* 매개 변수는 다음 이동을 하기 위해 호출해야하는 함수이며, 탐색을 리다이렉션하거나 중단하기위한 argument를 사용할 수 있습니다. 
자세한 내용은 [설명서](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards) 참조.

*beforeEach* 함수에서 Firebase의 *currentUser*를 다시 얻고, 우리가 이동하고자하는 라우트에 *requireAuth meta*가 있는지 확인하여 인증이 필요한지 확인합니다.

requiresAuth 메타를 다시 얻는 방법을 이해하려면 먼저 *라우트* 구성의 각 라우트 오브젝트를 라우트 레코드라고 부른다.
이 튜토리얼에서는 중첩 된 경로가 없지만 경로 레코드는 중첩 될 수 있습니다. 따라서 경로가 일치하면 두 개 이상의 경로 레코드와 잠재적으로 일치 할 수 있습니다.

경로와 일치하는 모든 경로 레코드는 *$route* 객체(네비게이션 가드의 객체 경로)에 *$route.matched* Array로 표시됩니다. 따라서 *$route.matched*를 반복하여 경로 레코드의 메타 필드를 확인해야합니다.

그래서, 우리의 네비게이션 가드 전역 함수에서, *to* 객체를 라우팅하기 위해서, *matched* Array가 *requiresAuth* *메타*와 함께 몇개의 레코드 (우리의 경우 하나의 레코드)를 가지고 있는지 검색합니다.

그런 다음 네비게이션 규칙을 정의했습니다.

탐색 경로에 인증이 필요하고 현재 로그인 한 사용자가없는 경우 로그인 컴포넌트로 리다이렉션됩니다.

로그인 한 사용자가있어서 탐색 경로가 인증을 필요로하지 않는 경우 우리는 Hello 컴포넌트로 리디렉션합니다.

그렇지 않으면, 우리는 탐색을 진행합니다.

이제 사용자가 인증 된 경우에만 앱에 접근 할 수 있습니다. 이전 단계에서 이미 로그인 했으므로 네비게이션 가드 구현을 기반으로 페이지를 다시로드하는 경우 Hello 컴포넌트로 리다이렉션해야합니다.

페이지를 다시로드 해 봅시다.

![Login.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase38.png)

아무것도 일어나지 않습니다. 여전히 로그인 컴포넌트가 보여지고 있습니다.

왜 그럴까요....?

간단히 말하면 우리 앱의 라이프 사이클의 네비게이션 가드 beforeEach은 Firebase 초기화가 끝나기 전 실행됩니다. 그래서 우리가 처음 앱을로드 할 때, Firebase 모듈의 초기화가 완료하지 않았기 때문에 firebase.auth (). currentUser가 null을 반환합니다.

첫 번째로드 이후에 SingUp 컴포넌트로 이동하려고하면 리다이렉션이 발생하고 Hello컴포넌트로 끝납니다.

이러한 상황을 피하고 리다이렉션이 앱의 첫 번째로드에서 직접 발생하는지 확인하려면 어떻게 해야할까요?

Firebase를 사용하면 Auth 객체에 관찰자를 설정할 수 있습니다. 따라서 현재 사용자를 얻을 때 Auth 객체가 초기화 등의 중간 상태에 있지 않도록 할 수 있습니다.

이 관찰자를 OnAuthStateChanged라고 합니다.(관찰자에 대한 자세한 내용은 Firebase 설명서에서 확인할 수 있습니다.)
<https://firebase.google.com/docs/auth/web/manage-users#get_a_users_profile>

따라서 OnAuthStateChanged 관찰자에 콜백을 설정하여 Firebase가 초기화되었음을 확인할 때만 Vue 앱을 초기화할 수 있습니다.

src/main.js 파일을 다음과 같이 변경합니다.
![src/main.js](https://tuhbm.github.io/images/vue-firebase/vue-firebase39.png)

이제 Firebase Auth 객체를 사용할 준비가 된 경우에만 앱을 초기화합니다.

페이지를 새로 고치거나 url에서 로그인 또는 SignUp 컴포넌트로 접근하려고하면 리다이렉션이 작동하는 것을 볼 수 있습니다!

### 4.3 Login/SignUp 앱에서 로그 아웃 한 후 리다이렉션

이제 인증 시스템이 생겼으므로 로그인 후에 또는 새로운 사용자가 생겼을 때에도 사용자를 리다이렉션해야합니다.
또한 Firebase에서 로그아웃도 할 수 있어야합니다.

로그아웃하려면 Hello 컴포넌트에 버튼을 추가하고 Firebase에서 로그아웃 할 이벤트를 추가해야합니다.

signInWithEmailAndPassword와 createUserWithEmailAndPassword와 같이 Firebase는 Promise이라는 을 반환하는 singOut기능을 제공합니다.
SignOut 기능이 실행되면 앱이 로그인 컴포넌트로 리디렉션됩니다.

![Hello.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase40.png)

이제 logOut버튼을 클릭하면 Firebase에서 로그아웃 한 다음 _Login_컴포넌트로 돌아갑니다.
Firebase에서 로그 아웃했는지 확인하기 위해 페이지를 새로고침을 하거나 Hello컴포넌트에 접근가능합니다.

이제 로그인을 다시 시작하겠습니다. 
로그인하기 전에 앱의 인증 부분으로 리다이렉션 할 수 있도록 코드를 변경해 보겠습니다.

![Login.vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase41.png)

이제 로그인을 시도하면 _Hello_ 컴포넌트로 리다이렉션되어야합니다.

SignUp 컴포넌트도 수정해보겠습니다.
![SignUp .vue](https://tuhbm.github.io/images/vue-firebase/vue-firebase42.png)
이제 새 계정을 만든 후에 사용자는 Hello컴포넌트로 리다이렉션됩니다.

여러분은 *signInWithEmailAndPassword*, *createUserWithEmailAndPassword* 및 *signOut*에서 콜백 함수를 ES6 화살표 함수로 바꾸 었다는 사실을 알아 차렸나요?
왜 변경했을까요?

간단하게 메소드 정의 *(function name () {})*은 자기 자신이 컨텍스트를 가지고 있기 때문입니다.
메소드 정의를 사용했다면 콜백 내의 *this.$router*에 접근 할 수 없습니다.
부모 메소드가 객체를 변수에 캡슐화하여 액세스해야합니다.

ES6 화살표 함수를 사용하면 * this *는 어휘 적이므로이 컨텍스트를 자체적으로 만들지 않습니다.
대신,*this*는 둘러싼 맥락에서 본래의 의미를 가지고 있습니다.

ES6 화살표 함수를 사용하면*this. $ router*에 접근하여 리다이렉션을 할 수 있습니다.

## 마치면서
이제 Firebase 인증 시스템을 사용하는 작은 Vue 앱이 생겼습니다!
모든 출처는 Github : github.com/CaptainYouz/vue-firebase-tutorial에서 확인할 수 있습니다.

