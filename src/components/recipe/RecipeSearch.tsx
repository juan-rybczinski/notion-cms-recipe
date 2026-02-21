'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebounceCallback } from 'usehooks-ts'

export function RecipeSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // 검색어 입력 후 300ms 디바운스 처리
  const handleSearch = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value.trim()) {
      params.set('search', value.trim())
    } else {
      params.delete('search')
    }

    // 검색어 변경 시 페이지를 첫 번째 페이지로 초기화
    params.delete('page')

    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }, 300)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value)
    },
    [handleSearch]
  )

  return (
    <div className="relative max-w-sm">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="레시피 검색..."
        defaultValue={searchParams.get('search') ?? ''}
        onChange={handleChange}
        className="pl-9"
        aria-label="레시피 검색"
        disabled={isPending}
      />
    </div>
  )
}
