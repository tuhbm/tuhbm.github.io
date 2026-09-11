# 작업 로그 (Claude 세션 인수인계용)

새 항목을 맨 위에 추가한다. 형식: 날짜 / PC / 한 일 / 다음에 할 일.

---

## 2026-09-11 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: metroPresaleRecord(경제·수도권 분양가 ㎡당 1505만원), saudiFertilizerOrder(경제·삼성E&A 사우디 4.7조 비료플랜트), cesareanRate(사회·제왕절개율 67.4%), univMergerVote(사회·충남대·공주대 통합 무산), ecbRateHike(국제·ECB 금리 인상과 유럽 국채금리 최고치), trumpDividend(국제·트럼프 5000달러 현금 공약), metaverseStrike(IT과학·네이버제트 첫 파업), microplasticSouth(IT과학·미세플라스틱 96%가 개발도상국), aiMusicCopyright(생활문화·AI 음원 저작권 규정 철회), holdbackStall(연예·홀드백 자율협약 표류).
  - 제외한 주제: 후티의 홍해 모카 점령은 9/10 사우디 원유수출 글과 하루 차이라 제외. 지방은행 점포 축소는 9/9 ATM 글과, 민음사빵 팬덤 굿즈는 9/8 글과 겹쳐 제외.
  - **새 태그 규칙 첫 적용**. 글당 3.0개(이전 4~6개), 30개 중 12개 재사용. 새로 만든 18개(분양가·해외수주·중동·석유화학·출산·대학·교육부·지역소멸·미국선거·재정·메타버스·파업·네이버·플라스틱·해양오염·저작권·음악·영화)는 모두 재등장할 일반명사이고 1회성 고유명사는 0개.
  - **태그 통계 정정**: 9/10에 보고한 "태그 694개 중 480개(69%) 1편짜리"는 grep -A8이 keywords 블록까지 함께 센 잘못된 값이었다. tags 블록만 파싱한 정확한 값은 **661개 중 595개(90.0%)**. 실제 상황은 보고보다 나빴다. 앞으로 태그 분포는 front-matter의 tags 블록만 파싱해 잴 것.
  - 이미지 10장 v5 기준 제작·전량 검수. 보완 5장: 분양가(화살표와 중복되는 금색 원 배지가 허공에 떠 보여 제거), 사우디(비료를 물방울 모양으로 그려 식별 불가 → 비료 포대로 교체, 연기가 부제에 근접 → 하향), 대학통합(학부생 라벨이 부제에 근접 → 하향, 투표용지 동그라미가 "반" 글자 침범 → 축소·이동), 미세플라스틱(비구름이 부제 침범 → 하향해 육지 위로, 바다가 언덕처럼 보여 넓고 낮게 재설계), AI음악(음표 깃발이 부제에 근접 → 하향).
  - 빌드 검증: 에러 0, 볼드 아티팩트 0, public/2026/09/11 10편, 글 페이지 태그 링크 3개(구조 개선 유지), 글 noindex 0건, canonical 정상, GA4 정상.
- 다음에 할 일: 9/10 구조 수정(태그 위젯 제거·태그 noindex)의 효과를 며칠 뒤 색인 보고서에서 확인 — "크롤링됨-현재 색인이 생성되지 않음" 건수 감소와 글 URL 색인 여부가 판단 기준.

## 2026-09-10 (Windows PC) — 색인 문제 실제 원인 규명 + 사이트 구조 수정

