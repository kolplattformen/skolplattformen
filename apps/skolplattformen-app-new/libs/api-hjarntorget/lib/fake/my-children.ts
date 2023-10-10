export const myChildren = () =>
  ({
    url: 'https://hjarntorget.goteborg.se/api/person/children',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
      cookie: 'REMOVED',
    },
    status: 200,
    statusText: '200',
    json: () =>
      Promise.resolve([
        {
          // Klass: Förskola
          id: '133737_goteborgsstad',
          firstName: 'Havin',
          lastName: 'Göransson',
          email: null,
          online: false,
          imagePath:
            '/pp/lookAndFeel/skins/hjarntorget/icons/monalisa_large.png',
          extraInfoInCatalog: '',
        },
        {
          // Klass: 8B
          id: '133700_goteborgsstad',
          firstName: 'Azra',
          lastName: 'Göransson',
          email: null,
          online: false,
          imagePath:
            '/pp/lookAndFeel/skins/hjarntorget/icons/monalisa_large.png',
          extraInfoInCatalog: '',
        },
        {
          // Klass: 5A
          id: '123456_goteborgsstad',
          firstName: 'Jon',
          lastName: 'Göransson',
          email: null,
          online: false,
          imagePath:
            '/pp/lookAndFeel/skins/hjarntorget/icons/monalisa_large.png',
          extraInfoInCatalog: '',
        },
      ]),
  } as any as Response);
