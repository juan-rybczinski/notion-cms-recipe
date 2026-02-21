import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, ChefHat } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/layout/container'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import type { Metadata } from 'next'
import type { RecipeDetail } from '@/lib/notion'

// ISR: 1시간마다 재검증
export const revalidate = 3600

// 목업 상세 데이터 - Notion API 연동 전까지 사용
const MOCK_DETAIL: RecipeDetail = {
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
  content: `## 조리 방법\n\n1. 돼지고기를 한 입 크기로 썰어 둡니다.\n2. 김치를 적당한 크기로 자릅니다.\n3. 냄비에 참기름을 두르고 돼지고기와 김치를 볶습니다.\n4. 물을 붓고 끓이다가 두부를 넣습니다.\n5. 간을 맞추고 파를 올려 마무리합니다.`,
  ingredients: [
    '묵은지 300g',
    '돼지고기 (목살 또는 삼겹살) 200g',
    '두부 1/2모',
    '대파 1대',
    '멸치 육수 2컵',
    '참기름 1큰술',
    '고추장 1큰술',
    '다진 마늘 1큰술',
  ],
}

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params

  // TODO: Notion API 연동 후 getRecipeBySlug 함수로 교체
  const recipe = MOCK_DETAIL.slug === slug ? MOCK_DETAIL : null

  if (!recipe) {
    return { title: '레시피를 찾을 수 없습니다' }
  }

  return {
    title: recipe.name,
    description: `${recipe.category} 레시피 - ${recipe.tags.join(', ')}`,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params

  // TODO: Notion API 연동 후 getRecipeBySlug 함수로 교체
  // const recipe = await getRecipeBySlug(slug)
  const recipe = MOCK_DETAIL.slug === slug ? MOCK_DETAIL : null

  if (!recipe) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 커버 이미지 */}
        {recipe.coverUrl && (
          <div className="relative h-64 w-full md:h-96">
            <Image
              src={recipe.coverUrl}
              alt={recipe.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <Container className="py-10">
          {/* 뒤로가기 링크 */}
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            레시피 목록으로
          </Link>

          <div className="mx-auto max-w-3xl">
            {/* 레시피 헤더 정보 */}
            <header className="mb-8">
              <Badge variant="secondary" className="mb-3">
                {recipe.category}
              </Badge>

              <h1 className="text-3xl font-bold md:text-4xl">{recipe.name}</h1>

              {/* 메타 정보 */}
              <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
                {recipe.time !== null && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.time}분
                  </span>
                )}
                {recipe.difficulty !== null && (
                  <span className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    {recipe.difficulty}
                  </span>
                )}
              </div>

              {/* 태그 */}
              {recipe.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {recipe.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-muted-foreground bg-muted rounded px-2 py-0.5 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <Separator className="my-6" />

            {/* 재료 목록 - 체크박스로 표시 */}
            {recipe.ingredients.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">재료</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Checkbox id={`ingredient-${index}`} />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className="cursor-pointer text-sm"
                      >
                        {ingredient}
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Separator className="my-6" />

            {/* 조리 순서 - Notion 본문 렌더링 영역 */}
            {/* TODO: react-markdown + remark-gfm 설치 후 실제 콘텐츠 렌더링 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">만드는 방법</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <pre className="text-sm whitespace-pre-wrap">
                  {recipe.content}
                </pre>
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
