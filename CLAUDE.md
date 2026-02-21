# Claude Code 개발 지침

**나만의 레시피 모음**은 Notion을 CMS로 활용하여 레시피를 관리하는 개인 아카이브 사이트입니다.

## 핵심 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **CMS**: Notion API (`@notionhq/client` + `notion-to-md`)
- **Markdown**: `react-markdown` + `remark-gfm`
- **UI Components**: Radix UI + Lucide Icons
- **Development**: ESLint + Prettier + Husky + lint-staged

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                  # 홈 - 레시피 목록 (서버 컴포넌트, revalidate=3600)
│   ├── not-found.tsx             # 404 페이지
│   ├── recipe/[slug]/page.tsx    # 레시피 상세 페이지
│   └── layout.tsx                # 루트 레이아웃
├── components/
│   ├── recipe/                   # 레시피 관련 컴포넌트
│   │   ├── RecipeCard.tsx        # 레시피 카드
│   │   ├── RecipeGrid.tsx        # 레시피 그리드
│   │   ├── RecipeFilter.tsx      # 카테고리 필터 (클라이언트)
│   │   └── RecipeSearch.tsx      # 검색 입력 (클라이언트)
│   ├── layout/                   # 레이아웃 컴포넌트
│   ├── sections/                 # 페이지 섹션
│   └── ui/                       # shadcn/ui 컴포넌트
└── lib/
    ├── notion.ts                 # Notion API 유틸 (타입 + 함수)
    ├── env.ts                    # 환경변수 검증 (Zod)
    └── utils.ts                  # 공통 유틸
```

## 자주 사용하는 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (권장)

# UI 컴포넌트 추가
npx shadcn@latest add button
```

## Notion API 연동 가이드

`src/lib/notion.ts`에 함수 시그니처와 타입이 정의되어 있습니다. 실제 구현 시:

1. `@notionhq/client`, `notion-to-md` 설치
2. `src/lib/notion.ts`의 TODO 주석 위치에 구현
3. `src/app/page.tsx`와 `src/app/recipe/[slug]/page.tsx`의 목업 데이터를 API 호출로 교체

### Notion 데이터베이스 필수 속성

| 속성명     | 타입         | 비고                |
| ---------- | ------------ | ------------------- |
| Name       | Title        | 레시피 이름         |
| Slug       | Text         | URL 슬러그 (고유값) |
| Category   | Select       | 카테고리            |
| Tags       | Multi-select | 태그                |
| Time       | Number       | 조리 시간(분)       |
| Difficulty | Select       | 쉬움/보통/어려움    |
| Published  | Checkbox     | 공개 여부           |

## 개발 규칙

- `any` 타입 사용 금지
- 코드 주석은 한국어로 작성 (핵심 비즈니스 로직만)
- 모든 컴포넌트는 반응형 필수
- 서버 컴포넌트 우선, 클라이언트 상태가 필요할 때만 `'use client'` 사용
- ISR 캐싱: `export const revalidate = 3600`

## 작업 완료 체크리스트

```bash
npm run check-all   # 모든 검사 통과 확인
npm run build       # 빌드 성공 확인
```

## Project Context

- **PRD 문서**: `@docs/PRD.md`
- **개발 로드맵**: `@docs/ROADMAP.md`