- 한 일:
  - **2주간 쫓던 사이트맵은 원인이 아니었음이 확인됨.** 서치콘솔 색인 보고서(페이지 > 크롤링됨-현재 색인이 생성되지 않음 > 유효성 검사 세부정보)에 `https://tuhbm.github.io/sitemap.xml`의 **최종 크롤링이 2026-09-04**로 찍혀 있었다. 사이트맵 보고서의 "마지막으로 읽은 날짜 2024.10.21"은 실제와 다른 낡은 표시였다. 같은 화면에서 실제 글(2026/09/03/exoTicketCrackdown/)도 09-03에 크롤링됨 확인. URL 검사 실시간 테스트도 "페이지 가져오기 성공".
  - **진짜 원인: "크롤링됨 - 현재 색인이 생성되지 않음"**. 구글이 가져가서 읽고 색인 가치가 없다고 판단한 상태. 접근·robots·DNS·속성주소 전부 무혐의(호스트 상태 모두 정상, 속성은 https 접두어로 올바름).
  - 구조 진단 수치: 글 212편 vs **태그 아카이브 931개**(전체 URL의 81%). 태그 694개 중 **480개(69%)가 글 1편짜리**. 그리고 사이드바에 tag+tagcloud 위젯이 둘 다 켜져 있어 **모든 페이지가 태그 링크를 960개씩** 달고 있었다. 앞서 검색 색인에 잡힌 것이 정확히 태그 페이지들뿐이었던 것과 일치 — 크롤 예산이 글이 아니라 얇은 태그 아카이브로 새고 있었다.
  - **조치 1**: `themes/landscape/_config.yml`에서 tag·tagcloud 위젯 제거(category·recent_posts·archive만 유지). 글 페이지 태그 링크 960개 → 5개.
  - **조치 2**: `head.ejs`에 `is_tag()`일 때 `<meta name="robots" content="noindex,follow">` 추가. 빌드 결과 head에 실제 noindex가 붙은 페이지 931개 = 전부 태그 페이지. 글·카테고리·홈은 0건.
  - **조치 3**: daily-blog 스킬의 태그 규칙을 4~6개 → **3~4개 + 기존 태그 재사용**으로 변경하고, 1회성 고유명사(인물·기업·제품명)를 태그로 만들지 않도록 명시. 같은 규칙을 CLAUDE.md에도 적어 맥북 세션에서도 적용되게 했다(스킬 파일은 각 PC 로컬에만 있으므로).
  - 검수 중 오탐 1건: 2018/2019년 SEO 설명 글(seo1, seo2) 본문에 `content="noindex` 문자열이 예시로 들어 있어 grep에 잡혔으나, head에는 robots 메타 0건으로 실제 영향 없음.
- 주의: 지금까지 색인돼 있던 것이 태그 페이지들뿐이었으므로, noindex 반영 후 색인된 페이지 수가 일시적으로 크게 줄어 보일 수 있다. 의도한 결과다.
- 다음에 할 일: 며칠~2주 뒤 색인 보고서에서 "크롤링됨-미색인" 건수가 줄고 글 URL이 색인되기 시작하는지 확인. 변화가 없으면 발행량(하루 10편)과 내부 링크 구조를 다음 후보로 검토.

## 2026-09-10 (Windows PC) — 추가 작업: 서치콘솔 사이트맵 진단 + canonical/description 수정

- 한 일:
  - **사이트맵이 서치콘솔에서 계속 안 읽히는 문제 진단**. 서버 쪽은 이상 없음을 확인(sitemap.xml/txt/robots.txt 모두 200, Googlebot UA로도 200·리다이렉트 0·23ms, 237 URL 전부 lastmod 보유, XML 정상 종료, noindex 0). 원인은 레포가 아니라 GSC 기록 쪽.
  - 진단 결론 2가지: ①**이미 목록에 있는 사이트맵 URL을 다시 "추가"해도 새 가져오기 요청이 되지 않는다** — 그래서 9/4 재제출 후에도 sitemap.xml 행이 2024.10.21 읽기 기록(유형 "Sitemap 색인")을 그대로 유지 중. 해결은 삭제 후 재등록. ②sitemap.txt은 배포(2026-09-04 10:33 KST) 직전/직후에 제출돼 404를 맞았을 가능성이 크고, 구글은 실패 시 며칠만 재시도 후 중단하므로 "가져올 수 없음"에 고착됨.
  - 배경: 2022~2024년 커밋 0건(3년 동면)으로 크롤 빈도가 붕괴. 검색 색인에는 홈+태그 페이지만 있고 글 URL은 없으며, 홈 제목이 옛 제목("코드머니 플레이북", 2025-10-21~2026-08-28 사용)으로 남아 있음.
  - 사용자 안내한 GSC 조치 순서: 사이트맵 2개 삭제 후 재등록 → URL 검사로 홈·최근 글 색인 생성 요청 → 보안 및 수동 조치 확인 → 크롤링 통계 확인 → 속성이 https 접두어인지 확인.
  - **canonical 태그 추가**(사용자 요청): landscape 테마 `head.ejs`에 없었음. `page.path`의 끝 `index.html`을 제거해 `full_url_for()`로 출력. 빌드 결과 index.html 1309개 전부에 삽입 확인(홈=루트, 글=퍼머링크, page/2, 카테고리, about 모두 정상).
  - **description 교체**(사용자 요청): `_config.yml`의 description이 옛 개발블로그 문구(오타 "점을을" 포함)로 남아 있어 현재 콘텐츠와 불일치했음. open_graph 헬퍼의 최종 폴백이라 홈·아카이브·카테고리 페이지에 노출됨. 새 문구로 교체했고 글 페이지는 각 글의 front-matter description을 그대로 사용(동작 확인). 옛 문구 잔존 0건.
