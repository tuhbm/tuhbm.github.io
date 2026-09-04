# 작업 로그 (Claude 세션 인수인계용)

새 항목을 맨 위에 추가한다. 형식: 날짜 / PC / 한 일 / 다음에 할 일.

---

## 2026-09-04 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: lhSplitPlan(경제·LH 조직 분리), stablecoinBanks(경제·글로벌 은행 스테이블코인, 한국 제외), seoulBusStrike(사회·서울 시내버스 9/16 총파업 예고), sejongMinistryMove(사회·법무부·성평등부 세종 이전), europeGasStorage(국제·EU 가스 저장 65%), koreaAgingForecast(국제·2060년 한국 최고령국), aiOutageGlobal(IT과학·챗GPT·클로드·그록 동시 장애), teslaCybercab(IT과학·사이버캡 출시), youthArtPass(생활문화·청년문화예술패스 쏠림), morenoKoreaCoach(스포츠·모레노 대표팀 감독 선임).
  - 이미지 10장 v5 기준 제작·전량 검수, 보완 5장(LH 분리선 화살표 오독→점선, 버스 피켓 겹침, 유럽 히터→라디에이터, 고령화 삼각형 부제 침범, 청년패스 중복 칩 제거). 빌드 볼드 아티팩트 0건.
  - 연예 대신 스포츠 채택(모레노 선임). 오디세이·BIFF는 7일 내 중복이라 제외.
  - **사이트맵 구조 전환(사용자 요청)**: 서치콘솔에서 sitemap.xml이 "발견된 페이지 0"으로 보이는 원인을 조사 → 2026-08-30 플러그인 중복 정리 때 평면(113 URL)에서 색인형으로 바뀐 것이 원인이었음(색인 파일 자체에는 URL이 0개, 실제 URL은 하위 4개 파일). `hexo-generator-seo-friendly-sitemap` 제거 → `hexo-generator-sitemap@^3` 설치, `_config.yml`에 tags:false·categories:true 지정. 최종 sitemap.xml 197 URL 단일 파일. CI가 `npm ci`를 쓰므로 package-lock.json 함께 커밋 필요.
  - 참고: 서치콘솔 "마지막으로 읽은 날짜 2024-10-21"은 2022~2024년 배포 0건(방치)으로 크롤 우선순위가 떨어진 탓 + 오늘 재제출분을 아직 안 읽은 상태.
- 다음에 할 일: 며칠 뒤 서치콘솔에서 sitemap.xml 재읽기 여부와 "발견된 페이지" 수치 확인.

## 2026-09-03 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: wonDollarLow(경제·환율 1350원대 연저점), basicPensionDebate(경제·기초연금 개편 논란), sepMockExam(사회·9월 모평 체감난도), honamFloodFarms(사회·호남 폭우 농가 피해), saudiNuclearDeal(국제·사우디 원자력협정), congoEbolaOutbreak(국제·에볼라 3천명), googleAdxRuling(IT과학·구글 애드엑스 분할 기각), broadcomAiEarnings(IT과학·브로드컴 실적), yesanMarketProject(생활문화·백종원 예산시장), exoTicketCrackdown(연예·엑소 부정예매 조치).
  - 이미지 10장 v5 기준 제작·전량 검수, 보완 2장(예산시장 그릇 위치·기초연금 텍스트 겹침). 빌드 검증 볼드 아티팩트 0건.
  - 전날 birthBudget2027 돼지저금통이 사용자 피드백 5회로 레퍼런스 형태 전면 교체된 건 반영됨(규칙 5 신설 포함).
- 다음에 할 일: 없음.

