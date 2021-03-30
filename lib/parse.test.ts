import * as parse from './parse'

describe('parse', () => {
  let response: parse.EtjanstResponse
  describe('etjanst', () => {
    beforeEach(() => {
      response = {
        Success: true,
        Error: null,
        Data: [
          {
            Name: 'Some name',
          },
        ],
      }
    })
    it('returns data on success', () => {
      expect(parse.etjanst(response)).toBeInstanceOf(Array)
    })
    it('throws error on Error', () => {
      response.Success = false
      response.Error = 'b0rk'
      expect(() => parse.etjanst(response)).toThrowError('b0rk')
    })
    it('camelCases data keys', () => {
      const parsed = parse.etjanst(response)
      expect(parsed[0].name).toEqual(response.Data[0].Name)
    })
    describe('children', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: [
            {
              Name: 'Some name',
              Id: '42C3997E-D772-423F-9290-6FEEB3CB2DA7',
              SDSId: '786E3393-F044-4660-9105-B444DEB289AA',
              Status: 'GR',
              UserType: 'Student',
              SchoolId: 'DE2E1293-0F40-4B91-9D91-1E99355DC257',
              SchoolName: null,
              GroupId: null,
              GroupName: null,
              Classes:
                'VHsidan_0495CABC-77DB-41D7-824B-8B4D63E50D15;Section_AD1BB3B2-C1EE-4DFE-8209-CB6D42CE23D7;Section_0E67D0BF-594C-4C1B-9291-E753926DCD40;VHsidan_1C94EC54-9798-401C-B973-2454246D95DA',
              isSameSDSId: false,
              ResultUnitId: null,
              ResultUnitName: null,
              UnitId: null,
              UnitName: null,
            },
          ],
        }
      })
      it('parses children correctly', () => {
        expect(parse.children(response)).toEqual([
          {
            name: 'Some name',
            id: '42C3997E-D772-423F-9290-6FEEB3CB2DA7',
            sdsId: '786E3393-F044-4660-9105-B444DEB289AA',
            schoolId: 'DE2E1293-0F40-4B91-9D91-1E99355DC257',
            status: 'GR',
          },
        ])
      })
    })
    describe('calendar', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: [
            {
              Title: 'Jullov',
              Id: 29,
              Description: 'hello',
              Location: null,
              EventDate: '2020-12-21',
              EventDateTime: '09:00',
              LongEventDateTime: '2020-12-21 09:00',
              EndDate: '2021-01-08',
              EndDateTime: '10:00',
              LongEndDateTime: '2021-01-08 10:00',
              EventDateDayNumber: '21',
              EventDateMonthName: 'dec',
              EventDateMonthFullName: 'december',
              FullDateDescription: '2020-12-21 09:00 - 2021-01-08 10:00',
              IsSameDay: false,
              AllDayEvent: false,
              ListId: null,
              Mentor: null,
            },
          ],
        }
      })
      it('parses calendar correctly', () => {
        expect(parse.calendar(response)).toEqual([
          {
            id: 29,
            location: null,
            title: 'Jullov',
            description: 'hello',
            startDate: '2020-12-21T09:00:00.000+01:00',
            endDate: '2021-01-08T10:00:00.000+01:00',
            allDay: false,
          },
        ])
      })
    })
    describe('classmates', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: [
            {
              ID: 0,
              BATCH: null,
              SIS_ID: '22F0CFC7-09C7-45DC-9388-AE9A9EA1356B',
              USERNAME: null,
              SCHOOL_SIS_ID: null,
              EMAILADDRESS: null,
              STATUS: null,
              ERRORCODE: 0,
              PRIMARY_SCHOOL_SIS_ID: null,
              MENTOR_SIS_ID: null,
              FIRSTNAME: 'Bo',
              LASTNAME: 'Burström',
              ACTIVE: false,
              Guardians: [
                {
                  SOCIALNUMBER: null,
                  DISPLAYNAME: null,
                  FIRSTNAME: 'Allan',
                  LASTNAME: 'Fridell',
                  ADDRESS: 'Hult södregård',
                  CITY: null,
                  POCODE: null,
                  TELHOME: null,
                  TELMOBILE: '0690-6346216',
                  EMAILHOME: 'allan.fridell@mailinater.com',
                  SECTION_NAME: null,
                  SECTION_ID: null,
                  TERM_STARTDATE: null,
                  TERM_ENDDATE: null,
                  GROUPTYPE: null,
                  STUDENT_FIRSTNAME: null,
                  STUDENT_LASTNAME: null,
                  STUDENT_ID: null,
                },
              ],
              ClassName: '7C',
              ClassId: 'B2BF465B-581B-43AC-9CA7-F11BB0ED4646',
            },
          ],
        }
      })
      it('parses class mates correctly', () => {
        expect(parse.classmates(response)).toEqual([
          {
            sisId: '22F0CFC7-09C7-45DC-9388-AE9A9EA1356B',
            firstname: 'Bo',
            lastname: 'Burström',
            className: '7C',
            guardians: [
              {
                firstname: 'Allan',
                lastname: 'Fridell',
                address: 'Hult södregård',
                mobile: '0690-6346216',
                email: 'allan.fridell@mailinater.com',
              },
            ],
          },
        ])
      })
    })
    describe('schedule', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: [
            {
              Title: 'Canceled: Julavslutning 8C',
              Id: 0,
              Description: 'Nåt kul',
              Location: 'Lakritskolan',
              EventDate: '2020-12-14',
              EventDateTime: '14:10',
              LongEventDateTime: '2020-12-14 14:10',
              EndDate: '2020-12-14',
              EndDateTime: '14:40',
              LongEndDateTime: '2020-12-14 14:40',
              EventDateDayNumber: '14',
              EventDateMonthName: 'dec',
              EventDateMonthFullName: 'december',
              FullDateDescription: '2020-12-14 14:10 - 2020-12-14 14:40',
              IsSameDay: true,
              AllDayEvent: false,
              ListId: null,
              Mentor: null,
            },
          ],
        }
      })
      it('parses schedule correctly', () => {
        expect(parse.schedule(response)).toEqual([
          {
            title: 'Canceled: Julavslutning 8C',
            description: 'Nåt kul',
            location: 'Lakritskolan',
            startDate: '2020-12-14T14:10:00.000+01:00',
            endDate: '2020-12-14T14:40:00.000+01:00',
            oneDayEvent: true,
            allDayEvent: false,
          },
        ])
      })
    })
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
                Header:
                  'Problemet med att se betyg i bild, slöjd och teknik löst!',
                PublicationDate: '/Date(1608304542000)/',
                PubDateSE: '18 december 2020 16:15',
                ModifiedDate: '/Date(1608304680000)/',
                ModDateSE: '18 december 2020 16:18',
                Source: 'Livets hårda skolklasser',
                Preamble:
                  'Hej, Nu är problemet löst! Alla betyg syns som de ska. God jul!...',
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
      it('parses news items (except body) correctly', () => {
        const [item] = parse.news(response)

        expect(item.id).toEqual('news id')
        expect(item.author).toEqual('Eva-Lotta Rönnberg')
        expect(item.header).toEqual(
          'Problemet med att se betyg i bild, slöjd och teknik löst!'
        )
        expect(item.imageUrl).toEqual(
          'A703552D-DBF3-45B0-8E67-6E062105A0C5.jpeg'
        )
        expect(item.fullImageUrl).toEqual(
          'https://etjanst.stockholm.se/Vardnadshavare/inloggad2/NewsBanner?url=A703552D-DBF3-45B0-8E67-6E062105A0C5.jpeg'
        )
        expect(item.imageAltText).toEqual(
          'Nyhetsbild. Bildtext ej tillgänglig.'
        )
        expect(item.intro).toEqual(
          'Hej, Nu är problemet löst! Alla betyg syns som de ska. God jul!...'
        )
        expect(item.modified).toEqual('2020-12-18T16:18:00.000+01:00')
        expect(item.published).toEqual('2020-12-18T16:15:00.000+01:00')
      })
      it('parses body correctly', () => {
        const [item] = parse.news(response)

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
                '<div data-sp-rte=""><p><span><span><span>Kära vårdnadshavare!</span></span></span></p><p><span><span><span>I helgen är det avlusningsdagar! Ta tillfället i akt att luskamma ditt barn </span></span></span></p><p><span><span><span>Du finner all info du behöver på <a href="https&#58;//www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/" data-cke-saved-href="https&#58;//www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/" data-interception="on" title="https&#58;//www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/">1177 hemsida </a></span></span></span><span><span><span>​​​​​​​</span></span></span></p><p><span><span><span>Trevlig helg!</span></span></span></p><p><span><span><span>​​​​​​​</span></span></span></p></div>',
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
      it('parses news details (except body) correctly', () => {
        const item = parse.newsItemDetails(response)

        expect(item.id).toEqual('123')
        expect(item.header).toEqual('Avlusningsdagarna 5-7 februari 2021')
        expect(item.imageUrl).toEqual('123123.jpeg')
        expect(item.intro).toEqual(
          'Kära vårdnadshavare! I helgen är det avlusningsdagar!'
        )
        expect(item.published).toEqual('2021-02-04T14:31:00.000+01:00')
        expect(item.modified).toEqual('2021-02-14T14:37:00.000+01:00')
        expect(item.author).toEqual('Tieto Evry')
      })
      it('parses body correctly', () => {
        const item = parse.newsItemDetails(response)

        const expected =
          '[1177 hemsida](https://www.1177.se/sjukdomar--besvar/hud-har-och-naglar/harbotten-och-harsackar/huvudloss/)​​​​​​​'
        expect(item.body).toContain(expected)
      })
    })

    describe('menu', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: [
            {
              Title: 'Måndag - Vecka 52',
              Description: 'Körrfärsrätt .<br/>Veg färs',
            },
          ],
        }
      })
      it('parses menu correctly', () => {
        expect(parse.menu(response)).toEqual([
          {
            title: 'Måndag - Vecka 52',
            description: 'Körrfärsrätt .\nVeg färs',
          },
        ])
      })
    })

    describe('menu-list', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: {
            SelectedWeek: 12,
            Menus: [
              {
                Week: '12',
                Mon: 'Köttfärslimpa med sås och potatis',
                Tue: 'Curryfisk med ris',
                Wed: 'Tagliatelle med vegetarisk sås',
                Thu: 'Chorizo med stuvad potatis',
                Fri: 'Ört och vitlöksinbakad fisk, potatis',
              },
              {
                Week: '19',
                Mon: 'FISKGRATÄNG WALEWSKA',
                Tue: 'STEKT FLÄSK MED RAGGMUNK',
                Wed: 'PENNEPASTA MED TONFISK',
                Thu: 'KÖTTGRYTA MED POTATIS',
                Fri: 'GRÖNSAKSGRATÄNG MED TZATZIKI',
              },
              {
                Week: '20',
                Mon: 'SPAGHETTI SALMONE ',
                Tue: 'STEKT FALUKORV MED SENAPSSÅS OCH POTATIS',
                Wed: 'SOPPA MED RISONI OCH HEMBAKAT BRÖD',
                Thu: 'PANERAD FISK MED SKAGEN OCH POTATIS',
                Fri: 'TACOS',
              },
            ],
          },
        }
      })
      it('parses menu correctly', () => {
        const result = parse.menuList(response)

        expect(result).toEqual([
          {
            title: 'Måndag - Vecka 12',
            description: 'Köttfärslimpa med sås och potatis',
          },
          {
            title: 'Tisdag - Vecka 12',
            description: 'Curryfisk med ris',
          },
          {
            title: 'Onsdag - Vecka 12',
            description: 'Tagliatelle med vegetarisk sås',
          },
          {
            title: 'Torsdag - Vecka 12',
            description: 'Chorizo med stuvad potatis',
          },
          {
            title: 'Fredag - Vecka 12',
            description: 'Ört och vitlöksinbakad fisk, potatis',
          },
        ])
      })
    })

    describe('user', () => {
      let userResponse: any
      beforeEach(() => {
        userResponse = {
          socialSecurityNumber: '197106171635',
          isAuthenticated: true,
          userFirstName: 'Per-Ola',
          userLastName: 'Assarsson',
          userEmail: 'per-ola.assarsson@dodgit.com',
          notificationId:
            'B026594053D44299AB64ED81990B49C04D32F635C9A3454A84030439BFDDEF04',
        }
      })
      it('parses user correctly', () => {
        expect(parse.user(userResponse)).toEqual({
          personalNumber: '197106171635',
          firstName: 'Per-Ola',
          lastName: 'Assarsson',
          email: 'per-ola.assarsson@dodgit.com',
          isAuthenticated: true,
          notificationId:
            'B026594053D44299AB64ED81990B49C04D32F635C9A3454A84030439BFDDEF04',
        })
      })
    })
    describe('notifications', () => {
      beforeEach(() => {
        response = {
          Success: true,
          Error: null,
          Data: [
            {
              Notification: {
                Messageid: 'E2E3A567-307F-4859-91BA-31B1F4522A7B',
                Messagecorrelationid: 'BB54DC8E-BB02-49A5-9806-4A2433031AA7',
                Message:
                  '{"messages":{"message":{"messageid":"E2E3A567-307F-4859-91BA-31B1F4522A7B","messagecorrelationid":"BB54DC8E-BB02-49A5-9806-4A2433031AA7","messagetext":"Betygen är publicerade.","messagesubject":"Betyg klara","messagetime":"2020-12-18T15:59:43.195","linkbackurl":"https://elevdokumentation.stockholm.se/loa3/gradesStudent.do","sender":{"name":"Elevdokumentation"},"recipient":{"recipient":"195709227283","role":"Guardian"},"messagetype":{"type":"webnotify"},"system":"Elevdokumentation","participant":"BB7DE89D-D714-4EB2-85CD-36F9991E7C34"}}}',
                Readreceipt: false,
                Recipient: '195709227283',
                Id: 5880387,
                DateCreated: '2020-12-18T15:59:46.34',
                DateModified: '/Date(1608307186340)/',
                Role: 'Guardian',
                Participant: 'BB7DE89D-D714-4EB2-85CD-36F9991E7C34',
              },
              NotificationMessage: {
                Messages: {
                  Message: {
                    Messageid: 'E2E3A567-307F-4859-91BA-31B1F4522A7B',
                    Messagecorrelationid:
                      'BB54DC8E-BB02-49A5-9806-4A2433031AA7',
                    Messagetext: 'Betygen är publicerade.',
                    Messagetime: '/Date(1608303583195)/',
                    Linkbackurl:
                      'https://elevdokumentation.stockholm.se/loa3/gradesStudent.do',
                    Category: null,
                    Sender: { Name: 'Elevdokumentation' },
                    Recipient: {
                      RecipientRecipient: '195709227283',
                      Role: 'Guardian',
                      Schooltype: null,
                    },
                    Messagetype: { Type: 'webnotify' },
                    System: 'Elevdokumentation',
                  },
                },
              },
            },
          ],
        }
      })
      it('parses notifications correctly', () => {
        expect(parse.notifications(response)).toEqual([
          {
            id: 'E2E3A567-307F-4859-91BA-31B1F4522A7B',
            message: 'Betygen är publicerade.',
            sender: 'Elevdokumentation',
            url: 'https://elevdokumentation.stockholm.se/loa3/gradesStudent.do',
            dateCreated: '2020-12-18T15:59:46.340+01:00',
            category: null,
            type: 'webnotify',
          },
        ])
      })
    })
  })
})
