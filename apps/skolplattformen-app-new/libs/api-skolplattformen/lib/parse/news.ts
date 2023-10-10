import {NewsItem, parseDate, toMarkdown} from '../../../../libs/api/lib';
import {etjanst} from './etjanst';

const IMAGE_HOST =
  'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url=';

export const newsItem = ({
  newsId,
  header,
  preamble,
  body,
  bannerImageUrl,
  publicationDate,
  modifiedDate,
  authorDisplayName,
  altText,
}: any): NewsItem => ({
  header,
  published: parseDate(publicationDate) || '',
  modified: parseDate(modifiedDate) || '',
  id: newsId,
  author: authorDisplayName,
  intro: preamble.replace(/([!,.])(\w)/gi, '$1 $2'),
  imageUrl: bannerImageUrl,
  fullImageUrl: `${IMAGE_HOST}${bannerImageUrl}`,
  imageAltText: altText,
  body: toNonEmptyMarkdownString(body),
});

// Fixes https://github.com/kolplattformen/skolplattformen/issues/525
const toNonEmptyMarkdownString = (str: string): string => {
  const res = toMarkdown(str);
  if (res?.length === 0) return ' ';
  return res;
};

const newsSort = (item1: NewsItem, item2: NewsItem): number => {
  const m1 = item1.modified || item1.published;
  const m2 = item2.modified || item2.published;
  return m1 && m2 && m1 < m2 ? 1 : -1; //! changed this
};

export const news = (data: any): NewsItem[] =>
  etjanst(data).newsItems.map(newsItem).sort(newsSort);

export const newsItemDetails = (data: any): NewsItem =>
  newsItem(etjanst(data).currentNewsItem);
