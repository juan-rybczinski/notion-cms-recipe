import { RecipeCard } from './RecipeCard'
import type { Recipe } from '@/lib/notion'

interface RecipeGridProps {
  recipes: Recipe[]
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  // 레시피가 없는 경우 빈 상태 표시
  if (recipes.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground text-lg">
          등록된 레시피가 없습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
