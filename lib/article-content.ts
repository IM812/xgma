import type { Topic } from './articles'
import { articleTexts } from './article-texts'
import { generateArticle, type Article } from './generate-article'

/** Returns the edited static text; falls back to live AI generation only for topics without one. */
export async function getArticle(topic: Topic): Promise<Article> {
  return articleTexts[topic.slug] ?? generateArticle(topic)
}
