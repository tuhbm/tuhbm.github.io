---
title: framework 와 library
date: 2017-07-17 13:55:55
categories: 
- 용어정리
tags:
- framework
- library
thumbnail: https://tuhbm.github.io/images/bnr-word.jpg
---

## 용어정리
이 카테고리는 비전공자로서 개발자로써 공부하며, 평소 이해하지 못한 단어를 제방식대로 정리하는 카테고리입니다.
제방식대로 풀어 쓴것이므로 오류가 있을 수 있습니다.
오류가 있을시 댓글로 남겨주시면 참고하도록 하겠습니다.

# 라이브러리와 프레임워크의 차이

초보개발자로써 나와같은 고민을 하고 있는 사람이 많을것이다.
세상에는 많은 용어들이 존재한다. 무역용어부터 개발용어까지.....
이러한 용어중 나는 개발자로써 개발 용어에 헷갈리는 것들을 나름 이해하기 쉽게 정리해보려한다.
<!-- more -->
개발용어에는 많은 것들이 존재한다. 그러나 도대체 이많은 용어들은 무엇인가....?
좀알았다 생각했으나..막상 설명하려면.....ㅂㄷㅂㄷ
도대체 어떻게 설명해야할까...?

이번 주제는 라이브러리(Library)와 프레임워크(Framework)이다
둘은 정말 많이 들어본 용어들이다. 하지만 그만큼 무지 헷갈린다.

![Bang!!](https://tuhbm.github.io/images/bang.png)

# 라이브러리(Library)란 무엇인가?

간단히 설명하면 대표적인 예로 가장 유명한 javascript의 라이브러리인 jQuery와 React가 있다.
이러한 라이브러리는 내가 그냥 가져다 사용 할 수 있는 모듈이며 수정이 용이하다. 그렇게 때문에 내가 라이브러리를 가져다 쓴다고 생각 할 수 있다. 이러한 라이브러리를 어떤것을 사용해야 하는지 정해진것은없다.

표현하자면 톱이나 망치 같은 **공구**들이라고 보면 될것이다.
땅을 팔때 톱을 이용해도 되고, 망치로 땅을 파도 무방하다. 다만 효율성의 차이일뿐...
"그냥 사용해서 만든다."라고 보면될것이다.

*****

# 프레임워크(FrameWork)는 무엇인가?

대표적인 예로는 현재 매우 핫한 Angular가 있다
프레임워크는 이미 정해진 명세, 규칙이기 때문에 수정이 어렵다. 소스코드를 짤때 이 규칙을 토대로 프레임워크를 사용하므로, 프레임워크가 명시한 대로 사용 할 수 있을 뿐이다. 그래서 내가 짠 소스코드는 프레임워크에 의존하여 동작하게 하게 된다.

이것 역시 표현하자면 자동차,배,비행기같은 **이용수단** 표현 할 수 있다.
라이브러리와 다르게 이용 수단이라고 보면 될것이다.
바다를 항해하기 위해선 배를 이용해야한다. 자동차를 이용해서 항해 할순 없지 않은가?
이처럼 사용용도가 정해져있고, 그것을 따라야 한다고 볼수있다.

*****

즉 라이브러리와 프레임워크의 차이는 흐름의 키를 누가 쥐고있느냐일것이다.
프레임워크는 전체적인 흐름을 스스로가 쥐고 있으며, 사용자는 그 안에서 필요한 코드를 짜 넣는다.
 
반면 라이브러리는 사용자가 전체적인 흐름을 만들며, 라이브러리를 가져다 쓰는 것이다.
라이브러리는 개별자가 만든 클래스에서 호출하여 사용하지만, 프레임워크는 반대로 프레임워크의 클래스가 개별자가 만든 클래스를 부른다.
