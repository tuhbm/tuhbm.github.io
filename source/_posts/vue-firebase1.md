---
title: 번역 - Vue 2 + Firebase 인증 시스템을 사용하여 15분 안에 Vue 앱을 만드는 방법 1편
date: 2018-10-20 12:56:34
categories:
  - Javascript
  - Vue
tags:
- vue
- vue.js
- tutorial
- Vue.component
- vue-cli
- vue init
- vue-cli 3.0
- vue create
- npm install
- npm run dev
thumbnail: https://tuhbm.github.io/images/vue-firebase/vue-firebase1.png
---

# Vue 2 + Firebase: Firebase 인증 시스템을 사용하여 15분 안에 Vue 앱을 만드는 방법 2편
![Vue & Firebase](https://tuhbm.github.io/images/vue-firebase/vue-firebase1.png)

이 튜토리얼에서는 Vue 2, vue-router 사용 그리고 Firebase의 인증 시스템을 사용하여,
웹 어플리케이션을 신속하게 구축하는 방법을 알아봅니다.

## Vue.js란 무엇인가?

다음은 놀랍고 가벼운 Javascript 프레임워크인 Vue.js의 개요입니다.

```text
Vue는 사용자 인터페이스 구축을 위한 진보적인 프레임워크입니다. Vue는 타 다른 프레임 워크와 다르게 점진적으로 채택 가능하도록 설계되었습니다. 핵심 라이브러리는 'View' 단에만 초점을 맞추고 있으며, 다른 라이브러리 또는 기존 프로젝트와 통합하기가 매우 쉽습니다.

vuejs 공식 문서: <https://vuejs.org/v2/guide>

```
<!-- more -->
## 왜 Vue.js인가?

Vue.js는 사용하기 쉽고 강력하며 문서화도 잘 되어 있습니다. 컴포넌트 중심의 새로운 자바스크립트 프레임워크 시대에 Vue는 단순함과 성능면에서 돋보여 졌습니다. 이러한 생태계(Vue.js의 환경)는 활기차며, 매일 점점 더 많은 사람들이 Vue로 전환한다.

Vue.js를 사용해야하는 이유에 대해 더 자세히 알고 싶다면, 다른 javascript 프레임 워크와 비교해보십시오 <https://vuejs.org/v2/guide/comparison.html>

## Firebase 란 무엇입니까?

```text
Firebase는 모바일 및 웹 응용 프로그램 개발 플랫폼입니다. Firebase는 개발자가 각각 필요에 맞게 보완하여 믹스 앤 매치 할 수 있는 기능으로 구성되어 있습니다. [...중간내용...] firebase의 초기 제품은 개발자가 여러 클라이언트에 데이터를 저장하고 동기화 할 수있는 API를 제공하는 실시간 데이터베이스였습니다. 그후 시간이 지남에 따라 웹과 앱등 여러 어플리케이션 개발을위한 제품군으로 확장되었습니다.

위키피디아: <https://en.wikipedia.org/wiki/Firebase>
```

간단히 말해, Firebase는 서버에 대한 프로그래밍 없이 애플리케이션을 개발할 수 있는 도구 모음입니다. 실시간 데이터베이스, 인증 시스템, 충돌보고, 분석등의 모바일/웹 앱에서 사용할 수있는 기타 서비스를 제공합니다. 이러한 도구들로 앱과 사용자에게 집중할 수 있습니다.

## 왜 Firebase인가?

인증이나 데이터베이스 스토리지 같은 최소한의 백엔드 요구 사항이 있는 애플리케이션의 경우, 다시 개발 할 필요가 없습니다. Firebase에서 대신해 훨씬 많은 도구를 제공합니다. 또한 확장, 서버 성능 및 데이터베이스 크기에 대해 신경 쓸 필요가 없습니다. Firebase는 모든 것을 자동으로 조정합니다.

## 시작

먼저, 훌륭한 도구 **Vue-cli**<https://github.com/vuejs/vue-cli>를 사용하여 새로운 Vue 프로젝트를 초기 구성 할 것입니다.

**Vue-cli**를 아직 설치하지 않았으면 설치하겠습니다.
```commandline
$ npm install -g vue-cli
```

이제 vue-cli를 설치했으므로 새 프로젝트를 생성하겠습니다. **vue-cli** 설명서에는 다음과 같은 내용이 나와 있습니다.
```commandline
$ vue init <template-name> <project-name>
```
만약 Vue-cli버전이 3.0이상이라면 아래와 같이 작성하세요. 
```commandline
$ vue create <project-name>
```
**Vue-cli**의 멋진 기능 중 하나는 다른 프로젝트 템플릿을 기반으로 프로젝트를 초기 구성 할 수 있으므로 가능한 한 빨리 코드를 작성할 수 있다는 것입니다. 
템플릿의 공식 목록은 여기를 참조하십시오. <https://github.com/vuejs-templates>


이 자습서에서는 *webpack* 템플릿을 사용합니다.(Vue-cli 버전이 3.0이라면 기본적으로 *webpack*을 사용합니다.)

webpack을 사용하는 새로운 Vue 프로젝트를 만들고, 프로젝트 이름을 'vue-firebase-tutorial'이라고 해봅시다.
```commandline
$ vue init webpack vue-firebase-tutorial
```
![vue init webpack vue-firebase-tutorial](https://tuhbm.github.io/images/vue-firebase/vue-firebase2.png)

Vue-cli 버전이 3.0 이상이라면

```commandline
$ vue create vue-firebase-tutorial
```
![vue create vue-firebase-tutorial](https://tuhbm.github.io/images/vue-firebase/vue-firebase3.jpg)
프로젝트를 생성하는 동안 몇 가지 옵션을 선택해야합니다. 이 튜토리얼에서는 *vue-router*를 사용할 예정이므로 반드시 설치하십시오.
다른 옵션은 원하는대로 수행하십시오. 나머지 튜토리얼에서는 별 문제가되지 않습니다.

그런 다음 새로운 vue-firebase-tutorial 디렉토리에 들어가서 *npm install*을 실행 한 다음 *npm run dev* 실행을 합니다.(Vue-cli 3.0이상에선 별도의 install이 필요없습니다.)

```commandline
$ cd vue-firebase-tutorial
$ npm install  //vue-cli 3.0이하에서만 실행
[...]
$ npm run dev
```
이제 만들어진 프로젝트를 브라우저에서 열어봅시다!
![기본 Vue project 화면 3.0버전은 조금 다릅니다.](https://tuhbm.github.io/images/vue-firebase/vue-firebase4.png)

### 앱 구조

앱 구조를 간단히 살펴보겠습니다.
![vue-cli 3.0이하의 구조](https://tuhbm.github.io/images/vue-firebase/vue-firebase5.jpg)
그리고
![vue-cli 3.0이상의 구조](https://tuhbm.github.io/images/vue-firebase/vue-firebase6.png)
약간의 차이라면 eslint의 설정파일이 package.json으로 포함되었습니다.

이 튜토리얼에서는 소스 코드가 *src/* 디렉토리 아래에 들어가 있다는 것을 알아야합니다.

각 디렉토리 및 파일에 대한 전체 개요를 보려면 여기에서 webpack 템플리트의 문서를 확인하십시오.<http://vuejs-templates.github.io/webpack/structure.html>

또한 이 튜토리얼을 진행하기 전에 Vue 파일의 구조를 아직 모르는 경우(예: src/components/Hello.vue) 이 내용을 살펴보시기 바랍니다.
<vue-loader.vuejs.org/en/start/spec.html>

*******
지금까지 vue-cli를 통한 프로젝트 생성 및 vue의 기본 이론에 대해 살펴보았습니다.
다음 포스팅에서는 vue-router 및 컴포넌트를 만들고 코드작성을 해보겠습니다.

*******
## 출처
해당 글은 [medium](https://medium.com/)에 [Anas Mammeri](https://medium.com/@anas.mammeri)의 [포스팅 글](https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c)을 번역한것입니다.