## 2026-09-02 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: augustCpiRebound(경제·8월 물가 3.1%), isaReformScrapped(경제·ISA 개편 백지화), financeUnionStrike(경제·금융노조 총파업 예고), birthBudget2027(사회·저출생 예산 6.1조), employInsuranceReform(사회·고용보험료율 인상), hormuzTankerAttack(국제·한국 유조선 피격), germanyRussiaDrone(국제·독일-러 드론 공작 사태), kakaoMembership(IT과학·카카오 통합 멤버십), biff2026Lineup(생활문화·부산국제영화제 라인업), leeSedolShow(연예·백수 이세돌 확정).
  - 이미지 10장 v5 기준으로 제작, 전량 육안 검수. 보완 2장(돼지저금통 귀·다리 노출, 유조선 선체 외곽선). 빌드 검증에서 볼드 아티팩트 1건(따옴표 볼드) 수정 후 0건 확인.
  - 전날(9/1) 사용자 요청으로 timCookFarewell 이미지를 배턴터치→키노트 무대 콘셉트로 교체 배포한 건 반영됨.
  - 사용자 피드백으로 birthBudget2027 돼지저금통 재수정: 코(주둥이)가 오른쪽·꼬리가 왼쪽에 뒤바뀌어 있던 것을 왼쪽 보는 방향으로 통일(코 왼쪽 앞 + 눈 + 꼬리 오른쪽 뒤) 후 재배포. 이후 연쇄 피드백으로 돼지를 레퍼런스 형태로 전면 교체: 둥근 일체형 몸통 + 잎사귀 귀 1개(그라데이션+안쪽 귀 디테일, 눈 위 -24° 기울임) + 왼쪽 뭉툭 주둥이 + 오른쪽 뾰족 꼬리 + 다리 2개. **새 규칙(CLAUDE.md 5번)**: 이미지 수정 재작업은 배포 전 사용자에게 이미지 확인받고 배포.
- 다음에 할 일: 없음.

## 2026-09-01 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: timCookFarewell(IT과학·팀 쿡 애플 CEO 은퇴), messiNationalRetire(스포츠·메시 대표팀 은퇴), augustExportRecord(경제·8월 수출 982억 달러), hyundaiWageDeal2026(경제·현대차 임단협 타결), tomorrowFuelPrice(경제·내일 기름값 사전공개), aiExposedJobs(사회·AI 고노출군 19.1%), insuranceFalseClaims(사회·건보 거짓청구 348억), xiPutinBishkek(국제·시진핑-푸틴 회담), koreanWarRemains(국제·6·25 유해 발굴 재개 추진), kiafFriezeSeoul(생활문화·키아프·프리즈 개막).
  - 이미지 10장을 처음부터 v5 기준(셰이딩·광택·소프트 셰도·식별 부품)으로 제작, 전량 육안 검수. 1차 검수에서 5장 보완(메시 공 패치·등번호 대비, 주유기 노즐 재배치, 중러 국기 겹침 해소, 헬멧 리벳·인식표 정리, 액자 그림 수정) 후 재검수 통과.
- 다음에 할 일: 없음.

## 2026-08-31 오후 (Windows PC)

- 한 일:
  - 사용자 피드백("전체적으로 이미지 디테일·퀄리티 낮음, 60점 수준")으로 **오늘자 10편 이미지 전량 재제작** — 히어로에 입체 셰이딩·광택·소프트 셰도·실물 부품 디테일 적용(85~90점 목표). 낚싯바늘·온타리오 지도·미-이란 국기 대치 등 식별성 재설계 포함.
  - **이미지 품질 기준 v5 확정**: CLAUDE.md 이미지 절에 필수 기준으로 명문화(플랫 단색 금지, 셰이딩·광택·셰도·식별 부품 3개·앰비언스). 2026-08-31자 10편이 레퍼런스. 양 PC 공통 적용.
- 다음에 할 일: 다음 글 작성 시 v5 기준으로 처음부터 생성(재작업 없이).

## 2026-08-31 오전 2차 (Windows PC)

- 한 일:
  - 오늘의 이슈 10편 작성·배포: suneungEssayDebate(사회·수능 서논술형), seoulBirthRebound(사회·서울 출생 반등), julyIndustryOutput(경제·7월 산업동향), kiaPv7Teaser(경제·기아 PV7), pensionChunapDebate(경제·연금 추납), usIranLarak(국제·미-이란 충돌), lakeOntarioRename(국제·온타리오호 개명), romanTelescopeLaunch(IT과학·로먼 망원경), iphoneKakaoPhishing(IT과학·카톡 위장 피싱), odysseyTenMillion(연예·오디세이 886만).
  - 이미지 10장: tools/svgcard/make.js + 수제 illust → svg2png, 전량 육안 검수(오디세이 돛단배 1회 수정). 볼드 아티팩트 1건(romanTelescope 따옴표 패턴) 수정 후 재빌드 0건 확인.
