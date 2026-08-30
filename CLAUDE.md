# 블로그 작업 가이드 (Claude용)

이 저장소는 Hexo 기반 블로그 "코드머니 브리핑"(https://tuhbm.github.io)이다.
사용자는 **macOS(맥북)와 Windows PC 두 대**를 오가며 작업한다. 클로드에 대한 지시·규칙·진행상황은 이 저장소 안의 파일(CLAUDE.md, CLAUDE-WORKLOG.md)로 공유한다.

**먼저 현재 실행 중인 운영체제를 확인하고, 아래 공통 규칙 + 해당 OS 섹션만 따른다.**

## 공통: 저장소 구조

- **gh-pages 브랜치** = Hexo 소스 브랜치 (작업 브랜치). `source/_posts/*.md`, `_config.yml`, `tools/` 포함. 커밋 메시지 관례: `update on YYYY/MM/DD HH:MM:SS`
- **master 브랜치** = 배포 결과물. 직접 수정하지 않는다. **gh-pages에 푸시하면 GitHub Actions(`.github/workflows/hexo.yml`)가 자동으로 빌드해 master에 배포**하므로, 로컬에서 `hexo deploy`를 돌릴 필요가 없다(돌려도 Actions가 곧 덮어쓴다). 배포 = gh-pages 푸시.
- 사이트맵은 `hexo-generator-seo-friendly-sitemap` 하나만 사용한다(2026-08-30에 중복이던 `hexo-generator-sitemap` 제거). 한글 태그/카테고리 URL 이중 인코딩은 `scripts/fix-sitemap-double-encoding.js`가 보정한다.
- `tools/genimage`, `tools/svg2png` = 글에 넣을 이미지 생성 도구
- 이미지는 `source/images/<주제>/` 아래에 저장 (예: `source/images/dailyInvest/260227/`)

## 공통: "글작성해줘" 워크플로

1. **브랜치 확인**: 반드시 `gh-pages` 브랜치에서 작업. master면 gh-pages로 전환.
2. **git pull 선행 (필수)**: 글 작성 전 반드시 `git pull`로 최신화. 다른 PC에서 푸시한 글이 있을 수 있다. 충돌 시 임의로 해결하지 말고 사용자에게 알린다.
3. **CLAUDE-WORKLOG.md 읽기**: 이전 세션(다른 PC 포함)의 진행상황을 확인하고 이어서 작업한다.
4. **글 작성**: `source/_posts/<영문파일명>.md`에 작성. front matter는 기존 글 형식을 따른다:
   - `title`, `date`(KST), `description`(검색용 요약), `categories`(계층 리스트), `tags`, 필요시 `keywords`
   - 기존 글(예: `source/_posts/xiUsVisit2026.md`)을 참고해 톤과 구성을 맞춘다.
5. **대표 이미지 제작 (필수)**: 글마다 대표 이미지 1장. **제미나이 등 외부 API를 쓰지 않고 클로드가 직접 SVG를 제작**한 뒤 `tools/svg2png`로 PNG 변환한다 (사용자 결정, 2026-08-29).
   - 템플릿(기존 이미지 스타일 유지): 1536×1024(3:2), 상단 중앙 카테고리 라벨(예: 국제 / WORLD BRIEFING) + 가는 구분선 → 골드/오렌지 알약 배지(핵심 키워드) → 큰 흰색 볼드 제목 → 부제 한 줄 → 중앙에 주제를 표현한 플랫 일러스트 → 하단 흰색 라운드 통계 카드 3개(아이콘 원 + 굵은 수치 + 설명) → 푸터 `코드머니 브리핑 · tuhbm.github.io`. 배경은 카테고리별 톤(국제=짙은 블루그레이, 문화=레드, 경제=네이비/그린 등)에 큰 원형 장식.
   - 생성기: `tools/svgcard/make.js`가 위 템플릿을 코드로 구현해둔 것. jobs.json([{slug, category, categoryEn, theme, badge, title, subtitle, cards[3], illust}])을 만들어 `node tools/svgcard/make.js <jobs.json> <svg출력폴더>` 실행. 테마 키: economy/world/society/culture/tech/sports/realty/science. illust는 중앙(y 420~700, 중심 x 768) 영역의 SVG 스니펫으로 주제별로 직접 그린다. 좌표 속성에 공백이 섞이면 렌더링이 깨지므로 주의.
   - 변환: `node tools/svg2png/convert.js <svg폴더>` → `source/images/normal/<slug>.png` 생성. 생성 후 반드시 PNG를 열어 육안 검수한다.
   - 글에서 참조: `![대체텍스트](https://tuhbm.github.io/images/normal/<slug>.png)` (front matter 바로 아래, `## 한눈에 요약` 위).
6. **작업 후**: CLAUDE-WORKLOG.md 맨 위에 이번 세션 기록(날짜/PC/한 일/다음에 할 일)을 추가하고, gh-pages에 커밋한다. 푸시와 `hexo deploy`는 사용자 확인 후 진행.

## macOS (맥북)

- 저장소 경로: `/Users/gimtaegyun/study/tuhbm.github.io`
- 셸: zsh. 경로 구분자는 `/`.
- **대소문자 주의**: macOS 파일시스템은 대소문자를 구분하지 않아 master↔gh-pages 전환 시 `tags/CSS` vs `tags/css` 충돌이 날 수 있다. 해당 파일은 빌드 산출물이므로 `git checkout -f`로 전환해도 된다.

## Windows PC

- 저장소 경로: (확인 후 여기에 기록할 것. 예: `C:\Users\...\tuhbm.github.io`)
- 셸: PowerShell 또는 cmd 기준으로 명령을 작성한다. 경로 구분자는 `\`.
- 줄바꿈(CRLF/LF) 관련 git 경고가 나오면 파일 내용을 임의로 바꾸지 말고 사용자에게 알린다.

## 주의 (공통)

- 이 저장소는 공개 저장소다. CLAUDE.md와 CLAUDE-WORKLOG.md에 개인정보·민감정보를 적지 않는다.
