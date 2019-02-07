---
title: java 유효범위(scope)
date: 2018-06-24 21:08:55
categories:
  - JAVA
tags:
    - java
    - oop
    - 객체지향
    - 메소드
    - 클래스
    - 멤버변수
    - 유효범위
    - 스코프
    - scope
    - this
thumbnail: https://tuhbm.github.io/images/bnr-java.jpg
---
## JAVA
이 카테고리는 자바를 공부 하며, 익힌 내용을 기록합니다.
책을 보며, 또는 독학을 하므로 `잘못된 내용이 있으면 댓글 또는 메일주시면 신속히 오류처리하겠습니다.`
*****

# 유효범위(scope)
![Scope](https://tuhbm.github.io/images/java/img_scope.jpg)

## 이론
우리는 보통 여러명의 개발자들과 협업을 하며 개발을 진행합니다.
그렇기에 어떠한 것을 명명할때, 같은 이름으로 충돌이 발생 할 수 있습니다.
예를들어,
```java
int left;
public void left() {}
```
<!-- more -->

위의 경우와 같이 left는 왼쪽이라는 뜻으로 사용 할 수도있고, leave의 과거형 left으로 사용될 수 도 있습니다.
이와같은 경우는 흔히 매우 빈번히 발생하는 경우 입니다.
그렇기에 개발을 함에 있어, 에러등이 발생 할 수 있습니다.

자바역시 자바스크립트와 같이 `유효범위(scope)`가 존재하므로써 이러한 명명충돌을 방지할 수 있습니다.


**번외의 이야기만 사실 명명할때 사람이 보기 좋은 누가봐도 알 수 있을 만한 명명규칙을 고민해봅시다.**
예를들면, `getArticleInfo`와 같이 길어도 누가봐도 `기사정보를 가져오는 메소드구나!` 이러한 느낌이 들도록 명명규칙을 고민해봅시다.

명명규칙에서 길더라도 명확한게 좋습니다. 다만 보통 단어별로 대문자를 사용하는 카멜케이스를 사용합니다.(물론 케밥기법이라던지 다양한 종류가 있지만 필자는 카멜케이스를 선호합니다.)
다양한 방법은 [위키](https://zetawiki.com/wiki/%EC%B9%B4%EB%A9%9C%ED%91%9C%EA%B8%B0%EB%B2%95_camelCase,_%ED%8C%8C%EC%8A%A4%EC%B9%BC%ED%91%9C%EA%B8%B0%EB%B2%95_PascalCase)를 참고하세요.

다시 본론으로 들어가서
유효범위에 대해 다시 돌아가 보겠습니다.
```java
public class DemoScope {
   static void a () {
      int i = 0;
   }

   public static void main(String[] args) {
      for(int i = 0; i < 5; i++) {
         a();
         System.out.println(i);
      }
   }
}
```
결과를 예상해봅시다.

유효범위(Scope)를 제외하고 생각하면
for문이 돌아갈때 메소드 a가 실행되면 i=0 이 되므로 0이 무한으로 찍히는 경우가 발생합니다.
바로 무한루프가 발생합니다.

하지만 유효범위(Scope)라는 것이 존재하기에 이 코드는 0,1,2,3,4가 찍히고 종료됩니다.
유효범위(Scope)가 존재하기 때문입니다.
메소드에서 다른메소드의 지역변수(i)를 호출한다하더라도, 유효 범위의 우선순위는 `지역변수 그다음이 멤버변수`입니다.
또한 `메소드에서 다른 메소드의 지역변수의 값은 참조 할 수 없습니다.`
그렇기에 main메소드의 지역변수 i의 값은 0,1,2,3,4가 찍히게 되는것입니다.

다음예제를 보겠습니다.
```java
public class DemoScope {
    static int i;
    static void a() {
        i = 0;
    }
    public static void main(String[] args) {
        for(i = 0; i < 5; i++) {
            a();
            System.out.println(i);
        }
    }
}
```
이전 코드와 다른점은 `메소드a의 i`와 `for문에 i`가 모두 멤버변수의 값을 참조하고있습니다.
이코드를 실행시키면 어떻게 될까요?
0000000000000000000000이 무한하게 찍히는 무한루프에 빠집니다.

위에서 말씀드렸다시피 메소드에서 유효범위(Scope)의 우선순위는 `지역변수 다음 멤버변수`입니다.
하지만 이코드에서는 for문에서 i를 증가되어도 `System.out.println(i)`가 실행전 `메소드a`가 먼저 실행되기 때문에 i의 값은 계속 0이 되므로 무한루프에 빠지게 되는 것입니다.

무한루프를 빠져나오기 위해선 메소드 a의 i의 값을 지역변수로 선언해주면 말끔히 해결됩니다.
```java
static void a() {
    int i = 0;
}
```

이렇게 고쳐주면 메소드 a의 i의 값은 지역변수가 되므로 멤버변수의 i의 값에는 영향을 미치지 못합니다.
또한 main메소드에서는 i의 값을 멤버변수의 i의 값을 사용하는것입니다.

그렇다면 `지역변수가 존재하는 메소드에서는 멤버변수에 접근을 못하는것인가?`라는 의문을 가질 수 있습니다.
예제를 들어보겠습니다.

```java
class Demo {
    int v = 10;

    void m() {
        int v = 20;
        System.out.println(v);
    }
}

public class DemoScope2 {

    public static void main(String[] args) {
        Demo c1 = new Demo();
        c1.m();
    }

}
```
결과를 예측해보세요.

결과는 20이 출력됩니다. 
그렇다면 우리가 원하는 멤버변수의 값인 10이 나오게하려면 어떻게 해야할까요?
이럴때 사용하는 키워드가 바로 `this`입니다.
```java
void m() {
    int v = 20;
    System.out.println(this.v);
}
```
이렇게 `this`를 사용하면 결과 값은 10이 나옵니다.
this는 현재 실행된 메소드의 부모를 나타내므로 클래스Demo를 가르키게 됩니다.

이상으로 유효범위에 대해 알아보았습니다.