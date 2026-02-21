# 나만의 레시피 모음

Notion을 CMS로 활용하여 레시피를 관리하는 개인 아카이브 사이트입니다.

## 프로젝트 개요

**목적**: Notion 데이터베이스에 등록한 레시피를 웹사이트로 공개하는 개인 아카이브
**범위**: 레시피 목록 조회, 카테고리/검색 필터, 레시피 상세 페이지
**사용자**: 개인 요리 기록을 관리하고 공유하려는 개인

## 주요 페이지

1. **홈 (/)** - 레시피 카드 그리드 + 검색 + 카테고리 필터
2. **레시피 상세 (/recipe/[slug])** - 이미지, 재료 체크박스, 조리 순서(Notion 본문 렌더링)
3. **404 페이지** - 존재하지 않는 페이지 처리

## 핵심 기능

- 레시피 목록: Notion 데이터베이스에서 레시피를 가져와 카드 그리드로 표시
- 카테고리 필터: 한식/양식/일식/중식/간식/디저트/음료별 필터링
- 검색: 레시피명 키워드 검색 (디바운스 처리)
- 재료 체크박스: 상세 페이지에서 재료를 체크하며 조리 가능
- 다크 모드: 시스템 설정 기반 자동 전환
- ISR 캐싱: 1시간마다 재검증하여 빠른 응답 속도 유지

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (new-york style)
- **CMS**: Notion API (`@notionhq/client`)
- **Markdown**: `notion-to-md` + `react-markdown` + `remark-gfm`
- **캐싱 전략**: ISR (revalidate 3600)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Notion API 설정

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. 레시피 데이터베이스 페이지에서 Integration 연결
3. `.env.example`을 복사하여 `.env.local` 생성 후 값 입력

```bash
cp .env.example .env.local
```

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxx
```

### 3. Notion 데이터베이스 속성 구성

레시피 데이터베이스에 다음 속성이 필요합니다:

| 속성명     | 타입         | 설명                      |
| ---------- | ------------ | ------------------------- |
| Name       | Title        | 레시피 이름               |
| Slug       | Text         | URL 슬러그 (영문, 고유값) |
| Category   | Select       | 카테고리 (한식/양식 등)   |
| Tags       | Multi-select | 태그 목록                 |
| Time       | Number       | 조리 시간 (분)            |
| Difficulty | Select       | 난이도 (쉬움/보통/어려움) |
| Published  | Checkbox     | 공개 여부                 |

### 4. Notion API 패키지 설치 (별도 작업)

```bash
npm install @notionhq/client notion-to-md react-markdown remark-gfm
```

### 5. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인

### 6. 빌드

```bash
npm run build
```

## 개발 명령어

```bash
npm run dev          # 개발 서버 실행 (Turbopack)
npm run build        # 프로덕션 빌드
npm run check-all    # 타입체크 + 린트 + 포맷 검사 통합 실행
```

## 개발 상태

- 기본 프로젝트 구조 설정 완료
- 목업 데이터 기반 UI 구현 완료
- Notion API 연동 구현 필요 (`src/lib/notion.ts`)
- react-markdown 기반 본문 렌더링 구현 필요

## 문서

- [개발 가이드](./CLAUDE.md) - 개발 지침 및 기술 스택
