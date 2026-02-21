# 나만의 레시피 모음 PRD

## 목적

Notion을 CMS로 활용하여, Notion에서 레시피를 작성하면 자동으로 사이트에 반영되는 개인 레시피 아카이브 사이트를 개발한다.

## 사용자

요리 기록을 Notion으로 관리하고 싶은 개인 사용자 (1인 운영자)

---

## 사용자 여정

1. 메인 페이지 (레시피 목록)
   - 서비스 진입 시 Hero 섹션과 함께 전체 레시피 그리드가 표시된다.
   - 검색바 또는 카테고리 칩을 통해 레시피를 필터링한다.
   - 결과가 없으면 빈 상태 안내 메시지가 표시된다.

2. 레시피 상세 페이지
   - 목록에서 카드 클릭 시 해당 레시피 상세 페이지로 이동한다.
   - 재료 체크박스, 조리 순서(Notion 본문 렌더링)를 확인한다.
   - Floating 버튼으로 목록으로 돌아가거나 상단으로 이동한다.

3. 빈 상태 / 404 페이지
   - 검색 또는 카테고리 필터 결과가 없으면 안내 메시지와 함께 전체 목록 버튼이 표시된다.
   - 존재하지 않는 슬러그 접근 시 404 페이지가 표시된다.

```
[메인 페이지]
     |
     |─ 검색어 입력 / 카테고리 선택
     |         |
     |         |─ 결과 있음  → 필터링된 레시피 그리드 표시
     |         |─ 결과 없음  → 빈 상태 안내 페이지
     |
     |─ 카드 클릭
               |
               v
       [레시피 상세 페이지]
               |
               |─ Floating 버튼 → 목록으로 돌아가기
               |─ Floating 버튼 → 상단으로 이동
```

---

## 기능 명세

### MVP 핵심 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|---------------|------------|
| **F001** | 레시피 목록 조회 | Notion API로 Published 상태의 레시피 목록을 가져와 카드 그리드로 표시 | 서비스의 핵심 진입점 | 메인 페이지 |
| **F002** | 레시피 상세 조회 | 슬러그 기반으로 Notion 페이지 상세 데이터와 본문을 가져와 표시 | 레시피 콘텐츠 소비의 핵심 | 레시피 상세 페이지 |
| **F003** | Notion 본문 렌더링 | notion-to-md로 Notion 블록을 마크다운으로 변환 후 HTML로 렌더링 | 재료 및 조리 순서 표시 필수 | 레시피 상세 페이지 |
| **F004** | 카테고리 필터링 | 카테고리 칩 클릭 시 해당 카테고리의 레시피만 필터링하여 표시 | 레시피 탐색 효율화 | 메인 페이지 |
| **F005** | 레시피 검색 | 제목 기반 실시간 검색으로 레시피 목록 필터링 | 레시피 탐색 효율화 | 메인 페이지 |
| **F006** | 재료 체크박스 | 상세 페이지에서 재료 항목을 체크하며 준비 여부를 표시 | 조리 중 사용성 향상 | 레시피 상세 페이지 |
| **F007** | 빈 상태 처리 | 검색/필터 결과가 없을 때 안내 메시지와 전체 목록 버튼 표시 | 사용자 이탈 방지 | 빈 상태 페이지 |
| **F008** | 404 페이지 | 존재하지 않는 슬러그 접근 시 안내 페이지 표시 | 잘못된 접근 처리 | 404 페이지 |

### MVP 필수 지원 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|---------------|------------|
| **F010** | Notion API 연동 | @notionhq/client로 Notion 데이터베이스 쿼리 및 페이지 조회 | 모든 기능의 데이터 기반 | 전체 |
| **F011** | 이미지 최적화 | Next.js Image 컴포넌트로 Notion 대표 이미지 최적화 처리 | 성능 및 UX 필수 | 메인 페이지, 레시피 상세 페이지 |
| **F012** | 반응형 레이아웃 | 데스크톱(3~4열), 태블릿(2열), 모바일(1열) 그리드 전환 | 모든 디바이스 접근성 | 메인 페이지 |
| **F013** | Floating 액션 버튼 | 목록으로 돌아가기 및 상단으로 이동 버튼 | 상세 페이지 UX 필수 | 레시피 상세 페이지 |

