---
title: emmet1탄
date: 2017-07-17 15:21:35
categories:  
- 공부
- HTML
tags:
- emmet
- html
thumbnail: https://tuhbm.github.io/images/bnr-html.jpg
---
오늘은 많이 사용하는 **Emmet**을 알아보겠습니다.
많이 사용하시는 에디트플러스에서는 zen coding으로 표현하고있습니다.
이러한 Emmet에 명령어에 대해 정리해보겠습니다.
일반 에디트에서는 Emmet의 기능이 없어서 플러그인을 설치해야 사용이 가능하다는점!!!
<!-- more -->
## Emmet명령어 1단 html편

    + : 형제 생성
    ex:)header+main+footer
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img1.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img1-1.png)

    {} : 텍스트추가
    ex:) div{테스트입니다}
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img2.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img2-1.png)



    > : 자식 생성
    ex:)div>ul>li
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img3.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img3-1.png)

    * : 갯수
    ex:) a*3
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img4.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img4-1.png)

    ^ : 등반 생성(자식에서 상위로 올라가는 등반)
    ex:) header>p^main
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img5.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img5-1.png)

    () : 등반선택이 어렵다면 사용가능
ex:) header>(ul>li>a)+main
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img6.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img6-1.png)

    [속성=“속성값”] : 속성삽입
    ex:) div>a[href="http://tuhbm.tistory.com/"]
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img7.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img7-1.png)

    $ : 연속되는 숫자
    ex:) ul>li.item$
-호출전
![Emmet](https://tuhbm.github.io/images/emmet/img8.png)

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img8-1.png)


    금일 포스팅한것들 통합연습
    예제:)
    header#header>a.logo[href=“http://tuhbm.tistory.com”]+div.util_wrap>ul>li.item$*2>a^^^^^main+footer와
    header#header>(a.logo[href=“http://tuhbm.tistory.com”]+div.util_wrap>ul>li.item#*2>a)+main+footer 같음

-호출후
![Emmet](https://tuhbm.github.io/images/emmet/img9.png)

