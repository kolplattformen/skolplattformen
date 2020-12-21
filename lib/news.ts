import { etjanst, newsItem } from './parse'
import routes from './routes'
import { Fetch, NewsItem, RequestInit } from './types'

export class News {
  public items: NewsItem[]

  constructor(items: NewsItem[]) {
    this.items = items
  }
}

export const news = (fetch: Fetch, init?: RequestInit) => async (childId: string): Promise<News> => {
  const url = routes.news(childId)
  const response = await fetch(url, init)
  const data = await response.json()
  return new News(etjanst(data).newsItems.map(newsItem))
}
