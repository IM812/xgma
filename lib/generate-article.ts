import { generateText, Output } from 'ai'
import { z } from 'zod'
import type { Topic } from './articles'
import { site } from './site'

const articleSchema = z.object({
  lead: z.string().describe('Вводный абзац, 2–3 предложения'),
  sections: z
    .array(
      z.object({
        heading: z.string(),
        paragraphs: z.array(z.string()).min(1).max(4),
        bullets: z.array(z.string()).max(6).optional(),
      }),
    )
    .min(4)
    .max(7),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).min(2).max(4),
})

export type Article = z.infer<typeof articleSchema> & { generatedAt: string }

export async function generateArticle(topic: Topic): Promise<Article> {
  const { output } = await generateText({
    model: 'anthropic/claude-haiku-5.5',
    output: Output.object({ schema: articleSchema }),
    system: `Ты — технический редактор компании «${site.name}», которая поставляет и обслуживает спецтехнику XGMA (Xiamen XGMA Machinery, Китай) в России.
Пиши на грамотном русском языке, по делу, для владельцев, механиков и закупщиков техники.
Правила:
- Не выдумывай точные цифры, цены и сертификаты. Если приводишь характеристики — давай ориентировочные значения со словами «около», «порядка» и советуй уточнять у менеджера.
- Без воды, рекламных штампов и эмодзи. Конкретные практические советы.
- Учитывай российские условия: климат, дороги, лизинг, доступность запчастей.
- В последнем разделе мягко предложи обратиться в «${site.name}» за подбором техники или сервисом.`,
    prompt: `Напиши статью для блога.
Тема: «${topic.title}»
Рубрика: ${topic.rubric}
Что раскрыть: ${topic.brief}
Объём: 700–1000 слов.`,
  })

  return { ...output, generatedAt: new Date().toISOString() }
}
