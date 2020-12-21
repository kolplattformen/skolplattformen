import { etjanst, newsItem } from './parse'
import routes from './routes'
import { Fetch, NewsItem, RequestInit } from './types'

export const news = (fetch: Fetch, init?: RequestInit) => async (childId: string): Promise<NewsItem[]> => {
  const url = routes.news(childId)
  const response = await fetch(url, init)
  const data = await response.json()
  return etjanst(data).newsItems.map(newsItem)
}
