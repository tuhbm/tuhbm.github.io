---
title: doctype이란 무엇인가?
date: 2017-08-21 17:03:11

categories:
- HTML
tags:
- DTD
- html
- html doctype
- doc
thumbnail: https://tuhbm.github.io/images/bnr-html.jpg
---

# doctype이란 무엇인가?

DOCTYPE이란 무엇인가. 흔히들 줄여말해 DTD라고 불리운다.
DTD는 Document Type Definition의 약자이다. 즉, 문서형식을 정의해주는 것이다.
HTML이 어떤 버전으로 작성되었는지 미리 선언해,웹브라우저가 내용을 올바로 표시할 수 있도록 해주는 것이 DTD입니다.
<!-- more -->
### Strict DTD(엄격)
- 가장 표준이 되는 DTD입니다.
- 확장된 어트리뷰트를 허용하지 않습니다.
- 배경색 , 글자색등의 일정한 조건에 따른 어트리뷰트(bgcolor 라던가 font태그의 color속성)을 인정하지 않습니다.
- mhtml(mobile html)에 최적

### Transitional DTD(호환)
- 일반적으로 가장 많이 쓰이는 DTD입니다.
- 확장된 어트리뷰트를 호환합니다.
- 각 브라우져에 따른 DTD를 호환합니다.
- Strict보다 로딩속도는 느립니다.
- Strict보다 표준안에 가깝지는 않습니다.

### Frameset DTD(복합)
- 프레임셋을 만들때 사용하는 DTD입니다.
- 확장 및 프레임에 사용가능한 모든 내용을 포함합니다.
- html 4.01 Frameset.dtd 와 동일합니다.


*****
**HTML4.01의 Strict DTD(엄격)**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```
엄격한 HTML4.01을 따르며, font와 같은 사용이 금지된 요소 등과 frameset 을 사용할 수 없습니다.


**HTML4.01의 Transitional DTD(호환)**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```
font와 같은 사용이 금지된 요소 등을 사용할 수 있으나, frameset 을 사용할 수 없습니다. 


**HTML4.01의 Frameset DTD**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```
Transitional과 같으며 frameset 을 사용할 수 있습니다. 
*****

**XHTML1.0의 Strict DTD(엄격)**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```
엄격한 XHTML1.0을 따르며, font와 같은 사용이 금지된 요소 등과 frameset 을 사용할 수 없습니다. 또한, XML의 문법 사용에 맞아야 합니다.


**XHTML1.0의 Transitional DTD(호환)**
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```
font와 같은 사용이 금지된 요소 등을 사용할 수 있으나, frameset 을 사용할 수 없습니다. 또한, XML의 문법 사용에 맞아야 합니다.


**XHTML1.0의 Frameset DTD**
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```
Transitional과 같으며 frameset 을 사용할 수 있습니다.  

*****
**XHTML1.1 DTD**
```html 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```
XHTML 1.0 Strict과 같으나, 루비(Ruby)와 같은 모듈의 사용을 할 수 있게 합니다. 

*****
**HTML5 DTD**
```html 
<!DOCTYPE html>
```
HTML5를 따릅니다.


**HTML과 XHTML의 차이**
![html vs xhtml](https://tuhbm.github.io/images/doctype/doctype.png)


**HTML DTD 종류의 선택**

과거에서 현재까지 4.01과 Transitional을 많이 사용했으며, 최근의 대부분은 xml과 호환이 되는 XHTML 1.0의 Transitional을 많이 사용합니다. 최근에는 HTML5는 하위를 지원하며, 간략해졌기에 편의상 HTML5의 DTD로 즐겨 사용합니다.  


**표준모드와 쿼크모드**

브라우저가 HTML문서를 처리를 할 경우, HTML DTD가 있으면 그에 맞는 W3C에서 정의한 방식에 따라 처리를 합니다. 이를 표준모드라고 하며, 그렇지 않은 경우를 쿼크모드라고 합니다.  
쿼크모드에서는 브라우저 회사마다 정의된 방식에 따르며, 그 결과에 차이를 보입니다. 대표적으로 박스모델에서 폭(width)과 높이(height)의 여백처리는 IE가 W3C의 표준과 달리 처리하기에 다른 결과를 보입니다. 
그러하기에 HTML DTD를 꼭 명시하여, 표준모드로 브러우저가 처리할 수 있게 해야 합니다. 
이것이 웹표준을 위한 첫 시작이라 봅니다.  