### MVP 이후 기능 (제외)

- 좋아요 / 북마크 기능
- 댓글 기능
- 인쇄 / PDF 저장
- SNS 공유 기능
- 조리 타이머
- 다국어 지원

---

## 메뉴 구조

```
나만의 레시피 모음 내비게이션
├── 홈 (메인 페이지)
│   ├── 기능: F001 (레시피 목록 조회)
│   ├── 기능: F004 (카테고리 필터링)
│   ├── 기능: F005 (레시피 검색)
│   └── 기능: F012 (반응형 레이아웃)
│
├── 레시피 상세 (카드 클릭 시 진입)
│   ├── 기능: F002 (레시피 상세 조회)
│   ├── 기능: F003 (Notion 본문 렌더링)
│   ├── 기능: F006 (재료 체크박스)
│   ├── 기능: F011 (이미지 최적화)
│   └── 기능: F013 (Floating 액션 버튼)
│
└── 오류 페이지
    ├── 빈 상태 페이지 - F007 (결과 없음 안내)
    └── 404 페이지 - F008 (잘못된 경로 안내)
```

---

## 페이지별 상세 기능

### 메인 페이지

> **구현 기능:** `F001`, `F004`, `F005`, `F011`, `F012` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 서비스 진입점. 전체 레시피 목록을 탐색하고 필터링하는 핵심 페이지 |
| **진입 경로** | 최초 접속 또는 헤더 로고 클릭 |
| **사용자 행동** | Hero 섹션을 보고 검색바로 레시피를 검색하거나 카테고리 칩으로 필터링한 뒤, 원하는 카드를 클릭하여 상세 페이지로 이동 |
| **주요 기능** | - Hero Section: 서비스 타이틀과 소개 문구 표시<br>- Global Search: shadcn/ui Input 컴포넌트 기반 실시간 검색바. 제목 기반 필터링<br>- Category Filter: 카테고리 칩(Chip) UI. 전체 / 메인 요리 / 디저트 / 안주 / 간편식 선택<br>- Recipe Grid: 이미지, 제목, 조리 시간(분), 난이도 배지를 포함한 카드 레이아웃<br>- 반응형 그리드: 데스크톱 3~4열, 태블릿 2열, 모바일 1열 자동 전환<br>- **카드 클릭** 시 레시피 상세 페이지로 이동 |
| **다음 이동** | 카드 클릭 → 레시피 상세 페이지, 결과 없음 → 빈 상태 페이지 |

---

### 레시피 상세 페이지

> **구현 기능:** `F002`, `F003`, `F006`, `F011`, `F013` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 개별 레시피의 전체 내용을 소비하는 핵심 콘텐츠 페이지 |
| **진입 경로** | 메인 페이지 카드 클릭 (슬러그 기반 동적 라우팅) |
| **사용자 행동** | 대표 이미지와 제목을 확인하고, 조리 시간/난이도 Overview를 본 뒤, 재료를 체크하며 조리 순서를 따라 요리 |
| **주요 기능** | - Header: 대표 이미지(full-width), 제목, 카테고리 배지, 작성일 표시<br>- Overview Area: 조리 시간(Lucide 시계 아이콘)과 난이도(Lucide 아이콘) 직관적 배치<br>- Tags: 태그 배지 목록 표시<br>- Ingredients Section: 재료 항목을 체크박스 UI로 표시. 클릭 시 취소선 처리 (클라이언트 상태)<br>- Cooking Steps: notion-to-md 변환 마크다운을 react-markdown 또는 커스텀 렌더러로 렌더링<br>- Floating Action: '목록으로 돌아가기' 버튼, '상단으로 이동' 버튼 (스크롤 감지 후 표시) |
| **다음 이동** | 목록으로 돌아가기 버튼 → 메인 페이지 |

