import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChefHat } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Recipe } from '@/lib/notion'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.slug}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
        {/* 커버 이미지 영역 */}
        <div className="bg-muted relative aspect-video overflow-hidden">
          {recipe.coverUrl ? (
            <Image
              src={recipe.coverUrl}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            // 커버 이미지가 없을 때 플레이스홀더
            <div className="flex h-full items-center justify-center">
              <ChefHat className="text-muted-foreground h-12 w-12" />
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* 카테고리 뱃지 */}
          <Badge variant="secondary" className="mb-2">
            {recipe.category}
          </Badge>

          {/* 레시피 이름 */}
          <h3 className="line-clamp-2 font-semibold">{recipe.name}</h3>

          {/* 태그 목록 */}
          {recipe.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {recipe.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        {/* 조리 시간 및 난이도 */}
        {(recipe.time !== null || recipe.difficulty !== null) && (
          <CardFooter className="border-t px-4 py-3">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              {recipe.time !== null && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {recipe.time}분
                </span>
              )}
              {recipe.difficulty !== null && <span>{recipe.difficulty}</span>}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
