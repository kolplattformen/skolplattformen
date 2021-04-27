import * as h2m from 'h2m'
import { htmlDecode } from 'js-htmlencode'
import { decode } from 'he'
import { parse, HTMLElement, TextNode } from 'node-html-parser'

const noChildren = ['strong', 'b', 'em', 'i', 'u', 's']
const trimNodes = [...noChildren, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'a']
const cleanText = (node: TextNode, parentType: string): TextNode => {
  const text =
    parentType && trimNodes.includes(parentType.toLowerCase())
      ? node.rawText.trim()
      : node.rawText
  return new TextNode(text)
}

const deepClean = (node: HTMLElement): HTMLElement => {
  const attributes = Object.entries(node.attributes)
    .map(([key, val]) => {
      if (key === 'href' && val) {
        // eslint-disable-next-line no-param-reassign
        val = val.replace(/ /g, '%20')
      }
      return `${key}="${val}"`
    })
    .join(' ')
  const cleaned = new HTMLElement(node.tagName, {}, attributes, node.parentNode)
  node.childNodes.forEach((childNode) => {
    if (childNode instanceof HTMLElement) {
      if (node.tagName && noChildren.includes(node.tagName.toLowerCase())) {
        cleaned.childNodes.push(
          cleanText(new TextNode(childNode.innerText), node.tagName)
        )
      } else {
        cleaned.childNodes.push(deepClean(childNode))
      }
    } else if (childNode instanceof TextNode) {
      cleaned.childNodes.push(cleanText(childNode, node.tagName))
    }
  })
  return cleaned
}

const rearrangeWhitespace = (html: string = ''): string => {
  let content = html.split('&#160;').join('&amp;nbsp;')
  trimNodes.forEach((trimNode) => {
    content = content.split(`<${trimNode}> `).join(` <${trimNode}>`)
    content = content.split(` </${trimNode}>`).join(`</${trimNode}> `)
    content = content.split(`<${trimNode}>&amp;nbsp;`).join(`&amp;nbsp;<${trimNode}>`)
    content = content.split(`&amp;nbsp;</${trimNode}>`).join(`</${trimNode}>&amp;nbsp;`)
  })
  return content
}

export const clean = (html: string = ''): string =>
  deepClean(parse(decode(html))).outerHTML

interface Node {
  name: string
  attrs: { [key: string]: string }
  isInPreNode: boolean
  md: string
}
const converter = 'MarkdownExtra'
const overides = {
  a: (node: Node) => `[${node.md}](${node.attrs.href})`,
  img: (node: Node) => `![${node.attrs.title || ''}](${node.attrs.src})`,
  i: (node: Node) => `*${node.md}*`,
  b: (node: Node) => `**${node.md}**`,
}

export const toMarkdown = (html: string): string => {
  const rearranged = rearrangeWhitespace(html)
  const trimmed = clean(rearranged)
  const markdown = h2m(trimmed, { overides, converter })
  const decoded = htmlDecode(markdown)
  return decoded
}
