import { etjanst } from './etjanst'
import { toMarkdown } from '../parseHtml'
import { NewsItem } from '../types'
import { parseDate } from '../utils/dateHandling'

const IMAGE_HOST =
  'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url='

export const newsItem = ({
  newsId,
  header,
  preamble,
  body,
  bannerImageUrl,
  pubDateSe,
  modDateSe,
  authorDisplayName,
  altText,
}: any): NewsItem => ({
  header,
  published: parseDate(pubDateSe) || '',
  modified: parseDate(modDateSe) || '',
  id: newsId,
  author: authorDisplayName,
  intro: preamble.replace(/([!,.])(\w)/gi, '$1 $2'),
  imageUrl: bannerImageUrl,
  fullImageUrl: `${IMAGE_HOST}${bannerImageUrl}`,
  imageAltText: altText,
  body: toMarkdown(body),
})

export const news = (data: any): NewsItem[] =>
  etjanst(data).newsItems.map(newsItem)

export const newsItemDetails = (data: any): NewsItem =>
  newsItem(etjanst(data).currentNewsItem)
