import { clean, toMarkdown } from './parseHtml'

describe('parseHtml', () => {
  describe('clean', () => {
    it('cleans tag content', () => {
      const html = `
      <div>
        <b>Hello </b>
        <i> World</i>
        <u>&#160;!&#160;</u>
      </div>`

      const expected = `
      <DIV>
        <B>Hello</B>
        <I>World</I>
        <U>!</U>
      </DIV>`

      expect(clean(html)).toEqual(expected)
    })
    it('handles missing html', () => {
      expect(() => clean()).not.toThrow()
    })
    it('handles links with spaces', () => {
      const html = `
      <div>
        <a href="/foo bar">Hello </a>
        <a href='/foo bar'> Hello &#160;</a>
      </div>`
      const expected = `
      <DIV>
        <A href="/foo%20bar">Hello</A>
        <A href="/foo%20bar">Hello</A>
      </DIV>`

      expect(clean(html)).toEqual(expected)
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
    it('handles real data', () => {
      const html = '\u003cdiv data-sp-rte=""\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eHej,\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eNu är det dags för vattenballongkrig  \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e12/2-21 till om med tisdag 16/2-21.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eAlla knep är tillåtna. \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003eDet blir kul.\u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eKolla in Reddit\u0026#58; \u003ca href="https\u0026#58;//reddit.com/water-balloons/where-to-buy/" data-cke-saved-href="https\u0026#58;//reddit.com/water-balloons/where-to-buy/"\u003ehttps\u0026#58;//reddit.com/water-balloons/where-to-buy/\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e...och här\u0026#58; \u003ca href="https\u0026#58;//reddit.com/splash-wars/" data-cke-saved-href="https\u0026#58;//reddit.com/splash-wars/"\u003ehttps\u0026#58;//reddit.com/splash-wars/\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003ch2\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eOm att vara hemma vid symtom\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/h2\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eÄven HackerNews är bra.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003ca href="https\u0026#58;//wnews.ycombinator.com/" data-cke-saved-href="https\u0026#58;//wnews.ycombinator.com/"\u003ehttps\u0026#58;//wnews.ycombinator.com/\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eVi fortsätter också att\u0026#58;\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cul\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003ehålla avstånd.\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eha flera digitala möten.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003etvätta händerna.\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eundvika kollektivtrafik om det är möjligt.\u003c/span\u003e\u003c/span\u003e\u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003c/ul\u003e\u003cul\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003estanna hemma även när man bara känner sig lite sjuk.\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003cli style="margin-left\u0026#58;32px;"\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003evädra ofta\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/li\u003e\u003c/ul\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eTa hand om er!\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003eHa kul tillsammans, på avstånd.\u003c/b\u003e\u0026#160; \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eStort tack för ert samarbete! \u0026#160;\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eVänligen, \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003erektorfnamn rektorenamn, rektor\u0026#160; \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003eVid frågor, kontakta oss gärna\u0026#58; \u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003e\u003cspan\u003eSkolledning\u003c/span\u003e\u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003erektorfnamn rektorenamn rektor\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;rektorfnamn.rektorenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;rektorfnamn.rektorenamn@edu.stockholm.se"\u003e\u003cspan\u003erektorfnamn.rektorenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003ebrektorfnamn brektorenamn, bitr. rektor\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;brektorfnamn.u.brektorenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;brektorfnamn.u.brektorenamn@edu.stockholm.se"\u003e\u003cspan\u003ebrektorfnamn.u.brektorenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eb2rektorfnamn b2rektorenamn bitr. rektor\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;b2rektorfnamn.b2rektorenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;b2rektorfnamn.b2rektorenamn@edu.stockholm.se"\u003e\u003cspan\u003eb2rektorfnamn.b2rektorenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cb\u003e\u003cspan\u003eSkolhälsan\u003c/span\u003e\u003c/b\u003e\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eb2rektorfnamn skolskstenamn skolsköterska\u0026#58; \u003c/span\u003e\u003ca href="mailto\u0026#58;b2rektorfnamn.skolskstenamn@edu.stockholm.se" data-cke-saved-href="mailto\u0026#58;b2rektorfnamn.skolskstenamn@edu.stockholm.se"\u003e\u003cspan\u003eb2rektorfnamn.skolskstenamn@edu.stockholm.se\u003c/span\u003e\u003c/a\u003e \u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003cp\u003e\u003cspan\u003e\u003cspan\u003e\u003cspan\u003eStort tack för ert samarbete!\u003c/span\u003e\u003c/span\u003e\u003c/span\u003e\u003c/p\u003e\u003c/div\u003e\u003cdiv data-sp-rte=""\u003e\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003c/div\u003e'
      const nbsp = String.fromCharCode(160)
      const expected = `Hej,

Nu är det dags för vattenballongkrig  12/2-21 till om med tisdag 16/2-21.

Alla knep är tillåtna. 

Det blir kul.

Kolla in Reddit: [https://reddit.com/water-balloons/where-to-buy/](https://reddit.com/water-balloons/where-to-buy/)

...och här: [https://reddit.com/splash-wars/](https://reddit.com/splash-wars/)

## Om att vara hemma vid symtom ##

Även HackerNews är bra.

[https://wnews.ycombinator.com/](https://wnews.ycombinator.com/)

Vi fortsätter också att:

- hålla avstånd.
- ha flera digitala möten.
- tvätta händerna.
- undvika kollektivtrafik om det är möjligt.

- stanna hemma även när man bara känner sig lite sjuk.
- vädra ofta

Ta hand om er!

Ha kul tillsammans, på avstånd.

Stort tack för ert samarbete! ${nbsp}

Vänligen, 

rektorfnamn rektorenamn, rektor${nbsp} 

Vid frågor, kontakta oss gärna:

Skolledning

rektorfnamn rektorenamn rektor: [rektorfnamn.rektorenamn@edu.stockholm.se](mailto:rektorfnamn.rektorenamn@edu.stockholm.se)

brektorfnamn brektorenamn, bitr. rektor: [brektorfnamn.u.brektorenamn@edu.stockholm.se](mailto:brektorfnamn.u.brektorenamn@edu.stockholm.se)

b2rektorfnamn b2rektorenamn bitr. rektor: [b2rektorfnamn.b2rektorenamn@edu.stockholm.se](mailto:b2rektorfnamn.b2rektorenamn@edu.stockholm.se)

Skolhälsan

b2rektorfnamn skolskstenamn skolsköterska: [b2rektorfnamn.skolskstenamn@edu.stockholm.se](mailto:b2rektorfnamn.skolskstenamn@edu.stockholm.se)

Stort tack för ert samarbete!`

      expect(toMarkdown(html)).toEqual(expected)
    })
  })
})