---
title: scout앱 사용하여 sass컴파일하기
date: 2017-07-17 15:05:34
categories: 
- CSS
- SASS
tags:
- sass
- SCOUT
- compile
thumbnail: https://tuhbm.github.io/images/bnr-css.jpg
---
# SASS
먼저 `사스`에 대해 다들아시겠지만 설명 드리겠습니다.

**Sass (Syntactically Awesome Style Sheets : 문법적으로 멋진 스타일시트)**
라는 뜻입니다.

사스는 기본적으로 웹에서 구현되는 언어는 아닙니다.
그러므로 우리가 알고있는 스타일을 정의 해주는 언어인 CSS로 `컴파일` 해야 사용이 가능합니다.
<!-- more -->
**먼저 컴파일이란?**
원시 코드에서 목적 코드로 옮기는 과정을 컴파일이라고 합니다.

[컴파일 - 위키바로가기](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC)

Sass와 Less 등의 방법으로 스타일을 보다 간결하고 편하게 작업하도록 할 수 있습니다만,
최근 Less를 사용하는 곳은 줄어들고 Sass를 사용하는 곳이 많더군요.

그래서 이 포스팅에서는 Sass만 다루도록 하겠습니다.

Sass를 컴파일 하는방법은 여러가지입니다.

- 기본적으로 [ruby를 설치해서 cli를 통해 변환하는 방법](https://velopert.com/1712)

- [gulp or grunt or webpack 등의 빌드도구를 사용해서 컴파일하는방법](http://webclub.tistory.com/470)

- APP 또는 사이트를 이용하는 방법입니다.
본 포스팅에서는 APP을 이용하는 방법을 다루겠습니다.
APP에도 컴파일 가능한 방법이 여러가지 있습니다.

> [kolal 바로가기](http://koala-app.com/)
> [scout app 바로가기](http://scout-app.io/)
> [prepros 바로가기](https://prepros.io/)

위에 거론한 앱말고도 찾아보면 많은 앱들이 존재합니다.
하지만 유료 또는 운영체제의 문제가 발생할 수 있습니다.

그 중에 scout app을 사용하는 방법을 포스팅해보겠습니다.
![SCOUT](https://tuhbm.github.io/images/scout/img1.png)

강아지모양의 아이콘 앱입니다. 현재 무료로 운영체제별로 다운로드가 각각 존재하니, 운영체제별로 확인하셔서 다운로드 해주세요.
![SCOUT](https://tuhbm.github.io/images/scout/img2.png)


앱을 실행하면 

![SCOUT](https://tuhbm.github.io/images/scout/img3.png)

이런형태의 모습입니다. (개인신상문제로인해 현재 이용하고 있는 프로젝트명은 가렸습니다. 양해부탁드립니다.)

지금 이미지는 프로젝트를 추가했을때의 모습입니다.

Input Folder - sass 문서가 들어있는곳
Output Folder - css파일로 변환되어 들어갈곳

을 정해주고 
![SCOUT](https://tuhbm.github.io/images/scout/img4.png)

Development 체크후 `Expanded`를 셀렉트해주시면 일반적인 형태의 줄바꿈 형태로 컴파일되고, 확장자가 map 파일이 나옵니다.
`map`파일은 수정시 `sass`파일과 연결해주어 어디부분을 수정해야하는지 개발자도구에서 볼 수 있게 해주는데요.

현재 크롬 정식버전은 아니지만 크롬 연구버전에서 사용하게 해주면 알아서 map폴더를 인식해서 sass 파일을 알려줍니다.

아참 그리고 프로젝트 명에 플레이버튼을 클릭하면 watch 모드이므로,
변경시 알아서 컴파일 해주는 부분입니다.

주로 제가 사용하는방법은 Gulp를 사용하는 방법이지만, 빌드도구 접근이 어려우신 분들을 위한 포스팅
지금까지 App중에 scout app으로 컴파일하는 방법이었습니다.

참고
css를 sass로 변경해주는 사이트입니다. 기본적으로 거꾸로 하는것이라 정확하지는 않아 신뢰하시않으나, 혹시나 필요한분을 위해 공유드립니다.

[css를 sass로 변경해주는 사이트 바로가기](http://css2sass.herokuapp.com/)