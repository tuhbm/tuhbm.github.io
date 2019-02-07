---
title: Image Compressor
tags:
  - image
  - rendering
  - image optimization
  - compressor
  - image compressor
categories:
  - ETC
date: 2017-08-16 16:17:26
thumbnail: https://tuhbm.github.io/images/bnr-etc.jpg
---

# 이미지 압축
지난번 랜더링 포스팅에 있어 **클라이언트가 서버에 요청을 줄이는 것이 가장 효율적인 렌더링을 하는 방법**이라는 것을 포스팅했습니다.
[지난포스팅 1편 다시보기](https://tuhbm.github.io/2017/08/10/rendering1/)
[지난포스팅 2편 다시보기](https://tuhbm.github.io/2017/08/14/rendering2/)

랜더링에 있어 요청을 줄이는 것 만큼 중요한것이 있다.
바로 

#### 이미지
<!-- more -->
우리가 입력한 코드들은 문자이므로 코드용량 굉장히 작은 크기이다.
하지만 이미지는 굉장히 다양하게도 큰용량을 차지한다.
많은 컬러 또 크기에 따라 용량차이는 천차만별이다.

이러한 이미지는 랜더링에도 굉장히 많은 영향을 미친다.
그렇기때문에 많은 회사들에서는 요청을 줄이기위해 스트라이프 이미지를 만들고,[스트라이트만들기 웹사이트](http://sprite.asamaru.net/)
그 후에 압축을 한다.
압축!!! 압축은 말그래로 용량을 줄이는 것 입니다.
하지만 압축은 이미지를 손상시키지 않는 선에서 압축을 해야하는데요.
압축을 빌드툴을 이용해서 하는 방법도 있지만, 웹사이트를 통해 압축할 수 있습니다.
지금 부터 소개해드리겠습니다.

직접 예시를 들어 설명을 해보겠습니다.
오늘의 예제이미지 
![예시이미지](https://tuhbm.github.io/images/imageCompressor/ex-img.png)
가로 - 3720px
세로 - 2138px
용량 - 7.4MB의 이미지 파일입니다.
의 구글 지도 이미지 입니다.
*****
## 1번. [compressjpeg](http://compressjpeg.com/ko/)
![compressjpeg](https://tuhbm.github.io/images/imageCompressor/site-img1.png)
jpg파일과 png 그리고 pdf 및 밑에 보면 gif까지 압축할수 있는 사이트입니다.
실험을 통해 얼마나 압축이 되는지 확인해보겠습니다.
![이미지 압축1](https://tuhbm.github.io/images/imageCompressor/after-img1.png)
보는바와 같이 72% 압축으로 용량을 2.1MB로 줄였습니다.
보시는바와같이 파일이름에 -min.확장자명 이 자동으로 붙습니다.
이사이트는 최근까지 제가 가장 많이 사용하던 사이트입니다.
*****
## 2번. [iloveimg](http://www.iloveimg.com/ko) 
![iloveimg](https://tuhbm.github.io/images/imageCompressor/site-img2.png)
이미지를 압축 및 확장자 변환 및 사이즈 조절까지 가능한 사이트입니다.
실험을 통해 얼마나 압축이 되는지 확인해보겠습니다.
![이미지 압축2](https://tuhbm.github.io/images/imageCompressor/after-img2.png)
보는바와 같이 74% 압축으로 용량을 1.94MB로 줄였습니다.
보시는바와같이 파일이름에 -iloveimg-compressed.확장자명 이 자동으로 붙습니다.
*****
## 3번. [imagesmaller](http://www.imagesmaller.com/ko/)
![imagesmaller](https://tuhbm.github.io/images/imageCompressor/site-img3.png)
jpg파일과 png 그리고 pdf 및 밑에 보면 gif까지 압축할수 있는 사이트입니다.
실험을 통해 얼마나 압축이 되는지 확인해보겠습니다.
![이미지 압축3](https://tuhbm.github.io/images/imageCompressor/after-img3.png)
보는바와 같이 78.67% 압축으로 용량을 1.51MB로 줄였습니다.
파일이름에 자동으로 붙는 확장자명이 없습니다.
*****
## 4번. [compressor](https://compressor.io/)
![compressor](https://tuhbm.github.io/images/imageCompressor/site-img4.png)
jpg파일과 png 그리고 pdf 및 밑에 보면 gif까지 압축할수 있는 사이트입니다.
실험을 통해 얼마나 압축이 되는지 확인해보겠습니다.
![이미지 압축4](https://tuhbm.github.io/images/imageCompressor/after-img4.png)
보는바와 같이 78% 압축으로 용량을 1.63MB로 줄였습니다.
파일이름에 자동으로 -compressor.확장자명 이 붙습니다.
*****
## 5번. [tinypng](https://tinypng.com/)
![tinypng](https://tuhbm.github.io/images/imageCompressor/site-img5.png)
이름은 tinypng라 png 파일만 압축 할 수 있나 생각 할 수 있지만,
jpg도 가능합니다.
![이미지 압축5](https://tuhbm.github.io/images/imageCompressor/after-img5.png)
위 파일을 보면 아쉽게도 무료버전은 5MB까지만 지원이되고,
유료버전은 전부 다 지원이 됩니다.
하지만 방법이있죠!!!
다른 사이트에서 압축한 파일을 tinypng를 통해 재압축을하면 가능합니다.
개인적으로 tinypng가 완전 무료면 좋겠지만, 그렇지 않습니다.
tinypng는 최고의 압축률로 다른 사이트에서 압축한 이미지도 압축을 통해 용량을 확 줄여줍니다.
들리는 소문에 의하면 sk 플래닛의 11번가 사이트에서도 tinypng를 통해 압축을 한다고 들었습니다.
*****
# 마무리하며
제 포트폴리오사이트는 굉장히 이미지가 많고, 이미지의 용량이 매우 커서 렌더링 이슈가 굉장히 큰사이트였습니다.
하지만 이미지 용량을 줄이는 것만으로 7초정도의 렌더링시간을 2초정도 줄였습니다.
이처럼 이미지 압축을 통해서도 사용자에서 빠른 페이지를 제공 할 수 있습니다.