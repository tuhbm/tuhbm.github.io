---
title: Typescript - 접근 제한자
categories:
  - Javascript
  - Typescript
tags:
  - access
  - public
  - private
  - protected
thumbnail: https://tuhbm.github.io/images/bnr-ts.jpg
date: 2019-02-27 21:37:30
---

# [Typescript] - 접근제한자
![접근제한자](https://tuhbm.github.io/images/typescript/accessModifier.png)

### 개요
public, private, protected의 접근 제한자는 `Typescript` 공부를 진행하면서, `Java`에서 사용하던것은 알겠는데 정확히 무엇인지 인지하지 못해 정리를 하게되었습니다. 많이 보았지만 각각의 제한자는 어떤 범위까지 제한하는지 정리해보겠습니다.

우선 `ES6`에서부터 `class`를 통한 객체화가 가능해졌습니다. 그렇기에 `상속`도 가능해졌습니다.

하지만 `Javascript`의 상위 개념인 `Typescript`는 기존 Java와 같이 interface등을 통해 더욱 객체지향프로그래밍에 가까워 졌습니다. 또한 `public`,` private`,` protected`등 접근 제한자도 사용이 가능합니다.



## Public

*public*은 영어단어 뜻은 `공공의`, `대중의`입니다. 단어처럼 접근 제한이 따로 없습니다. `상속도 가능`하고,` 외부 객체를 통한 접근도 가능`합니다.

예제를 보겠습니다.
<!-- more -->
```typescript
class Base {
	public defaultAge = 30;
}

class Member extends Base {
	age = 1;
	
	public getAge() {
    	return this.age + this.defaultAge;
	}
}

let member = new Member();
console.log(member.getAge()); // 31
```
위 코드를 보면 `부모클래스(Base)`에서 `자식클래스(Member)`로 *상속이 가능*하고, 또한 멤버변수인 `member`에서 실행 했을때도 접근이 가능하여 `31`이 출력됩니다.

이처럼 public은 *상속, 외부객체를 통한 접근 모두 가능*합니다.



## protected

*protected*도 영어뜻은 `보호받은`입니다. 단어대로 보면 무언가 보호를 받는것 같습니다. *protected*는 *public*처럼 `상속은 가능`합니다. 하지만 `외부객체에서의 접근이 허용되지 않습니다.` 

예제를 살펴보겠습니다.

```typescript
class Base {
	protected birthYear = '1989';
}

class Member extends Base {
	protected getBirthYear() {
    	return this.birthYear
	}
}

let member = new Member();
member.getBirthYear(); // Property 'getBirthYear' is protected and only accessible within class 'Member' and its subclasses.
```

위 코드를 보면 `부모클래스(Base)`에서 `자식클래스(Member)`로 *상속이 가능*하지만, 멤버변수인 `member`에서는 사용 할 수 없음을 알 수 있습니다.

이처럼 protected은 *상속은 가능하지만, 외부객체를 통한 접근은 불가능*합니다.



 ## private

*private*의 영어뜻은 `사유의`를 뜻을 가지고 있습니다. 사유재산같은 뭔가 공도으로 사용이 어려워보입니다. *private*은 상속도 불가능하고, 외부 객체에서의 접근도 불가능합니다.

예제를 살펴보겠습니다.

 ```typescript
class Base {
	private birthYear = '1989';
}

class Member extends Base {
	private age = 0;

	private getBirthYear() {
    	return this.birthYear; // Property 'birthYear' is private and only accessible within class 'Base'.
	}
	
	private getAge() {
    	return this.age;
	}
}

let member = new Member();
member.age(); // Property 'age' is private and only accessible within class 'Member'.
member.getAge(); // Property 'getAge' is private and only accessible within class 'Member'.
 ```

위 코드를 보면 `부모클래스(Base)`에서 `자식클래스(Member)`로 *상속도 불가능하고*, 멤버변수인 `member`에서는 사용 할 수 없음을 알 수 있습니다.

`private`는 상속도 불가능하고, 외부 멤버변수로의 접근도 불가능합니다.



## 정리

정리를 해보면 다음 표처럼 정리가 가능합니다.

|   접근제한자   |                    특징                    | 상속여부 | 외부 객체에서의 접근 |
| :-------: | :--------------------------------------: | :--: | :---------: |
|  public   | public으로 설정된 멤버(멤버변수, 멤버메서드)는 상속 및 접근 가능 |  가능  |     가능      |
| protected |     protected 설정된 멤버는 자식클래스에서 접근 가능      |  가능  |     불가능     |
|  private  |     private으로 설정된 멤버는 현재클래스에서만 접근 가능     | 불가능  |     불가능     |

이처럼 `접근 제한자`의 특징을 알아두고, 올바르게 사용하여 개발을 진행하시길 바랍니다.