import { Container } from '@/components/layout/container'

export function HeroSection() {
  return (
    <section className="border-b py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            나만의 레시피 모음
          </h1>

          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Notion으로 관리하는 나만의 레시피 아카이브
          </p>
        </div>
      </Container>
    </section>
  )
}