---

### 빈 상태 페이지

> **구현 기능:** `F007` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 검색 또는 카테고리 필터 결과가 없을 때 사용자에게 안내하는 페이지 |
| **진입 경로** | 메인 페이지에서 검색 또는 필터 결과가 0개일 때 조건부 렌더링 |
| **사용자 행동** | 결과 없음 안내를 확인하고 검색어를 바꾸거나 전체 목록으로 이동 |
| **주요 기능** | - 안내 문구: "해당하는 레시피가 없습니다. 다른 레시피를 찾아보세요."<br>- **전체 목록 보기** 버튼: 검색어/필터 초기화 후 전체 목록 복원 |
| **다음 이동** | 전체 목록 보기 → 메인 페이지 (필터 초기화) |

---

### 404 페이지

> **구현 기능:** `F008` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 존재하지 않는 슬러그 또는 경로 접근 시 안내 페이지 |
| **진입 경로** | 잘못된 URL 직접 접근 |
| **사용자 행동** | 오류 안내를 확인하고 메인 페이지로 이동 |
| **주요 기능** | - 안내 문구: "페이지를 찾을 수 없습니다."<br>- **메인으로 돌아가기** 버튼 |
| **다음 이동** | 메인으로 돌아가기 → 메인 페이지 |

---

## 데이터 모델

### Notion 데이터베이스 속성 (읽기 전용)

