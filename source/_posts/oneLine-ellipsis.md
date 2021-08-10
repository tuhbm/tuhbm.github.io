---
title: 한줄말줄임
date: 2017-07-17 14:42:33
categories: 
- CSS

tags:
- CSS
- 한줄 말줄임
- ellipsis
thumbnail: https://tuhbm.github.io/images/bnr-css.jpg
---
데이터를 바인딩할, 예를 들어 게시판의 경우 정해둔 width값을 초과하는 데이터가 들어올수 있다.
이를 방지하기위해 한줄말줄임을 사용해야한다.
이러한 한줄 말줄임에 대해 포스팅을 해보겠다.

**- 적용시 알아두어야 할 것들**
 
**하나,**
문자열을 줄이는 대다수의 이유는 고정되고 제한된 공간을 유지하며 적절한 텍스트 표현을 하기 위한 것이기에 적용시에는 해당 영역의 width 가 고정폭인 조건이어야 합니다.
 
 <!-- more -->
**둘,**
ellipsis 사용시 CSS 지정 글꼴(Font)과 브라우저에 따라 표현되는 방식에 차이가 있습니다.
통상적으로 "..." 처럼 하단에 깔려야 하지만 대부분의 브라우저에서 중앙 "---" 영역에 노출됩니다. 
개인적으로 확인은 못했지만 "맑은 고딕"(웹폰트가 되겠지요?) 글꼴 사용시 대부분의 브라우저에서 우리가 원하는 결과를 얻을 수 있다고 합니다.
기본 글꼴(돋움,굴림 등)로 "..." 표시를 중앙(middle)영역이 아닌 하단(bottom)에 표시하고자 한다면 프로그램단에서 처리하는 것이 효율적입니다. 
 
 
**셋,**
적용시에는 아래 두 속성도 함께 넣어줍니다.
```css    
div#title{
    width:200px;
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis;  
}
 ```
**overflow:hidden;**
고정폭을 넘어가는 text를 숨기고

**white-space:nowrap;**
고정폭이라도 자동 줄바꿈이 되지 않도록 합니다.

**text-overflow:ellipsis;** 
고정폭을 넘을 경우 "..."를 붙여줍니다.
