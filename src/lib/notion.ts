// Notion API 유틸리티 - 타입 정의 및 함수 시그니처
// 실제 API 연동은 @notionhq/client 설치 후 구현

// 레시피 난이도 타입
export type Difficulty = '쉬움' | '보통' | '어려움'

// 레시피 카테고리 타입
export type RecipeCategory =
  | '한식'
  | '양식'
  | '일식'
  | '중식'
  | '간식'
  | '디저트'
  | '음료'
  | '기타'

// 레시피 목록에서 사용하는 기본 타입
export type Recipe = {
  id: string
  name: string
  slug: string
  category: RecipeCategory
  tags: string[]
  coverUrl: string | null
  // 조리 시간 (분 단위)
  time: number | null
  difficulty: Difficulty | null
  published: boolean
  date: string
}

// 레시피 상세 페이지에서 사용하는 타입 (Notion 본문 포함)
export type RecipeDetail = Recipe & {
  // notion-to-md로 변환된 마크다운 콘텐츠
  content: string
  // 재료 목록 (Notion 속성에서 추출)
  ingredients: string[]
}

// 레시피 목록 조회 파라미터
export type GetRecipesParams = {
  category?: RecipeCategory
  search?: string
  page?: number
  pageSize?: number
}

// 레시피 목록 조회 결과
export type GetRecipesResult = {
  recipes: Recipe[]
  total: number
  hasMore: boolean
}

/**
 * Notion 데이터베이스에서 레시피 목록을 조회합니다.
 * @param params - 필터링 및 페이지네이션 파라미터
 * TODO: @notionhq/client 설치 후 구현
 */
export async function getRecipes(
  _params?: GetRecipesParams
): Promise<GetRecipesResult> {
  // TODO: Notion API 연동 구현
  // const notion = new Client({ auth: env.NOTION_API_KEY })
  throw new Error('아직 구현되지 않았습니다. Notion API 연동이 필요합니다.')
}

/**
 * slug로 레시피 상세 정보를 조회합니다.
 * @param slug - 레시피 슬러그
 * TODO: @notionhq/client + notion-to-md 설치 후 구현
 */
export async function getRecipeBySlug(
  _slug: string
): Promise<RecipeDetail | null> {
  // TODO: Notion API 연동 구현
  // const notion = new Client({ auth: env.NOTION_API_KEY })
  throw new Error('아직 구현되지 않았습니다. Notion API 연동이 필요합니다.')
}

/**
 * 정적 경로 생성을 위해 모든 레시피 slug를 반환합니다.
 * TODO: @notionhq/client 설치 후 구현
 */
export async function getAllRecipeSlugs(): Promise<string[]> {
  // TODO: Notion API 연동 구현
  throw new Error('아직 구현되지 않았습니다. Notion API 연동이 필요합니다.')
}
