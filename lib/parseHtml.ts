import * as h2m from 'h2m'
import { htmlDecode } from 'js-htmlencode'

export const trim = (html: string): string => html
  .replace(/&#160;/g, ' ')
  .split('>')
  .map((token) => token.trim())
  .join('>')
  .split('</')
  .map((token) => token.trim())
  .join('</')

export const toMarkdown = (html: string): string => {
  const trimmed = trim(html)
  const markdown = h2m(trimmed)
  const decoded = htmlDecode(markdown)
  return decoded
}