| 필드명 | Notion 속성 타입 | 설명 |
|--------|-----------------|------|
| name | Title | 레시피 제목 (예: 버리 리조또와 오리 가슴살 스테이크) |
| slug | Rich Text | URL 슬러그 (예: barley-risotto-duck) |
| category | Select | 카테고리 (메인 요리 / 디저트 / 안주 / 간편식) |
| tags | Multi-select | 태그 배열 (예: #다이어트, #자취요리) |
| cover | Files & Media | 대표 이미지 URL |
| time | Number | 조리 시간 (단위: 분) |
| difficulty | Select | 난이도 (쉬움 / 보통 / 어려움) |
| published | Checkbox | 공개 여부 (true인 경우만 노출) |
| date | Created Time | 작성일 (자동 생성, 최신순 정렬 기준) |

### 애플리케이션 타입 정의

```typescript
// Notion 데이터베이스 레시피 목록 아이템
type Recipe = {
  id: string;
  name: string;
  slug: string;
  category: string;
  tags: string[];
  coverUrl: string | null;
  time: number | null;
  difficulty: '쉬움' | '보통' | '어려움' | null;
  published: boolean;
  date: string;
};

// 레시피 상세 (본문 포함)
type RecipeDetail = Recipe & {
  content: string; // notion-to-md 변환 마크다운
};
```

### Notion 페이지 본문 구조 (작성 규칙)

Notion 페이지 본문은 아래 순서로 작성한다. `notion-to-md` 라이브러리로 마크다운 변환 후 렌더링한다.

**재료 목록은 반드시 Notion의 `To-do` 블록으로 작성한다.** `notion-to-md`가 `- [ ] 재료명` 형태의 마크다운으로 변환하며, `react-markdown`의 `components.input`을 커스터마이징하여 클릭 시 체크 처리(취소선)하는 인터랙티브 체크박스로 구현한다.

```
## 재료
☐ 쌀 1컵          ← Notion To-do 블록 (체크 해제 상태)
☐ 닭가슴살 200g   ← Notion To-do 블록 (체크 해제 상태)
☐ 올리브오일 2큰술 ← Notion To-do 블록 (체크 해제 상태)
...

## 조리 순서
1. 재료를 손질한다.
2. 팬에 기름을 두르고 볶는다.
...
```

`notion-to-md` 변환 결과 (마크다운):

```markdown
## 재료
- [ ] 쌀 1컵
- [ ] 닭가슴살 200g
- [ ] 올리브오일 2큰술

## 조리 순서
1. 재료를 손질한다.
2. 팬에 기름을 두르고 볶는다.
```

---

## 기술 스택

### 프론트엔드 프레임워크

- **Next.js 15.5.3** (App Router + Turbopack) - SSG/ISR 기반 정적 생성
- **TypeScript 5** - 타입 안전성 보장
- **React 19.1.0** - UI 라이브러리

### 스타일링 & UI

- **TailwindCSS v4** (설정 파일 없는 새로운 CSS 엔진)
- **shadcn/ui** (new-york style) - Input, Badge, Button, Card 컴포넌트
- **Lucide React** - 조리 시간, 난이도 아이콘

### Notion CMS 연동

- **@notionhq/client** - Notion API 공식 클라이언트. 데이터베이스 쿼리 및 페이지 조회
- **notion-to-md** - Notion 블록을 마크다운으로 변환
- **react-markdown** - 마크다운 문자열을 React 컴포넌트로 렌더링
- **remark-gfm** - react-markdown에서 GFM(GitHub Flavored Markdown) 파싱 지원. `- [ ]` 체크박스 렌더링에 필수

### 배포 & 호스팅

- **Vercel** - Next.js 15 최적화 배포 플랫폼. 환경 변수 관리

### 패키지 관리

- **npm** - 의존성 관리

---

## 환경 변수

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxx
```

---

## Notion 이미지 전략 (Critical)

Notion에 직접 업로드된 이미지는 AWS S3 서명 URL로 제공되며 **약 1시간 후 만료**된다. 이미지가 만료되면 빌드된 페이지에서 이미지가 표시되지 않는 문제가 발생한다.

### 권장 방식: 외부 이미지 호스팅 (기본 운영 방식)

Notion 페이지의 대표 이미지(cover)와 본문 이미지를 **외부 이미지 호스팅 서비스**에 업로드하고 해당 URL을 Notion 속성에 입력하거나 본문에 삽입한다.

- **Cloudinary** - 무료 플랜 25GB 제공. 이미지 변환/최적화 API 내장
- **imgbb** - 무료 무제한 이미지 호스팅. API 업로드 지원

외부 호스팅 이미지는 URL이 만료되지 않으며 Next.js Image 컴포넌트로 최적화할 수 있다. `next.config.ts`의 `images.remotePatterns`에 해당 도메인을 추가한다.

### 대안: Notion 내부 이미지 사용 시 이미지 프록시 구현

Notion 내부 이미지를 반드시 사용해야 하는 경우, Next.js API Route로 이미지 프록시를 구현한다. 프록시는 요청 시점에 Notion API로 최신 서명 URL을 재조회하여 이미지를 스트리밍 반환한다.

```typescript
// src/app/api/image/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'url 파라미터가 필요합니다.' }, { status: 400 });
  }

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return NextResponse.json({ error: '이미지를 불러올 수 없습니다.' }, { status: response.status });
  }

  const contentType = response.headers.get('content-type') ?? 'image/jpeg';
  const imageBuffer = await response.arrayBuffer();

  return new NextResponse(imageBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=60',
    },
  });
}
```

SSRF 방지를 위해 허용된 도메인만 프록시하도록 화이트리스트 검증을 권장한다.

```typescript
const ALLOWED_HOSTS = [
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'www.notion.so',
];
const url = new URL(imageUrl);
if (!ALLOWED_HOSTS.includes(url.hostname)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

이미지 프록시 사용 시 이미지 URL을 `/api/image?url=<원본URL>` 형태로 변환하여 사용한다.

---

## 주요 구현 패턴

### 1. Notion API 데이터 페칭 (서버 컴포넌트)

```typescript
// src/lib/notion.ts
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Published 레시피 목록 조회 (최신순)
export async function getRecipes(): Promise<Recipe[]> { ... }

// 슬러그로 레시피 단건 조회
export async function getRecipeBySlug(slug: string): Promise<RecipeDetail | null> { ... }

// 레시피 본문을 마크다운으로 변환
export async function getRecipeContent(pageId: string): Promise<string> { ... }
```

### 2. ISR revalidation 전략

Notion 데이터 갱신 시 재배포 없이 콘텐츠를 반영하기 위해 ISR(Incremental Static Regeneration)을 사용한다.

```typescript
// src/app/page.tsx (목록 페이지)
export const revalidate = 3600; // 1시간마다 재생성

// src/app/recipe/[slug]/page.tsx (상세 페이지)
export const revalidate = 86400; // 24시간마다 재생성
```

상세 페이지는 빌드 시 `generateStaticParams`로 모든 슬러그를 정적 생성한다.

```typescript
// src/app/recipe/[slug]/page.tsx
export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}
```

### 3. 카테고리 필터 & 검색 (클라이언트 상태)

목록 페이지에서 검색어와 카테고리 선택은 `useState` + 디바운싱으로 관리한다. 전체 레시피는 서버에서 한 번에 가져오고 클라이언트에서 필터링한다. React Hook Form / Zod는 이 프로젝트에 불필요하므로 사용하지 않는다.

### 4. 재료 체크박스 (클라이언트 컴포넌트)

재료 체크 상태는 페이지 새로고침 시 초기화되는 클라이언트 상태(useState)로 관리한다. 서버와 동기화하지 않는다.

`react-markdown`의 `components` prop으로 `input` 요소를 커스터마이징하여 체크 시 취소선 처리를 구현한다. `- [ ]` GFM 체크박스 렌더링을 위해 `remarkGfm` 플러그인이 필수이다.

```tsx
// src/components/recipe/IngredientList.tsx
import remarkGfm from 'remark-gfm'

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    input: ({ checked }) => (
      <IngredientCheckbox defaultChecked={checked ?? false} />
    ),
  }}
>
  {content}
</ReactMarkdown>
```

### 5. 이미지 프록시 API Route (Notion 내부 이미지 만료 대응)

Notion 내부 이미지 사용 시 만료된 URL 대응을 위해 Next.js API Route로 이미지 프록시를 구현한다.

```typescript
// src/app/api/image/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  // Notion 이미지 URL로 fetch 후 스트리밍 반환
  // Cache-Control: public, max-age=3600 헤더 적용
}
```

---

## 화면별 컴포넌트 구조

```
src/
├── app/
│   ├── page.tsx                    # 메인 페이지 (서버 컴포넌트)
│   ├── loading.tsx                 # 전역 로딩 UI
│   ├── error.tsx                   # 전역 에러 바운더리 (클라이언트)
│   ├── not-found.tsx               # 404 페이지
│   ├── recipe/
│   │   └── [slug]/
│   │       ├── page.tsx            # 레시피 상세 페이지 (서버 컴포넌트)
│   │       └── loading.tsx         # 상세 페이지 스켈레톤 UI
│   └── api/
│       └── image/
│           └── route.ts            # 이미지 프록시 API Route (Notion 이미지 만료 대응)
│
├── components/
│   ├── recipe/
│   │   ├── RecipeGrid.tsx          # 레시피 카드 그리드
│   │   ├── RecipeCard.tsx          # 개별 레시피 카드
│   │   ├── RecipeFilter.tsx        # 카테고리 필터 칩 (클라이언트)
│   │   ├── RecipeSearch.tsx        # 검색바 + 디바운싱 (클라이언트)
│   │   ├── RecipeContent.tsx       # Notion 본문 마크다운 렌더러
│   │   ├── IngredientList.tsx      # 재료 체크박스 목록 - react-markdown 래퍼 + IngredientCheckbox 포함 (클라이언트)
│   │   ├── IngredientCheckbox.tsx  # 재료 체크박스 단일 아이템 컴포넌트 (react-markdown components.input 커스터마이징용)
│   │   └── FloatingActions.tsx     # Floating 액션 버튼 (클라이언트)
│   └── ui/                         # shadcn/ui 컴포넌트
│
└── lib/
    └── notion.ts                   # Notion API 유틸리티 함수
```

---

## 비기능 요구사항

| 항목 | 요구사항 |
|------|---------|
| **성능** | Lighthouse 성능 점수 90점 이상. Next.js Image 컴포넌트로 이미지 최적화 필수 |
| **접근성** | 시맨틱 HTML 사용. 이미지 alt 속성 필수 |
| **반응형** | 모바일(375px) ~ 데스크톱(1440px) 모든 뷰포트 지원 |
| **SEO** | 각 레시피 상세 페이지에 generateMetadata로 제목/설명 메타 태그 설정 |
| **캐싱** | 목록 페이지 `revalidate = 3600` (1시간), 상세 페이지 `revalidate = 86400` (24시간). 이미지 프록시 API Route에 `Cache-Control: public, max-age=3600` 헤더 적용 |
| **타입 안전성** | any 타입 사용 금지. Notion API 응답 타입 명시적 정의 |
| **Notion Rate Limit** | Notion API 초당 평균 3회 제한 (429 응답 시 Retry-After 헤더 기반 재시도). API 오류 시 graceful fallback 처리 |

---

## MVP 범위 및 구현 단계

### MVP 포함 기능

- Notion API 연동 (목록 + 상세 + 본문 변환)
- 레시피 목록 페이지 (카드 그리드, 검색, 카테고리 필터)
- 레시피 상세 페이지 (이미지, Overview, 재료 체크박스, 본문 렌더링)
- 빈 상태 및 404 페이지
- 반응형 디자인

### MVP 제외 기능

- 사용자 인증 (공개 사이트로 운영)
- 관리자 페이지 (Notion에서 직접 관리)
- 댓글 / 좋아요
- 조리 타이머

### 구현 단계

#### 1단계: 프로젝트 설정 및 Notion 연동

```bash
npm install @notionhq/client notion-to-md react-markdown remark-gfm
```

- `.env.local` 파일에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 설정
- Notion 데이터베이스 생성 및 Integration 연결
- `src/lib/notion.ts` 구현 (getRecipes, getRecipeBySlug, getRecipeContent)
- `next.config.ts`에 Notion 이미지 도메인 허용 설정:

```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
    { protocol: 'https', hostname: 'www.notion.so' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

#### 2단계: 레시피 목록 페이지 구현

- `RecipeCard`, `RecipeGrid` 컴포넌트 구현
- `RecipeSearch`, `RecipeFilter` 클라이언트 컴포넌트 구현
- 메인 페이지(`app/page.tsx`) 서버 컴포넌트로 조합

#### 3단계: 레시피 상세 페이지 구현

- `app/recipe/[slug]/page.tsx` 동적 라우트 구현
- `generateStaticParams`, `generateMetadata` 설정
- `IngredientList` 체크박스 컴포넌트 구현
- `RecipeContent` 마크다운 렌더러 구현
- `FloatingActions` 컴포넌트 구현

#### 4단계: 빈 상태 및 404 페이지

- 검색/필터 결과 없음 UI 구현
- `app/not-found.tsx` 구현

#### 5단계: 스타일링 최적화 및 배포

- Tailwind CSS v4 스타일링 정리
- `loading.tsx`, `error.tsx` 전역 UI 구현
- Vercel 배포 및 환경 변수 설정
- Lighthouse 검사 및 성능 개선

---

*작성일: 2026-02-21*
