import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} 나만의 레시피 모음. Notion CMS 기반
              레시피 아카이브.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
