import { EtjanstResponse } from '../'
import { news, newsItemDetails } from '../news'

let response: EtjanstResponse

describe('news', () => {
  beforeEach(() => {
    response = {
      Success: true,
      Error: null,
      Data: {
        CurrentChild: null,
        NewsItems: [
          {
            NewsId: 'news id',
            SiteId:
              'elevstockholm.sharepoint.com,27892ACC-BA2E-4DEC-97B8-25F7098C3BF6,A239466A-9A52-42FF-8A3F-D94C342F2700',
            NewsListId: '3EC323A1-EA16-4D24-84C8-DAA49E76F9F4',
            NewsItemId:
              'elevstockholm.sharepoint.com,27892ACC-BA2E-4DEC-97B8-25F7098C3BF6,A239466A-9A52-42FF-8A3F-D94C342F2700_99',
            Header: 'Problemet med att se betyg i bild, slöjd och teknik löst!',
            PublicationDate: '/Date(1608304542000)/',
            PubDateSE: '18 december 2020 16:15',
            ModifiedDate: '/Date(1608304680000)/',
            ModDateSE: '18 december 2020 16:18',
            Source: 'Livets hårda skolklasser',
            Preamble:
              'Hej,Nu är problemet löst! Alla betyg syns som de ska.God jul!...',
            BannerImageUrl: 'A703552D-DBF3-45B0-8E67-6E062105A0C5.jpeg',
            BannerImageGuid: 'A703552D-DBF3-45B0-8E67-6E062105A0C5',
            BannerImageListId: 'FFBE49E9-BDE1-4C75-BA0E-D98D4E2FCF21',
            Body:
              '<div><div data-sp-canvascontrol="" data-sp-canvasdataversion="1.0" data-sp-controldata="&#123;&quot;controlType&quot;&#58;4,&quot;id&quot;&#58;&quot;1212fc8d-dd6b-408a-8d5d-9f1cc787efbb&quot;,&quot;position&quot;&#58;&#123;&quot;controlIndex&quot;&#58;2,&quot;sectionIndex&quot;&#58;1,&quot;sectionFactor&quot;&#58;12,&quot;zoneIndex&quot;&#58;1,&quot;layoutIndex&quot;&#58;1&#125;,&quot;addedFromPersistedData&quot;&#58;true,&quot;emphasis&quot;&#58;&#123;&#125;&#125;"><div data-sp-rte=""><p>Hej,</p><p>Nu är problemet löst! Alla betyg syns som de ska.&#160;</p><p>God jul!</p></div></div><div data-sp-canvascontrol="" data-sp-canvasdataversion="1.0" data-sp-controldata="&#123;&quot;controlType&quot;&#58;0,&quot;pageSettingsSlice&quot;&#58;&#123;&quot;isDefaultDescription&quot;&#58;true,&quot;isDefaultThumbnail&quot;&#58;true&#125;&#125;"></div></div>',
            BodyNoHtml: null,
            AuthorDisplayName: 'Eva-Lotta Rönnberg',
            altText: 'Nyhetsbild. Bildtext ej tillgänglig.',
          },
        ],
        ViewGlobalTranslations: {},
        ViewLocalTranslations: {},
        Children: null,
        Status: null,
        GlobalTranslationIds: [
          'InformationalHeader',
          'ContactUsMessageLabel',
          'Send',
          'RequiredFieldMessageInfo',
          'Sex',
          'Male',
          'Female',
          'SSN',
          'FirstName',
          'LastName',
          'Email',
          'Zip',
          'Address',
          'ValidationRequiredFieldMessage',
          'ValidationErrorMessage',
        ],
        LocalTranslationIds: ['IndexPageHeading1'],
      },
    }
  })
  it(' news items (except body) correctly', () => {
    const [item] = news(response)

    expect(item.id).toEqual('news id')
    expect(item.author).toEqual('Eva-Lotta Rönnberg')
    expect(item.header).toEqual(
      'Problemet med att se betyg i bild, slöjd och teknik löst!'
    )
    expect(item.imageUrl).toEqual('A703552D-DBF3-45B0-8E67-6E062105A0C5.jpeg')
    expect(item.fullImageUrl).toEqual(
      'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url=A703552D-DBF3-45B0-8E67-6E062105A0C5.jpeg'
    )
    expect(item.imageAltText).toEqual('Nyhetsbild. Bildtext ej tillgänglig.')
    expect(item.intro).toEqual(
      'Hej, Nu är problemet löst! Alla betyg syns som de ska. God jul!...'
    )
    expect(item.modified).toEqual('2020-12-18T15:18:00.000Z')
    expect(item.published).toEqual('2020-12-18T15:15:42.000Z')
  })
  it(' body correctly', () => {
    const [item] = news(response)

    const expected =
      'Hej,  Nu är problemet löst! Alla betyg syns som de ska.  God jul!'
    const trimmed = (item.body || '')
      .split('\n')
      .map((t) => t.trim())
      .join(' ')
    expect(trimmed).toEqual(expected)
  })
})

