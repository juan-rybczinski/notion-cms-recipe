# 나만의 레시피 모음 - 개발 로드맵

Notion을 CMS로 활용하는 개인 레시피 아카이브 사이트의 개발 로드맵입니다.

## 개요

**나만의 레시피 모음**은 Notion 데이터베이스를 CMS로 활용하여, Notion에서 레시피를 작성하면 자동으로 사이트에 반영되는 개인 레시피 아카이브 서비스입니다.

- **레시피 목록/검색**: Notion API 기반 레시피 카드 그리드, 카테고리 필터, 실시간 검색
- **레시피 상세**: Notion 본문 마크다운 렌더링, 재료 체크박스, Floating 액션 버튼
- **Notion CMS 연동**: @notionhq/client + notion-to-md를 통한 콘텐츠 자동 동기화

## 전체 진행률

- **Phase 1**: 프로젝트 설정 및 구조 구축 - 완료
- **Phase 2**: UI/UX 완성 (목업 데이터) - 완료
- **Phase 3**: Notion API 연동 및 핵심 기능 구현 - 미착수
- **Phase 4**: 상세 페이지 컴포넌트 구현 - 미착수
- **Phase 5**: 최적화 및 배포 - 미착수

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함
   - 초기 상태의 샘플로 `000-sample.md` 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 프로젝트 설정 및 구조 구축 - 완료

- **Task 001: 프로젝트 초기 설정 및 스타터 템플릿 구성** - 완료
  - See: 스타터킷 초기화 완료
  - Next.js 15.5.3 + React 19 + TypeScript 5 프로젝트 생성
  - TailwindCSS v4 + shadcn/ui (new-york style) 설정
  - ESLint + Prettier + Husky + lint-staged 개발 환경 구성
  - 보일러플레이트 제거 (login/signup, 불필요한 섹션)

- **Task 002: 라우팅 및 페이지 골격 생성** - 완료
  - See: 스타터킷 초기화 완료
  - `src/app/page.tsx` 메인 페이지 골격 생성
  - `src/app/recipe/[slug]/page.tsx` 상세 페이지 골격 생성
  - `src/app/not-found.tsx` 404 페이지 완성
  - `src/app/layout.tsx` 루트 레이아웃 구성

- **Task 003: 타입 정의 및 인터페이스 설계** - 완료
  - See: `src/lib/notion.ts`
  - Recipe, RecipeDetail 타입 정의
  - RecipeCategory, Difficulty 타입 정의
  - GetRecipesParams, GetRecipesResult 타입 정의
  - Notion API 함수 시그니처 정의 (TODO 구현 대기)
  - `src/lib/env.ts` 환경변수 검증 (Zod)

### Phase 2: UI/UX 완성 (목업 데이터 활용) - 완료

- **Task 004: 공통 레이아웃 및 UI 컴포넌트 구현** - 완료
  - Header, Footer, Container 레이아웃 컴포넌트
  - HeroSection 컴포넌트
  - MainNav, MobileNav 네비게이션 컴포넌트
  - shadcn/ui 컴포넌트 설치 (Button, Card, Badge, Input, Checkbox, Skeleton 등)
  - `next.config.ts` Notion 이미지 도메인 추가

- **Task 005: 메인 페이지 UI 완성** - 완료
  - RecipeCard 컴포넌트 (이미지, 제목, 조리 시간, 난이도 배지)
  - RecipeGrid 컴포넌트 (반응형 그리드: 모바일 1열, 태블릿 2열, 데스크톱 3열)
  - RecipeSearch 클라이언트 컴포넌트 (검색 입력 UI)
  - RecipeFilter 클라이언트 컴포넌트 (카테고리 칩 UI)
  - 목업 데이터 기반 전체 플로우 검증

- **Task 006: 레시피 상세 페이지 UI 완성** - 완료
  - 커버 이미지 영역 (Next.js Image)
  - 레시피 헤더 (카테고리 배지, 제목, 조리 시간, 난이도, 태그)
  - 재료 체크박스 UI (shadcn/ui Checkbox 기반)
  - 조리 순서 본문 영역 (마크다운 렌더링 대기)
  - 뒤로가기 링크
  - 목업 데이터 기반 UI 검증

### Phase 3: Notion API 연동 및 핵심 기능 구현

- **Task 007: Notion 패키지 설치 및 API 클라이언트 구현** - 우선순위
  - `@notionhq/client`, `notion-to-md`, `react-markdown`, `remark-gfm` 패키지 설치
  - `.env.local` 환경변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
  - `src/lib/notion.ts`의 `getRecipes()` 함수 구현 (Published 레시피 목록 조회, 최신순 정렬)
  - `src/lib/notion.ts`의 `getRecipeBySlug()` 함수 구현 (슬러그 기반 단건 조회)
  - `src/lib/notion.ts`의 `getRecipeContent()` 함수 구현 (notion-to-md 본문 변환)
  - `src/lib/notion.ts`의 `getAllRecipeSlugs()` 함수 구현 (정적 경로 생성용)
  - Notion API 429 Rate Limit 재시도 로직 구현
  - Playwright MCP를 활용한 API 연동 통합 테스트

