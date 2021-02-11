import { trim, toMarkdown } from './parseHtml'

describe('parseHtml', () => {
  describe('trim', () => {
    it('trims tag content', () => {
      const html = `<div>
        <b>Hello </b>
        <i> World</i>
        <u>&#160;!&#160;</u>
      </div>`

      expect(trim(html)).toEqual('<div><b>Hello</b><i>World</i><u>!</u></div>')
    })
  })
  describe('toMarkdown', () => {
    it('turns html into Markdown', () => {
      const html = `<div>
        <h1>Hello </h1>
        <strong> World</strong>
        <ul>
          <li> Foo </li>
        </ul>
      </div>`
      const expected = '# Hello\n**World**\n- Foo'

      expect(toMarkdown(html)).toEqual(expected)
    })
  })
})