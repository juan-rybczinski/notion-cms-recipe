import Link from 'next/link'
import { ChefHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center">
        <Container>
          <div className="mx-auto max-w-md py-20 text-center">
            <ChefHat className="text-muted-foreground mx-auto mb-6 h-16 w-16" />

            <h1 className="mb-2 text-4xl font-bold">404</h1>
            <h2 className="mb-4 text-xl font-semibold">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-muted-foreground mb-8">
              찾으시는 레시피 또는 페이지가 존재하지 않거나 삭제되었습니다.
            </p>

            <Button asChild>
              <Link href="/">레시피 목록으로 돌아가기</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
