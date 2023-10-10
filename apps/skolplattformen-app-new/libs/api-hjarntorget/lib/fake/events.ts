export const events = () =>
  ({
    url: 'https://hjarntorget.goteborg.se/api/events/events-sorted-by-name?offset=0&limit=100',
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
          id: 18,
          name: '138JÄTS 21/22 5A',
          url: 'https://hjarntorget.goteborg.se/o/apiAccessWithKey.do?forwardUrl=%2FlaunchCourse.do%3Fid%3D12',
          state: 'ONGOING',
        },
        {
          id: 14,
          name: '138JÄTS 21/22 8B',
          url: 'https://hjarntorget.goteborg.se/o/apiAccessWithKey.do?forwardUrl=%2FlaunchCourse.do%3Fid%3D14',
          state: 'ONGOING',
        },
        {
          id: 21,
          name: '138JÄTS Provschema år 8',
          url: 'https://hjarntorget.goteborg.se/o/apiAccessWithKey.do?forwardUrl=%2FlaunchCourse.do%3Fid%3D21',
          state: 'ONGOING',
        },
        {
          id: 24,
          name: '139SS27F Södra Bangatan förskola',
          url: 'https://hjarntorget.goteborg.se/o/apiAccessWithKey.do?forwardUrl=%2FlaunchCourse.do%3Fid%3D24',
          state: 'ONGOING',
        },
      ]),
  } as any as Response);
