# Development Guidelines for AI Agent

## 1. 프로젝트 개요

- Notion을 CMS로 사용하는 레시피 아카이브 사이트
- Next.js 15.5.3 (App Router + Turbopack), React 19, TypeScript 5
- TailwindCSS v4, shadcn/ui (new-york style), Radix UI, Lucide Icons
- Notion API: `@notionhq/client` + `notion-to-md` (미설치 상태 → TODO 구현 필요)

## 2. 디렉토리 구조 및 파일 배치 규칙

```
src/
├── app/                          # Next.js App Router 페이지
│   ├── layout.tsx                # 루트 레이아웃 (ThemeProvider, Toaster)
│   ├── page.tsx                  # 홈 - 레시피 목록 (서버 컴포넌트)
│   ├── not-found.tsx             # 404 페이지
│   └── recipe/[slug]/page.tsx   # 레시피 상세 (서버 컴포넌트)
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트 (직접 수정 금지)
│   ├── layout/                   # 레이아웃 컴포넌트 (header, footer, container)
│   ├── navigation/               # 네비게이션 컴포넌트 (main-nav, mobile-nav)
│   ├── providers/                # 전역 Provider (theme-provider)
│   ├── recipe/                   # 레시피 관련 컴포넌트
│   └── sections/                 # 페이지 섹션 컴포넌트
└── lib/
    ├── notion.ts                 # Notion API 타입 + 함수 (핵심 파일)
    ├── env.ts                    # 환경변수 검증 (Zod)
    └── utils.ts                  # 공통 유틸 (cn 함수 등)
```

### 파일 배치 규칙

- 새 레시피 관련 컴포넌트 → `src/components/recipe/`에 추가
- 새 페이지 섹션 → `src/components/sections/`에 추가
- Notion API 관련 함수/타입 → `src/lib/notion.ts`에만 정의
- 환경변수 접근 → 반드시 `src/lib/env.ts`의 `env` 객체를 통해서만

## 3. 컴포넌트 작성 규칙

### 서버 컴포넌트 (기본값)

- `'use client'` 지시어 없는 모든 컴포넌트는 서버 컴포넌트
- 데이터 패칭, Notion API 호출은 서버 컴포넌트에서만

### 클라이언트 컴포넌트 (필요 시만)

- React hooks(`useState`, `useEffect` 등) 사용 시 → `'use client'` 필수
- `useRouter`, `useSearchParams` 사용 시 → `'use client'` 필수
- `useMediaQuery`, `useDebounceCallback` (usehooks-ts) 사용 시 → `'use client'` 필수

### 현재 클라이언트 컴포넌트 목록

| 파일                                     | 이유                                      |
| ---------------------------------------- | ----------------------------------------- |
| `src/components/layout/header.tsx`       | useMediaQuery, useState                   |
| `src/components/recipe/RecipeFilter.tsx` | useRouter, useSearchParams                |
| `src/components/recipe/RecipeSearch.tsx` | useRouter, useSearchParams, useTransition |

### Suspense 사용 규칙

- 클라이언트 컴포넌트(`RecipeFilter`, `RecipeSearch`)는 page.tsx에서 `<Suspense>`로 래핑
- Suspense fallback은 동일한 크기의 `<Skeleton>`으로 대체

## 4. Notion API 연동 규칙

### 현재 상태 (미구현)

- `src/lib/notion.ts`의 모든 함수가 `throw new Error()`로 구현됨
- 각 page.tsx에 `MOCK_*` 상수로 목업 데이터 존재

### Notion API 구현 시 수정 파일 순서

1. `package.json` → `@notionhq/client`, `notion-to-md` 설치
2. `src/lib/notion.ts` → 함수 구현 (TODO 주석 위치)
3. `src/app/page.tsx` → MOCK 데이터 제거 + `getRecipes()` 호출로 교체
4. `src/app/recipe/[slug]/page.tsx` → MOCK 데이터 제거 + `getRecipeBySlug()` 호출로 교체

### Notion 데이터베이스 필수 속성

| 속성명     | 타입         | 비고                            |
| ---------- | ------------ | ------------------------------- |
| Name       | Title        | 레시피 이름                     |
| Slug       | Text         | URL 슬러그 (고유값)             |
| Category   | Select       | RecipeCategory 타입과 일치 필수 |
| Tags       | Multi-select | 태그                            |
| Time       | Number       | 조리 시간(분)                   |
| Difficulty | Select       | 쉬움/보통/어려움                |
| Published  | Checkbox     | 공개 여부                       |

