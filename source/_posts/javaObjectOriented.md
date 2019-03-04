---
title: 객체지향 언어 자바 이론
date: 2018-06-21 22:33:33
categories:
  - JAVA
tags:
    - java
    - oop
    - 객체지향
    - 메소드
    - 클래스
    - 멤버변수
    - 은닉화
    - 캡슐화
    - 인터페이스
thumbnail: https://tuhbm.github.io/images/bnr-java.jpg
---
## JAVA
이 카테고리는 자바를 공부 하며, 익힌 내용을 기록합니다.
책을 보며, 또는 독학을 하므로 `잘못된 내용이 있으면 댓글 또는 메일주시면 신속히 오류처리하겠습니다.`
*****


# 객체지향

![OOP](https://tuhbm.github.io/images/java/img_oop.png)

## 이론
하나의 결과물을 만들때, 필요한부분을 각각 개발하여, 하나로 사용하고, 또 필요한부분을 가져가 쓰는 방법이 객체지향프로그래밍입니다.

예를 들어보겠습니다.
초창기 컴퓨터는 하나의 기계였습니다..
그림으로 살펴보겠습니다..
<!-- more -->
![옛날컴퓨터](https://tuhbm.github.io/images/java/img_oldcomputer.jpg)

이처럼 각 모니터(출력장치)와 본체(저장 및 연산장치) 키보드(입력장치)가 모두 하나로 연결되어있습니다.
그렇기에 각각 하나의 부분이 고장난다고하면, 전체 수리를 맡기거나 교체를 해야 합니다.

![현대시대의 컴퓨터](https://tuhbm.github.io/images/java/img_computer.jpg)
그렇기에 현대의 컴퓨터는 각각 필요한 부분을 **부품화**하여, **조합**하여 사용하는 방법으로 사용하고 있습니다.
이러한 방식으로 부품화하여, 필요에 의해 부품을 가져다 쓰는방법입니다.
예를 들면 필요에 의해 모니터를 두개사용하는 듀얼모니터 등을 예로 들 수 있습니다.

앞서 컴퓨터를 예로 들어본것처럼
`저장매체(아는것) + 출력&입력등(하는것)`을 하나로 묶은 객체를 `부품화`하여,
각각 조합하여 사용하는 방법을 `객체지향프로그래밍`이라고 이해하면 될 것 같습니다.

## 클래스
`멤버변수(아는것)`와 `메소드(하는것)`를 둘중 하나를 꼭 포함한 하나의 부품

## 멤버변수(아는것)
- 변수로 상태(아는것) 또는 값을 저장

## 메소드
- 기능부분(하는일)
- 공통부분을 하나의 기능별로 정리

## 은닉화,캡슐화
부품을 사용할때, 단순 그룹핑하여 객체화 하였다고, 끝이 아닙니다.
정작 사용하는데 있어서, 전문지식이 없이도 어떠한 정보만으로 만들 수 있도록 해야합니다.
어떻게 동작하는지 정확히 알지못하는 사람도 사용할 수 있도록 만들어야 합니다.
예를 들면 모니터가 어떻게 작동하는지에 대한 원리는 우리는 알지 못합니다.
하지만 HDMI케이블 또는 DVI케이블을 사용하여, 본체와 연결하면 제대로 작동시킬 줄 아는것처럼
`동작 방법을 클래스 안에 숨기고, 사용방법만을 노출하는 방식`을 `은닉화, 캡슐화`라고 합니다.

## 인터페이스
부품과 부품사이 연결을 통하여, 부품끼리의 정보교환을 통해 연산 또는 출력 등의 작업이 이루어집니다.
예를 들면, 본체와 모니터를 연결하는 HDMI의 연결선은 `규격화` 되어있어, 어떠한 모니터를 변경하여도 정상적으로 연결이 가능합니다.

이러한 규격화되어있는 HDMI와 같은 연결선을 `인터페이스`라고 합니다.
부품끼리 서로 규격에 맞지 않는 부분이 있는데 연결하려 하면, 연결이 안됩니다.
사전에 맞지 않는 부분을 차단하는 역할을 한다고 할 수 있습니다.