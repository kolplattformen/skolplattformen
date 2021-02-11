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
        <a href="#">link</a>
        <table>
          <tbody>
            <tr>
              <td>left 1</td>
              <td>right 1</td>
            </tr>
            <tr>
              <td>left 2</td>
              <td>right 2</td>
            </tr>
          </tbody>
        </table>
      </div>`
      const expected = `# Hello #
**World**
- Foo

[link](#)

|left 1|right 1|
|--------|--------|
|left 2|right 2|`

      expect(toMarkdown(html)).toEqual(expected)
    })
  })
})