- 다음에 할 일: 사용자가 GSC에서 사이트맵 삭제→재등록 후, 며칠 뒤 "마지막으로 읽은 날짜"가 갱신되는지 확인. 갱신되면 유형이 "Sitemap", 발견된 페이지 237로 바뀌어야 정상.

## 2026-09-10 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: nonCoveredCare(사회·병원 비급여 월 7499억), localLaborInspection(사회·지자체 근로감독 73년 만에 도입), tariffQuotaCheck(경제·할당관세 8305억 효과 추적 부실), constructionWinter(경제·건설수주 30.6% 급감), knowledgeCenterVacancy(경제·지식산업센터 공실 43.5% 공공임대 전환), saudiOilRoute(국제·사우디 원유수출 13년 최저), japanYouthAssetGap(국제·일본 20대 자산 지니계수 0.718), arcticQuakeLandslide(IT과학·얀마옌 산사태와 영구동토층 해빙), kpopCarbonNeutral(연예·K팝 저탄소 공연 협의체 출범), broadcastPlan30T(생활문화·K-방송영상 30조 중장기계획).
  - 제외한 주제: 국제유가 100달러 돌파는 9/8 usGasPrice와 결이 겹쳐 뺐고(대신 사우디 수출량·홍해 항로라는 공급망 각도로 채택), 8월 고용동향은 9/8 manufacturingJobs와, 국민연금 추납 급증은 8/31 연금 추납 글과 겹쳐 제외. 권혁빈 재산분할 판결은 금액이 크지만 개인 사생활 성격이 강해 제외.
  - 이미지 10장 v5 기준 제작·전량 검수. 보완 7장: K팝(응원봉 전구가 부제 글씨 침범 → 축소·하향), 할당관세(과일이 상자 위에 붕 떠 보임 → 상자 윗면에 안착), 건설(막대와 화살표가 겹쳐 온도계처럼 보임 → 두 막대 비교형으로 재설계, 이후 건물과 붙어 다시 오른쪽 이동), 사우디(바다 띠의 직선 경계가 사각형 얼룩으로 보임 → 제거, '홍해' 글자를 금지 사선이 가림 → 라벨을 원 밖 pill로 분리), 일본(구분선·라벨이 두 좌대 중앙에서 어긋남 → x 700→768), 산사태(온도계가 토사를 가림 → 우측 이동), 방송영상(30 배지가 모니터 베젤을 가림 → 좌측 이동).
  - 빌드 검증: 에러 0, 볼드 아티팩트 0, public/2026/09/10 10편 생성, GA4 태그 정상.
- 다음에 할 일: 없음.

