import { z } from 'zod'

// Notion API 환경변수 스키마 정의
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // Notion Integration API 키
  NOTION_API_KEY: z.string().min(1, 'NOTION_API_KEY가 필요합니다'),
  // 레시피 데이터베이스 ID
  NOTION_DATABASE_ID: z.string().min(1, 'NOTION_DATABASE_ID가 필요합니다'),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
})

export type Env = z.infer<typeof envSchema>