- **Task 008: 메인 페이지 Notion API 연동**
  - `src/app/page.tsx`의 목업 데이터를 `getRecipes()` API 호출로 교체
  - RecipeSearch 클라이언트 컴포넌트에 디바운싱 로직 구현
  - RecipeFilter 클라이언트 컴포넌트에 카테고리 필터링 로직 구현
  - 빈 상태 처리 (F007): 결과 없을 때 안내 메시지 + 전체 목록 버튼
  - ISR revalidate = 3600 설정 검증
  - Playwright MCP로 목록 조회 및 필터링 E2E 테스트

- **Task 009: 레시피 상세 페이지 Notion API 연동**
  - `src/app/recipe/[slug]/page.tsx`의 목업 데이터를 `getRecipeBySlug()` API 호출로 교체
  - `generateStaticParams` 구현 (빌드 시 모든 슬러그 정적 생성)
  - `generateMetadata` 구현 (SEO 메타 태그)
  - ISR revalidate = 86400 설정 (상세 페이지는 24시간)
  - 존재하지 않는 슬러그 접근 시 `notFound()` 처리 검증
  - Playwright MCP로 상세 페이지 접근 및 데이터 표시 E2E 테스트

### Phase 4: 상세 페이지 컴포넌트 구현

- **Task 010: RecipeContent 마크다운 렌더러 구현** - 우선순위
  - `src/components/recipe/RecipeContent.tsx` 구현
  - react-markdown + remark-gfm 기반 Notion 본문 렌더링
  - GFM 체크박스 (`- [ ]`) 렌더링 지원
  - 마크다운 스타일링 (prose 클래스 적용)
  - 상세 페이지의 `<pre>` 태그를 RecipeContent 컴포넌트로 교체

- **Task 011: IngredientList 재료 체크박스 컴포넌트 구현**
  - `src/components/recipe/IngredientList.tsx` 구현 (react-markdown 래퍼)
  - `src/components/recipe/IngredientCheckbox.tsx` 구현 (개별 체크박스)
  - react-markdown의 components.input 커스터마이징으로 체크 시 취소선 처리
  - 클라이언트 상태(useState) 기반 체크 관리 (새로고침 시 초기화)
  - 상세 페이지의 기존 재료 목록 UI를 IngredientList로 교체
  - Playwright MCP로 체크박스 인터랙션 테스트

- **Task 012: FloatingActions 컴포넌트 구현**
  - `src/components/recipe/FloatingActions.tsx` 구현 (클라이언트 컴포넌트)
  - '목록으로 돌아가기' 버튼 (메인 페이지 링크)
  - '상단으로 이동' 버튼 (스크롤 감지 후 표시/숨김)
  - 스크롤 위치 감지 로직 구현
  - 상세 페이지에 FloatingActions 컴포넌트 통합

- **Task 013: 핵심 기능 통합 테스트**
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트
  - 메인 페이지 -> 검색/필터 -> 카드 클릭 -> 상세 페이지 플로우
  - 재료 체크박스 인터랙션 검증
  - 빈 상태 / 404 페이지 접근 검증
  - Floating 버튼 동작 검증
  - 에러 핸들링 및 엣지 케이스 테스트

### Phase 5: 최적화 및 배포

- **Task 014: 전역 UI 및 에러 처리 구현**
  - `src/app/loading.tsx` 전역 로딩 UI 구현
  - `src/app/error.tsx` 전역 에러 바운더리 구현 (클라이언트 컴포넌트)
  - `src/app/recipe/[slug]/loading.tsx` 상세 페이지 스켈레톤 UI
  - API 오류 시 graceful fallback 처리

- **Task 015: 이미지 프록시 API Route 구현 (선택)**
  - `src/app/api/image/route.ts` 이미지 프록시 구현
  - Notion 내부 이미지 만료 URL 대응
  - SSRF 방지 화이트리스트 검증
  - Cache-Control 헤더 적용 (max-age=3600)

- **Task 016: 성능 최적화 및 배포**
  - Next.js Image 컴포넌트 최적화 검증
  - Lighthouse 성능 점수 90점 이상 달성
  - 시맨틱 HTML 및 접근성 검사
  - Vercel 배포 및 환경 변수 설정
  - 프로덕션 환경 동작 검증

---

## 기술 스택 요약

| 영역      | 기술                                         |
| --------- | -------------------------------------------- |
| Framework | Next.js 15.5.3 (App Router + Turbopack)      |
| Runtime   | React 19.1.0 + TypeScript 5                  |
| Styling   | TailwindCSS v4 + shadcn/ui (new-york)        |
| CMS       | Notion API (@notionhq/client + notion-to-md) |
| Markdown  | react-markdown + remark-gfm                  |
| Icons     | Lucide React                                 |
| Deploy    | Vercel                                       |

---

_최종 업데이트: 2026-02-22_
