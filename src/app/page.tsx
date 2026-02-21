import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero'
import { Container } from '@/components/layout/container'
import { RecipeGrid } from '@/components/recipe/RecipeGrid'
import { RecipeFilter } from '@/components/recipe/RecipeFilter'
import { RecipeSearch } from '@/components/recipe/RecipeSearch'
import { Skeleton } from '@/components/ui/skeleton'
import type { Recipe, RecipeCategory } from '@/lib/notion'

// ISR: 1시간마다 재검증
export const revalidate = 3600

// 목업 데이터 - Notion API 연동 전까지 사용
const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: '김치찌개',
    slug: 'kimchi-jjigae',
    category: '한식',
    tags: ['찌개', '김치', '돼지고기'],
    coverUrl: null,
    time: 30,
    difficulty: '쉬움',
    published: true,
    date: '2024-01-15',
  },
  {
    id: '2',
    name: '파스타 카르보나라',
    slug: 'pasta-carbonara',
    category: '양식',
    tags: ['파스타', '크림', '베이컨'],
    coverUrl: null,
    time: 25,
    difficulty: '보통',
    published: true,
    date: '2024-01-20',
  },
  {
    id: '3',
    name: '초코 브라우니',
    slug: 'chocolate-brownie',
    category: '디저트',
    tags: ['초콜릿', '베이킹', '디저트'],
    coverUrl: null,
    time: 45,
    difficulty: '보통',
    published: true,
    date: '2024-02-01',
  },
]

interface HomePageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    page?: string
  }>
}

// 레시피 그리드 로딩 스켈레톤
function RecipeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border">
          <Skeleton className="aspect-video w-full" />
          <div className="p-4">
            <Skeleton className="mb-2 h-5 w-20" />
            <Skeleton className="h-6 w-3/4" />
            <div className="mt-2 flex gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const category = params.category as RecipeCategory | undefined
  const search = params.search

  // TODO: Notion API 연동 후 getRecipes 함수로 교체
  // const { recipes } = await getRecipes({ category, search })
  const recipes = MOCK_RECIPES.filter(recipe => {
    if (category && recipe.category !== category) return false
    if (search && !recipe.name.includes(search)) return false
    return true
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        <Container className="py-10">
          {/* 검색 및 필터 영역 */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Suspense fallback={<Skeleton className="h-9 w-full max-w-sm" />}>
              <RecipeSearch />
            </Suspense>

            <Suspense
              fallback={
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-14" />
                  ))}
                </div>
              }
            >
              <RecipeFilter />
            </Suspense>
          </div>

          {/* 레시피 그리드 */}
          <Suspense fallback={<RecipeGridSkeleton />}>
            <RecipeGrid recipes={recipes} />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
