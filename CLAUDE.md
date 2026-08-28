# 블로그 작업 가이드 (Claude용)

이 저장소는 Hexo 기반 블로그 "코드머니 브리핑"(https://tuhbm.github.io)이다.
사용자는 PC 2대를 오가며 작업하므로, 클로드에 대한 지시·규칙·진행상황은 이 저장소 안의 파일(CLAUDE.md, CLAUDE-WORKLOG.md)로 공유한다.

## 저장소 구조

- **gh-pages 브랜치** = Hexo 소스 브랜치 (작업 브랜치). `source/_posts/*.md`, `_config.yml`, `tools/` 포함. 커밋 메시지 관례: `update on YYYY/MM/DD HH:MM:SS`
- **master 브랜치** = `hexo deploy`가 생성하는 배포 결과물. 직접 수정하지 않는다.
- `tools/genimage`, `tools/svg2png` = 글에 넣을 이미지 생성 도구
- 이미지는 `source/images/<주제>/` 아래에 저장 (예: `source/images/dailyInvest/260227/`)

## PC별 로컬 경로

- MacBook Pro (macOS, hostname: gimtaegyun-ui-MacBookPro.local): `/Users/gimtaegyun/study/tuhbm.github.io`
- 다른 PC: (경로 확인 후 여기에 기록할 것)

## "글작성해줘" 워크플로

1. **브랜치 확인**: 반드시 `gh-pages` 브랜치에서 작업. master면 gh-pages로 전환.
2. **git pull 선행 (필수)**: 글 작성 전 반드시 `git pull`로 최신화. 다른 PC에서 푸시한 글이 있을 수 있다. 충돌 시 임의로 해결하지 말고 사용자에게 알린다.
3. **CLAUDE-WORKLOG.md 읽기**: 이전 세션(다른 PC 포함)의 진행상황을 확인하고 이어서 작업한다.
4. **글 작성**: `source/_posts/<영문파일명>.md`에 작성. front matter는 기존 글 형식을 따른다:
   - `title`, `date`(KST), `description`(검색용 요약), `categories`(계층 리스트), `tags`, 필요시 `keywords`
   - 기존 글(예: `source/_posts/xiUsVisit2026.md`)을 참고해 톤과 구성을 맞춘다.
5. **작업 후**: CLAUDE-WORKLOG.md 맨 위에 이번 세션 기록을 추가하고, gh-pages에 커밋한다. 푸시와 `hexo deploy`는 사용자 확인 후 진행.

## 주의

- 이 저장소는 공개 저장소다. CLAUDE.md와 CLAUDE-WORKLOG.md에 개인정보·민감정보를 적지 않는다.
- macOS는 대소문자 구분이 없어 master↔gh-pages 전환 시 `tags/CSS` vs `tags/css` 충돌이 날 수 있다. 해당 파일은 빌드 산출물이므로 `git checkout -f`로 전환해도 된다.
