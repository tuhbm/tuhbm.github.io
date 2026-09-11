# 블로그 작업 가이드 (Claude용)

이 저장소는 Hexo 기반 블로그 "코드머니 브리핑"(https://tuhbm.github.io)이다.
사용자는 **macOS(맥북)와 Windows PC 두 대**를 오가며 작업한다. 클로드에 대한 지시·규칙·진행상황은 이 저장소 안의 파일(CLAUDE.md, CLAUDE-WORKLOG.md)로 공유한다.

**먼저 현재 실행 중인 운영체제를 확인하고, 아래 공통 규칙 + 해당 OS 섹션만 따른다.**

## 핵심 규칙 (사용자 지정, 2026-08-31 — 어떤 세션이든 반드시 준수)

1. **"오늘의 글 작성" 전 반드시 `git pull`로 코드 최신화** 후 진행한다 (다른 PC 작업분 수신).
2. **이미지 퀄리티는 85~90점 수준(v5 기준)을 유지**한다 — 아래 "히어로(illust) 품질 기준 — v5" 참조. 플랫 단색 수준(60점)으로 회귀 금지.
3. **규칙이 추가되면 이 CLAUDE.md에 추가하고 git에 함께 푸시**한다 — 다른 PC에서도 같은 조건으로 작업할 수 있게 하기 위함.
4. **변경사항이 생기면 마찬가지로 CLAUDE.md(및 CLAUDE-WORKLOG.md)에 기록**하고 푸시한다.
5. **이미지 수정(사용자 피드백 반영 재작업) 시에는 재생성한 이미지를 배포 전에 사용자에게 보여주고 확인받은 뒤 배포**한다 (2026-09-02). 일일 파이프라인의 신규 글·이미지 일괄 배포는 기존대로 자동 진행.

## 공통: 저장소 구조

- **gh-pages 브랜치** = Hexo 소스 브랜치 (작업 브랜치). `source/_posts/*.md`, `_config.yml`, `tools/` 포함. 커밋 메시지 관례: `update on YYYY/MM/DD HH:MM:SS`
- **master 브랜치** = 배포 결과물. 직접 수정하지 않는다. **gh-pages에 푸시하면 GitHub Actions(`.github/workflows/hexo.yml`)가 자동으로 빌드해 master에 배포**하므로, 로컬에서 `hexo deploy`를 돌릴 필요가 없다(돌려도 Actions가 곧 덮어쓴다). 배포 = gh-pages 푸시.
- 사이트맵은 `hexo-generator-sitemap@^3` 하나만 사용한다(2026-09-04에 색인형 `hexo-generator-seo-friendly-sitemap` 제거). `sitemap.xml`(평면 단일 파일)과 `sitemap.txt`를 함께 생성하며 태그 아카이브는 제외(`tags: false`)한다.
- `tools/genimage`, `tools/svg2png` = 글에 넣을 이미지 생성 도구
- 이미지는 `source/images/<주제>/` 아래에 저장 (예: `source/images/dailyInvest/260227/`)

## 공통: "글작성해줘" 워크플로

1. **브랜치 확인**: 반드시 `gh-pages` 브랜치에서 작업. master면 gh-pages로 전환.
2. **git pull 선행 (필수)**: 글 작성 전 반드시 `git pull`로 최신화. 다른 PC에서 푸시한 글이 있을 수 있다. 충돌 시 임의로 해결하지 말고 사용자에게 알린다.
3. **CLAUDE-WORKLOG.md 읽기**: 이전 세션(다른 PC 포함)의 진행상황을 확인하고 이어서 작업한다.
4. **글 작성**: `source/_posts/<영문파일명>.md`에 작성. front matter는 기존 글 형식을 따른다:
   - `title`, `date`(KST), `description`(검색용 요약), `categories`(계층 리스트), `tags`, 필요시 `keywords`
   - **카테고리 체계(2026-08-28 재편)**: 최상위는 `코드`(개발)/`머니`(투자)/`브리핑`(데일리 뉴스) 3개뿐. 데일리 이슈 글은 항상 `브리핑` + 분야(사회|경제|국제|IT과학|연예|생활문화|스포츠) 2단으로 지정하고, 세부 주제(교통·외교 등)는 태그로만 표현한다. 사이드바 순서는 코드→머니→브리핑으로 테마 위젯(`themes/landscape/layout/_widget/category.ejs`)에 고정되어 있다.
   - 기존 글(예: `source/_posts/xiUsVisit2026.md`)을 참고해 톤과 구성을 맞춘다.
5. **대표 이미지 제작 (필수)**: 글마다 대표 이미지 1장. **제미나이 등 외부 API를 쓰지 않고 클로드가 직접 SVG를 제작**한 뒤 `tools/svg2png`로 PNG 변환한다 (사용자 결정, 2026-08-29).
   - 템플릿(기존 이미지 스타일 유지): 1536×1024(3:2), 상단 중앙 카테고리 라벨(예: 국제 / WORLD BRIEFING) + 가는 구분선 → 골드/오렌지 알약 배지(핵심 키워드) → 큰 흰색 볼드 제목 → 부제 한 줄 → 중앙에 주제를 표현한 플랫 일러스트 → 하단 흰색 라운드 통계 카드 3개(아이콘 원 + 굵은 수치 + 설명) → 푸터 `코드머니 브리핑 · tuhbm.github.io`. 배경은 카테고리별 톤(국제=짙은 블루그레이, 문화=레드, 경제=네이비/그린 등)에 큰 원형 장식.
   - 생성기: `tools/svgcard/make.js`가 위 템플릿을 코드로 구현해둔 것. jobs.json([{slug, category, categoryEn, theme, badge, title, subtitle, cards[3], illust}])을 만들어 `node tools/svgcard/make.js <jobs.json> <svg출력폴더>` 실행. 테마 키: economy/world/society/culture/tech/sports/realty/science. illust는 중앙(y 420~700, 중심 x 768) 영역의 SVG 스니펫으로 주제별로 직접 그린다. 좌표 속성에 공백이 섞이면 렌더링이 깨지므로 주의.
   - **히어로(illust) 품질 기준 — v5 (2026-08-31 사용자 확정, 필수)**: 플랫 단색 도형 나열 금지. ①입체 셰이딩(원통·구·상자는 2~4-stop 그라데이션, 동전·바퀴는 윗면 타원+옆면 엣지 분리) ②광택·하이라이트(금속 그라데이션, 유리 광택 사선, sheen) ③소프트 셰도(ellipse+feGaussianBlur) + 큰 오브젝트 드롭 셰도 ④실물 식별 부품 3개 이상(낚싯바늘=바늘귀·미늘·촉, 유모차=아치 캐노피·스포크·핸들 노브 등 — "그림만 보고 주제를 맞힐 수 있는가"로 검수) ⑤주제에 맞는 배경 앰비언스(별밭·성운·물결 등, 주조색 규율 내). 2026-08-31자 10편 이미지가 이 기준의 레퍼런스.
   - SVG 함정: 선으로 쓰는 `<path>`에 `fill='none'` 필수(빠지면 검은 면), 아크(`A`)의 sweep 방향 확인(반원이 상하 반전됨), PNG 생성 후 전량 육안 검수.
   - 변환: `node tools/svg2png/convert.js <svg폴더>` → `source/images/normal/<slug>.png` 생성. 생성 후 반드시 PNG를 열어 육안 검수한다.
   - 글에서 참조: `![대체텍스트](https://tuhbm.github.io/images/normal/<slug>.png)` (front matter 바로 아래, `## 한눈에 요약` 위).
6. **작업 후**: CLAUDE-WORKLOG.md 맨 위에 이번 세션 기록(날짜/PC/한 일/다음에 할 일)을 추가하고, gh-pages에 커밋한다. 푸시와 `hexo deploy`는 사용자 확인 후 진행.

## macOS (맥북)

- 저장소 경로: `/Users/gimtaegyun/study/tuhbm.github.io`
- 셸: zsh. 경로 구분자는 `/`.
- **대소문자 주의**: macOS 파일시스템은 대소문자를 구분하지 않아 master↔gh-pages 전환 시 `tags/CSS` vs `tags/css` 충돌이 날 수 있다. 해당 파일은 빌드 산출물이므로 `git checkout -f`로 전환해도 된다.

## Windows PC

- 저장소 경로: `C:\project\tuhbm.github.io` (2026-08-31 확인)
- 셸: PowerShell 또는 cmd 기준으로 명령을 작성한다. 경로 구분자는 `\`. (Claude Code에서는 Git Bash도 사용 가능)
- 줄바꿈(CRLF/LF) 관련 git 경고가 나오면 파일 내용을 임의로 바꾸지 말고 사용자에게 알린다.
- 이 PC에는 사용자 레벨 `daily-blog` 스킬(v4 포스터 템플릿 상세 스펙 포함)이 설치되어 있다. "오늘의 블로그 글 작성해줘" 트리거 시 스킬이 이 가이드와 함께 동작하며, 배포는 사용자 사전 승인에 따라 **gh-pages 푸시까지 자동**으로 진행한다(2026-08-28 사용자 확정).

## 주의 (공통)

- 이 저장소는 공개 저장소다. CLAUDE.md와 CLAUDE-WORKLOG.md에 개인정보·민감정보를 적지 않는다.

## 변경 이력 (규칙·기준 변경 시 여기에 추가하고 git에 푸시)

- **2026-09-11 (Windows PC)**: **새 태그 규칙 첫 적용 결과**. 글당 태그 3.0개(이전 4~6개), 30개 중 12개는 기존 태그 재사용. 새로 만든 18개는 모두 재등장할 일반명사(중동·출산·교육부·파업·저작권·음악·영화·재정 등)이고 1회성 고유명사는 0개 — 규칙의 목적은 "새 태그 금지"가 아니라 **다시 쓸 수 없는 고유명사 태그를 만들지 않는 것**임을 확인. 태그 분포 측정 시 grep -A는 keywords 블록을 함께 세므로 쓰지 말 것(정확한 현황: 태그 661개 중 595개가 1편짜리).
- **2026-09-10 (Windows PC)**: **색인 문제 원인은 사이트맵이 아니라 사이트 구조였다.** 서치콘솔 색인 보고서에서 sitemap.xml의 최종 크롤링이 2026-09-04로 확인됨 — 사이트맵 보고서의 "마지막으로 읽은 날짜"는 신뢰하지 말 것. 실제 상태는 **"크롤링됨 - 현재 색인이 생성되지 않음"**이었다. 원인: 글 212편 대비 태그 아카이브 931개, 모든 페이지에 태그 링크 960개. **태그 통계 정정(2026-09-11)**: 당시 grep이 keywords 블록까지 섞어 세어 "694개 중 480개(69%)"로 잘못 보고했다. front-matter의 tags 블록만 파싱한 정확한 값은 **태그 661개 중 595개(90.0%)가 글 1편짜리**다. 태그 분포를 잴 때는 grep -A 대신 tags 블록만 파싱할 것. 조치로 ①사이드바 tag·tagcloud 위젯 제거 ②태그 아카이브에 `noindex,follow` 부여 ③**글당 태그 3~4개로 제한하고 기존 태그를 재사용한다. 1회성 고유명사(인물·기업·제품명)는 태그로 만들지 않는다** — 이 태그 규칙은 daily-blog 스킬에도 반영했지만 스킬 파일은 PC 로컬에만 있으므로 맥북에서도 이 항목을 따를 것.
- **2026-09-10 (Windows PC)**: **canonical 태그 추가 + 사이트 description 교체**. ①landscape 테마 `head.ejs`에 `rel="canonical"`이 없었다 — `page.path`에서 끝 `index.html`을 떼고 `full_url_for()`로 출력하도록 추가(전 페이지 적용 확인). ②`_config.yml`의 description이 옛 개발블로그 문구였다. 이 값은 open_graph 헬퍼의 최종 폴백이라 홈·아카이브·카테고리에 그대로 노출된다(글 페이지는 front-matter의 description이 우선). **서치콘솔 사이트맵 주의**: 이미 등록된 사이트맵 URL을 다시 제출해도 새 가져오기 요청이 되지 않는다. 반드시 삭제 후 재등록해야 다시 읽는다. 가져오기에 실패한 사이트맵은 며칠 재시도 후 구글이 중단하므로 그대로 두면 영원히 "가져올 수 없음"으로 남는다.
- **2026-09-09 (Windows PC)**: **"요즘 트렌드" 글 요청 대응 기준**. 사용자가 트렌드 글을 요청하면 감이 아니라 통계 기반 기사를 찾는다 — 카드사 빅데이터(NH트렌드+, KB국민카드), 공연예술통합전산망(KOPIS), 관세청·통계청 국회 제출자료 등이 수치가 명확해 "숫자로 보는" 표를 만들기 좋다. 트렌드 글은 하루 10편 중 2~3편까지가 적정(나머지는 당일 속보성 이슈로 채운다).
- **2026-09-08 (Windows PC)**: **resvg 한글 렌더 주의사항 추가**. 부제(36px)에서 일부 음절(예: "기록"의 `록`)이 종성 없이 깨져 렌더되는 사례 확인. PNG 검수에서 글자가 깨져 보이면 폰트 문제이므로 문구를 다른 표현으로 교체해 우회한다.
- **2026-09-07 (Windows PC)**: **구글 애널리틱스 GA4 연결**. landscape 테마의 `google-analytics.ejs`가 서비스 종료된 Universal Analytics(analytics.js) 코드여서 GA4 측정 ID(G-로 시작)로는 수집이 안 됐다. gtag.js 스니펫으로 교체하고 `themes/landscape/_config.yml`의 `google_analytics`에 측정 ID를 지정했다. 측정 ID를 바꾸려면 이 값만 수정하면 되고, 파셜은 head.ejs에서 이미 include 중이다.
- **2026-09-04 (Windows PC)**: **sitemap.txt 추가 생성**(`sitemap.path`에 배열로 지정, robots.txt에도 등록). 서치콘솔이 sitemap.xml을 재크롤하지 않아 옛 판정(유형 "Sitemap 색인", 발견 0)이 계속 표시되는 문제 우회용 — 콘솔이 본 적 없는 새 URL이라 새로 읽는다. 내용은 sitemap.xml과 동일(197 URL).
- **2026-09-04 (Windows PC)**: **CI Node 20 → 24 상향**. 로컬 npm 11이 생성한 package-lock.json을 CI의 npm 10이 `npm ci`로 읽지 못해 배포 실패(`Missing: chokidar@3.6.0 from lock file`). 의존성을 건드린 뒤 CI가 Install deps에서 실패하면 이 원인을 먼저 의심할 것. 락파일은 로컬 npm 버전으로 생성되므로 CI와 npm 메이저를 맞춰 둔다.
- **2026-09-04 (Windows PC)**: **사이트맵을 색인형 → 평면 단일 파일로 전환**. `hexo-generator-seo-friendly-sitemap`(sitemap.xml이 색인, 실제 URL은 post/page/category/tag 4개 하위 파일로 분리) 제거하고 `hexo-generator-sitemap@^3` 채택. 서치콘솔에서 "발견된 페이지 0"으로 보이던 원인이 색인형 구조였기 때문. `_config.yml`에 `sitemap.tags: false`(태그 아카이브 762개는 얇은 페이지라 크롤 예산 분산 방지), `categories: true` 설정. 결과 sitemap.xml = 197 URL(글 172 + 카테고리 23 + 홈·about).
- **2026-08-31 (Windows PC)**: ①"핵심 규칙" 4개 신설(작성 전 git pull, 이미지 85~90점 유지, 규칙·변경사항은 CLAUDE.md에 기록 후 푸시). ②이미지 히어로 품질 기준 v5 확정 — 오늘자 10편 이미지 전량을 v5로 재제작(레퍼런스), 플랫 단색 금지. ③오늘의 이슈 10편 발행(수능 서논술형, 서울 출생 반등, 7월 산업동향, 기아 PV7, 연금 추납, 미-이란 충돌, 온타리오호 개명, 로먼 망원경, 카톡 위장 피싱, 오디세이 886만). 세션 상세는 CLAUDE-WORKLOG.md 참조.
- **2026-08-31 (Windows PC)**: Windows 저장소 경로 기록, 카테고리 체계(코드/머니/브리핑) 및 사이드바 고정 순서 명문화.
- **2026-08-29 (MacBook Pro)**: CLAUDE.md·CLAUDE-WORKLOG.md 공유 체계 신설, svgcard 이미지 생성기 제작.
- **2026-08-28 (Windows PC)**: 카테고리 전면 재편(102편), 블로그 제목 "코드머니 브리핑"으로 변경, v4 포스터 템플릿 확정.