### Notion API 클라이언트 초기화

```typescript
// src/lib/notion.ts에서 구현
import { Client } from '@notionhq/client'
import { env } from './env'
const notion = new Client({ auth: env.NOTION_API_KEY })
```

## 5. 타입 시스템 규칙

### 핵심 타입 정의 위치: `src/lib/notion.ts`

- `Difficulty`: `'쉬움' | '보통' | '어려움'`
- `RecipeCategory`: 8개 카테고리 유니온 타입
- `Recipe`: 레시피 목록 기본 타입
- `RecipeDetail`: Recipe + content(마크다운) + ingredients 확장 타입
- `GetRecipesParams`, `GetRecipesResult`: API 파라미터/결과 타입

### 타입 사용 규칙

- `any` 타입 사용 절대 금지
- Notion API 응답 타입은 `@notionhq/client`의 내장 타입 활용
- 새 타입 추가 시 반드시 `src/lib/notion.ts`에 정의

## 6. 멀티파일 동시 수정 필수 케이스

### 케이스 1: RecipeCategory 변경 시

**반드시 두 파일 동시 수정:**

- `src/lib/notion.ts` → `RecipeCategory` 유니온 타입 수정
- `src/components/recipe/RecipeFilter.tsx` → `CATEGORIES` 배열 수정

### 케이스 2: 환경변수 추가 시

**반드시 두 위치 동시 수정:**

- `.env.local` → 실제 값 추가
- `src/lib/env.ts` → `envSchema` Zod 스키마에 추가

### 케이스 3: Notion API 구현 완료 후

**반드시 세 파일 동시 수정:**

- `src/lib/notion.ts` → 함수 구현
- `src/app/page.tsx` → MOCK_RECIPES 제거 + getRecipes() 호출
- `src/app/recipe/[slug]/page.tsx` → MOCK_DETAIL 제거 + getRecipeBySlug() 호출

### 케이스 4: 레시피 타입(`Recipe`) 필드 추가 시

**반드시 수정할 파일:**

- `src/lib/notion.ts` → 타입 정의 수정
- `src/components/recipe/RecipeCard.tsx` → 카드 UI 반영
- `src/app/page.tsx` → MOCK 데이터 업데이트 (또는 API 호출 업데이트)
- `src/app/recipe/[slug]/page.tsx` → 상세 페이지 반영

## 7. 환경변수 규칙

- 환경변수 직접 접근(`process.env.*`) 금지
- 반드시 `import { env } from '@/lib/env'`로 접근
- 현재 필수 변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID`
- 새 환경변수 추가 시 `src/lib/env.ts`의 `envSchema`에 먼저 추가

## 8. ISR 캐싱 규칙

- 모든 page.tsx에 `export const revalidate = 3600` 설정 (1시간)
- 새 페이지 생성 시 반드시 revalidate 설정 포함
- Notion API 연동 후 `generateStaticParams` 구현 필요 (`src/app/recipe/[slug]/page.tsx`)

## 9. UI 컴포넌트 규칙

- `src/components/ui/` 디렉토리 내 파일 직접 수정 금지 (shadcn/ui 자동 관리)
- 새 shadcn 컴포넌트 추가: `npx shadcn@latest add <component-name>`
- shadcn 컴포넌트 커스텀 필요 시 래퍼 컴포넌트 생성 (`src/components/recipe/` 등)

## 10. 코드 스타일 규칙

- 들여쓰기: 2칸
- 네이밍: camelCase (변수/함수), PascalCase (컴포넌트/타입)
- 코드 주석: 한국어, 핵심 비즈니스 로직만
- 컴포넌트 파일명: PascalCase (예: `RecipeCard.tsx`)
- 반응형 필수: Tailwind 반응형 클래스 사용 (`sm:`, `md:`, `lg:`)

## 11. 금지 사항

- `any` 타입 사용 금지
- `process.env.*` 직접 접근 금지 (env.ts 경유 필수)
- `src/components/ui/` 직접 수정 금지
- 클라이언트 컴포넌트에서 Notion API 직접 호출 금지
- `'use client'` 불필요한 남용 금지 (서버 컴포넌트 기본 원칙)
- 새 환경변수를 env.ts 스키마 등록 없이 사용 금지
- RecipeCategory 타입과 CATEGORIES 배열 불일치 상태 유지 금지