- 다음에 할 일: 없음.

## 2026-08-31 (Windows PC)

- 한 일:
  - git pull로 주말(맥북) 작업 수신·동기화. npm install로 의존성 정리(hexo-generator-sitemap 제거 반영).
  - CLAUDE.md에 Windows 저장소 경로(`C:\project\tuhbm.github.io`)와 카테고리 체계(코드/머니/브리핑) 명시 — 맥 세션의 미결 항목 처리.
  - Windows 쪽 daily-blog 스킬을 주말 변경사항과 정합: 0단계(pull+워크로그) 추가, svgcard 생성기 참조, 스포츠 분야 허용.
- 다음에 할 일: 없음(동기화 완료). 다음 글 작성 시 어느 PC든 이 로그부터 읽고 시작.

## 2026-08-30 (MacBook Pro)

- 한 일:
  - git pull 최신화 후 오늘의 이슈 10편 작성: cabinetReshuffle2026(사회·6개 부처 개각), samsungHomeLoan2026(경제·삼성 사내 주택대출), cheyKoreaJapanYouth2026(경제·최태원 한일 청년교류), nepalRescue2026(사회·네팔 실종자 수색 후속), buchaWarehouseStrike2026(국제·키이우 부차 드론 공습), haraldFarewell2026(국제·하랄 5세 별세), berlinRansomware2026(IT과학·베를린 랜섬웨어), aiPolicyRestart2026(IT과학·AI수석 이해민), lionsTakeLead2026(스포츠·삼성 선두 탈환 후속), artInSeries2026(생활문화·국립극장 아트 인 시리즈).
  - 대표 이미지 10장: tools/svgcard/make.js로 SVG 수제작 → svg2png 변환, 전량 육안 검수(부차 편 일러스트 1회 수정).
- 다음에 할 일: 푸시와 hexo generate/deploy는 사용자 확인 후 진행. Windows PC 로컬 경로 CLAUDE.md에 기록(미확인).

## 2026-08-29 (MacBook Pro)

- 한 일:
  - PC 간 작업 공유 체계 구축 — CLAUDE.md(작업 가이드, OS별 구성)와 이 로그 파일을 생성. gh-pages 최신 pull 완료.
  - 오늘의 이슈 10편 작성: warshJacksonHole2026(경제), seoulHousingShift2026(경제), weekendRain2026(사회), jejuMissingCase2026(사회), skHynixIndianaFab(IT과학), tancheonHousing2026(경제), iranBlockade2026(국제), marsCityDebate2026(IT과학), kboPennantRace2026(스포츠), chinaTeaTrend2026(생활문화).
  - 대표 이미지 10장을 제미나이 없이 SVG 수제작(사용자 결정) → tools/svgcard/make.js 생성기 신규 제작, tools/svg2png로 변환, 전량 육안 검수 완료.
- 다음에 할 일: hexo generate/deploy로 실제 배포(사용자 확인 필요). 다른 PC(Windows)의 로컬 경로를 CLAUDE.md에 기록.

## 2026-08-28 (Windows PC — 8/31에 보완 기록)

- 한 일:
  - 새 글 10편 작성·배포 — baseRate3percent, busFareHike2026, covidDebtRelief, minKyunghoonBreak, moduAiProject, nepalFlood2026, samsungBioRights, scalpingPenalty, weathercasterRuling, xiUsVisit2026. 이미지는 v4 포스터 템플릿(SVG 수제작)으로 확정, 사용자 승인.
  - 카테고리 전면 재편(102편): 최상위 코드/머니/브리핑 3개로 통합, 사이드바 순서 코드→머니→브리핑 고정(`themes/landscape/layout/_widget/category.ejs` 커스텀).
  - 블로그 제목 "코드머니 플레이북" → **"코드머니 브리핑"** 변경(사이트·이미지 푸터·Disqus 사이트명), 태그 클라우드 상위 200개 제한.
- 다음에 할 일: (완료됨)
