---
title: 슈퍼클래스 와 서브클래스
date: 2018-03-11 13:30:13
categories:
  - 용어정리
tags:
  - superClass
  - subClass
  - inherit
  - 슈퍼클래스
  - 서브클래스
  - 클래스
  - 상속
  - 프로토타입
  - prototype
  - 객체
thumbnail: https://tuhbm.github.io/images/bnr-word.jpg
---
## 용어정리
이 카테고리는 비전공자로서 개발자로써 공부하며, 평소 이해하지 못한 단어를 제방식대로 정리하는 카테고리입니다.
제방식대로 풀어 쓴것이므로 오류가 있을 수 있습니다.
오류가 있을시 댓글로 남겨주시면 참고하도록 하겠습니다.
*****

# 슈퍼클래스(superClass)와 서브클래스(subClass)
슈퍼클래스와 서브클래스는 [상속](https://ko.wikipedia.org/wiki/%EC%83%81%EC%86%8D_(%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)에서 나오는 개념입니다.
원래 상속에 대한 개념은 고급언어 Java의 개념입니다.
자바스크립트에서는 상속의 대한 개념이 적용이 되지 않고, 상속 비슷하게 만드는 개념인 `prototype`이 있습니다.
<!-- more -->
예를 들어 살펴보겠습니다.
****`예제는 ES6를 바벨을 사용하여 ES5로 변환하여, 상속의 개념을 살펴보겠습니다.`****
```javascript
class animal {
    constructor(name){
      this.name = name;
    }
    move(number){
      console.log(`Move Move!!! ${number}M`);
    }
}

class dog extends animal {
	speak(sound){
      console.log(`${this.name} is speak ${sound}`);
    }
}

const Rocky = new dog('Rocky');
Rocky.move(5);
Rocky.speak('wal wal');
```
바벨(babel)을 이용하여 ES6문법을 ES6로 컴파일해보겠습니다.
```javascript
'use strict';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var animal = function () {
  function animal(name) {
    _classCallCheck(this, animal);
    this.name = name;
  }
  _createClass(animal, [{
    key: 'move',
    value: function move(number) {
      console.log('Move Move!!! ' + number + 'M');
    }
  }]);
  return animal;
}();
var dog = function (_animal) {
  _inherits(dog, _animal);
  function dog() {
    _classCallCheck(this, dog);
    return _possibleConstructorReturn(this, (dog.__proto__ || Object.getPrototypeOf(dog)).apply(this, arguments));
  }
  _createClass(dog, [{
    key: 'speak',
    value: function speak(sound) {
      console.log(this.name + ' is speak ' + sound);
    }
  }]);
  return dog;
}(animal);
var Rocky = new dog('Rocky');
Rocky.move(5);
Rocky.speak('wal wal');
```
내용이 매우 복잡해 자세히 설명드리기는 어려우겠으나, 처음나오는 4줄을 살펴보면
```javascript
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
```
*ES5의 prototype*을 이용한거라는 추측이 가능합니다.
이처럼 Javascript에서는 상속의 개념이 없습니다.

그럼 이번 주제인  `슈퍼클래스`와 `서브클래스`는 무엇일까요?
앞에 나왔던 ES6문법에선 클래스를 사용하였으므로 앞에 예제를 다시 살펴보죠.
```javascript
class animal {
  //...
}

class dog extends animal {
  //...
}

const Rocky = new dog('Rocky');
//...
```
`animal`의 클래스를 *extends*를 이용해 `dog`에 상속한 것을 볼 수 있습니다.
 이번예제에서는
`animal` - *상속을 해준 부모*를 `슈퍼클래스`,`부모클래스`라 하고
`dog` - *상속을 받은 자식*을 `서브클래스`,`자식클래스`라고 합니다.

**앞으로 천천히 상속에 대해 공부해가며, 상속에 대한 내용르 더 정리하는 시간을 갖도록 하겠습니다.**