describe('newsItem', () => {
  beforeEach(() => {
    response = {
      Success: true,
      Error: null,
      Data: {
        CurrentNewsItem: {
          NewsId: '123',
          SiteId:
            'elevstockholm.sharepoint.com,d112c398-71d4-468f-9a59-84d806751b08,3addab10-546a-4551-8076-72c9cd67f961',
          NewsListId: '95df7d70-fbf0-470d-9926-e4e633f77f27',
          NewsItemId:
            'elevstockholm.sharepoint.com,d112c398-71d4-468f-9a59-84d806751b08,3addab10-546a-4551-8076-72c9cd67f961_40',
          Header: 'Avlusningsdagarna 5-7 februari 2021',
          PublicationDate: '/Date(1612445471000)/',
          PubDateSE: '4 februari 2021 14:31',
          ModifiedDate: '/Date(1612445852000)/',
          ModDateSE: '14 februari 2021 14:37',
          Source: 'Södra Ängby skola',
          Preamble: 'Kära vårdnadshavare!I helgen är det avlusningsdagar!',
          BannerImageUrl: '123123.jpeg',
          BannerImageGuid: '7a8142d9d9d54cf090e8457e4c629227',
          BannerImageListId: 'a88c22e8-7094-4a71-b4fd-8792c62a7b4a',
          Body:
            '<div data-sp-rte=""><p><span><span><span>Kära vårdnadshavare!</span></span></span></p><p><span><span><span>I helgen är det avlusningsdagar! Ta <strong>tillfället </strong>i akt att luskamma ditt barn </span></span></span></p><p><span><span><span>Du finner all info du behöver på <a href="https&#58;//www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/" data-cke-saved-href="https&#58;//www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/" data-interception="on" title="https&#58;//www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/">1177 hemsida </a></span></span></span><span><span><span>​​​​​​​</span></span></span></p><p><span><span><span>Trevlig helg!</span></span></span></p><p><span><span><span>​​​​​​​</span></span></span></p></div>',
          BodyNoHtml: null,
          AuthorDisplayName: 'Tieto Evry',
          altText: null,
          OriginalSourceUrl: null,
        },
        CurrentChild: null,
        ViewGlobalTranslations: {},
        ViewLocalTranslations: {},
        Children: null,
        Status: null,
        GlobalTranslationIds: [
          'InformationalHeader',
          'ContactUsMessageLabel',
          'Send',
          'RequiredFieldMessageInfo',
          'Sex',
          'Male',
          'Female',
          'SSN',
          'FirstName',
          'LastName',
          'Email',
          'Zip',
          'Address',
          'ValidationRequiredFieldMessage',
          'ValidationErrorMessage',
        ],
        LocalTranslationIds: ['IndexPageHeading1'],
      },
    }
  })

  it(' news details (except body) correctly', () => {
    const item = newsItemDetails(response)

    expect(item.id).toEqual('123')
    expect(item.header).toEqual('Avlusningsdagarna 5-7 februari 2021')
    expect(item.imageUrl).toEqual('123123.jpeg')
    expect(item.intro).toEqual(
      'Kära vårdnadshavare! I helgen är det avlusningsdagar!'
    )
    expect(item.published).toEqual('2021-02-04T13:31:11.000Z')
    expect(item.modified).toEqual('2021-02-04T13:37:32.000Z')
    expect(item.author).toEqual('Tieto Evry')
  })

  it(' body correctly', () => {
    const item = newsItemDetails(response)

    const expected =
      '[1177 hemsida](https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/)​​​​​​​'
    expect(item.body).toContain(expected)
    expect(item.body).toContain(' **tillfället** ')
  })
})


describe('newsItem', () => {
  beforeEach(() => {
    response = {
      Success: true,
      Error: null,
      Data: {
        CurrentNewsItem: {
          NewsId: '123',
          SiteId:
            'elevstockholm.sharepoint.com,d112c398-71d4-468f-9a59-84d806751b08,3addab10-546a-4551-8076-72c9cd67f961',
          NewsListId: '95df7d70-fbf0-470d-9926-e4e633f77f27',
          NewsItemId:
            'elevstockholm.sharepoint.com,d112c398-71d4-468f-9a59-84d806751b08,3addab10-546a-4551-8076-72c9cd67f961_40',
          Header: 'Avlusningsdagarna 5-7 februari 2021',
          PublicationDate: '/Date(1612445471000)/',
          PubDateSE: '4 februari 2021 14:31',
          ModifiedDate: '/Date(1612445852000)/',
          ModDateSE: '14 februari 2021 14:37',
          Source: 'Södra Ängby skola',
          Preamble: 'Kära vårdnadshavare!I helgen är det avlusningsdagar!',
          BannerImageUrl: '123123.jpeg',
          BannerImageGuid: '7a8142d9d9d54cf090e8457e4c629227',
          BannerImageListId: 'a88c22e8-7094-4a71-b4fd-8792c62a7b4a',
          Body:
            '<i>italic</i>  <b>bold</b>  <em>emphasis </em><br/><strong>strong</strong><strong>nbsp&#160;</strong>',
          BodyNoHtml: null,
          AuthorDisplayName: 'Tieto Evry',
          altText: null,
          OriginalSourceUrl: null,
        },
        CurrentChild: null,
        ViewGlobalTranslations: {},
        ViewLocalTranslations: {},
        Children: null,
        Status: null,
        GlobalTranslationIds: [
          'InformationalHeader',
          'ContactUsMessageLabel',
          'Send',
          'RequiredFieldMessageInfo',
          'Sex',
          'Male',
          'Female',
          'SSN',
          'FirstName',
          'LastName',
          'Email',
          'Zip',
          'Address',
          'ValidationRequiredFieldMessage',
          'ValidationErrorMessage',
        ],
        LocalTranslationIds: ['IndexPageHeading1'],
      },
    }
  })
  it(' emphasizes correctly', () => {
    const item = newsItemDetails(response)

    expect(item.body).toContain('*italic*')
    expect(item.body).toContain('**bold**')
    expect(item.body).toContain('*emphasis*')
    expect(item.body).toContain('**strong**')
    expect(item.body).toContain('**nbsp**')
  })
})