## 2026-09-09 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: youthDrinkShift(경제·20대 주점 결제 3년 새 52% 감소), bankAtmDecline(경제·은행 ATM 4610개 감소), japanBondReturn(경제·일본 10년물 3% 돌파와 자금 회귀 논쟁), obesityDrugSmuggle(사회·비만치료제 불법반입 3.9배), seoulSafetyBell(사회·안심벨 신고 95%가 오신고), ukAtcOutage(국제·영국 관제 오류 1000편 결항), israelSettlementSanction(국제·영프캐 정착촌 물품 수입금지), openaiNavierStokes(IT과학·오픈AI 나비에-스토크스 해법 주장과 연구 활용 의혹), midlifeConcertBoom(생활문화·중장년 팬덤이 바꾼 공연시장), gyeongbokPalaceFee(생활문화·경복궁 관람료 21년 만의 인상 논의).
  - **사용자 추가 요청: "요즘 트렌드" 글 포함** → 소비·문화 트렌드 3편을 의도적으로 배치했다(20대 소비 이동, 비만치료제 해외구매 확산, 중장년 공연 팬덤). 앞으로 트렌드 요청이 있으면 통계·카드결제 데이터 기반 기사를 우선 찾는다(NH트렌드+, KB국민카드, KOPIS 등).
  - 오늘은 연예 카테고리를 넣지 않았다. 9/7 아이유 컴백 글이 있어 가수 컴백 기사가 7일 내 중복이었고, 나머지 연예 이슈는 개인 신상 성격이라 제외 기준에 걸렸다. 대신 생활문화 2편으로 채웠다.
  - 유가 이슈(국제유가 100달러 육박)는 9/8 usGasPrice와 결이 겹쳐 제외. 8월 고용동향도 9/8 manufacturingJobs와 겹쳐 제외.
  - 이미지 10장 v5 기준 제작·전량 검수. 보완 7장: 20대소비(골드 화살표가 덤벨에 완전히 가림 + 원판 하이라이트가 눈처럼 보임 + 마이크가 원판과 겹침), 비만약(세관 도장이 주사펜을 덮음 → 우측·위로 이동), 안심벨(스트랩 고리가 부제와 닿음 → 아래로), 영국관제(관제탑 경광등이 부제 침범 → 아래로), 이스라엘(금지 도장이 컨테이너를 가리고 대비가 낮음 → 우측 이동·색 강화), 오픈AI(수식이 정보카드에 잘림 → 중앙 높이로 이동), 경복궁(티켓 '입장권' 글자가 노치에 잘림 → 분할선·글자 위치 조정).
  - 빌드 검증: 에러 0, 볼드 아티팩트 0, public/2026/09/09 10편 생성, GA4 태그 정상.
- 다음에 할 일: 없음.

## 2026-09-08 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: tvingDataLeak(경제·티빙 3954만 계정 유출 보상), mortgageDelinquency(경제·주담대 연체 120% 급증), npsSinStocks(사회·국민연금 죄악주 8조), manufacturingJobs(사회·제조업 고용 15개월 만 반등), chinaJapanChip(국제·中 日반도체 소재 반덤핑 99%), usGasPrice(국제·미 기름값 역대 최고), appleWatch12(IT과학·애플워치12 유출), solarStormToyosat(IT과학·태양폭풍 도요샛 300m 하강), minumsaBread(생활문화·민음사빵 품절 대란), fourHandsDrama(연예·tvN 포핸즈 6.2%).
  - 이미지 10장 v5 기준 제작·전량 검수. 보완 4장(주담대 +120% 라벨 부제 겹침, 중일편 99% 배지가 국기 가림, 미유가 화살표 부제 침범, 애플워치 밴드 잘림).
  - **resvg 한글 렌더 이슈**: 부제에 쓴 "기록"의 종성이 깨져 렌더됨. 문구를 바꿔 회피했다. 부제에서 특정 음절이 깨지면 문구 교체로 우회할 것.
- 다음에 할 일: 없음.

## 2026-09-07 (Windows PC)

- 한 일:
  - git pull 선행(변경 없음) 후 오늘의 이슈 10편 작성·배포: bundangPriceSurge(경제·분당 29.5% 급등), bankHiringFreeze(경제·은행 신입채용 18.5% 감소), genderPayGap(사회·성별 임금격차 첫 10%대), factCheckShortage(사회·팩트체크 인증기관 2곳), germanyAfdWin(국제·독일 AfD 44.6% 압승), hormuzKoreaPressure(국제·호르무즈 기여 압박), nuriho5thLaunch(IT과학·누리호 5차 D-30), ifa2026Energy(IT과학·IFA 에너지효율 경쟁), leeChangdongVenice(생활문화·이창동 신작 베네치아), iuComeback(연예·아이유 신곡).
  - 이미지 10장 v5 기준 제작·전량 검수. 보완 2장(베네치아 사자 트로피가 동물로 오독→황금 필름 릴로 교체, LP가 구체로 보임→납작한 레코드판 재설계).
  - **구글 애널리틱스 GA4 연결(사용자 요청)**: landscape 테마의 google-analytics.ejs가 서비스 종료된 Universal Analytics(analytics.js) 코드여서 GA4 측정 ID로는 동작 불가 → gtag.js 스니펫으로 교체하고 themes/landscape/_config.yml에 측정 ID 설정. 빌드 결과 전 페이지 head에 삽입 확인, 구 UA 코드 잔존 0건.
- 다음에 할 일: 없음.

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
