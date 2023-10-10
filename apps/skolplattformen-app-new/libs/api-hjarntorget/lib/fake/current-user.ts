export const currentUser = () =>
  ({
    url: 'https://hjarntorget.goteborg.se/api/core/current-user',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
      cookie: 'REMOVED',
    },
    status: 200,
    statusText: '200',
    json: () =>
      Promise.resolve({
        id: '889911_goteborgsstad',
        firstName: 'TOLV',
        lastName: 'TOLVAN',
        email: null,
        online: true,
        imagePath: '/pp/lookAndFeel/skins/hjarntorget/icons/monalisa_large.png',
        extraInfoInCatalog: '',
      }),
  } as any as Response);
