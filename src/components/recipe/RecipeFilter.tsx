'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { RecipeCategory } from '@/lib/notion'

// 필터 카테고리 목록
const CATEGORIES: { label: string; value: RecipeCategory | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '한식', value: '한식' },
  { label: '양식', value: '양식' },
  { label: '일식', value: '일식' },
  { label: '중식', value: '중식' },
  { label: '간식', value: '간식' },
  { label: '디저트', value: '디저트' },
  { label: '음료', value: '음료' },
  { label: '기타', value: '기타' },
]

export function RecipeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') ?? 'all'

  // 카테고리 선택 시 URL 파라미터 업데이트
  const handleSelect = (value: RecipeCategory | 'all') => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }

    // 카테고리 변경 시 페이지를 첫 번째 페이지로 초기화
    params.delete('page')
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(({ label, value }) => (
        <button key={value} onClick={() => handleSelect(value)}>
          <Badge
            variant={currentCategory === value ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer transition-colors',
              currentCategory === value
                ? ''
                : 'hover:bg-secondary hover:text-secondary-foreground'
            )}
          >
            {label}
          </Badge>
        </button>
      ))}
    </div>
  )
}
