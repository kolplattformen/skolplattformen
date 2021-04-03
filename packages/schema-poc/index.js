const fetch = require('node-fetch')

const btoa = (string) => Buffer.from(string).toString('base64')
const { URLSearchParams } = require('url')

const sso = async (cookie, targetSystem) => {
  const ssoRequest = await fetch('https://fnsservicesso1.stockholm.se/sso-ng/saml-2.0/authenticate?customer=https://login001.stockholm.se&targetsystem=' + targetSystem, { headers: { cookie }, redirect: 'follow', follow: 20 }).then(res => !res.ok ? Promise.reject(res.statusText) : res).then(res => res.text())
  const samlRequest = /name="SAMLRequest" value="(?<saml>\S+)">/gm.exec(ssoRequest)?.groups.saml
  const requestParams = new URLSearchParams({ SAMLRequest: samlRequest })
  const ssoResponse = await fetch('https://login001.stockholm.se/affwebservices/public/saml2sso', { method: 'POST', headers: { cookie }, body: requestParams, redirect: 'follow', follow: 20 }).then(res => !res.ok ? Promise.reject(res.statusText) : res).then(res => res.text())
  const samlResponse = /name="SAMLResponse" value="(?<saml>\S+)">/gm.exec(ssoResponse)?.groups.saml
  const responseParams = new URLSearchParams({ SAMLResponse: samlResponse })
  const result = await fetch('https://fnsservicesso1.stockholm.se/sso-ng/saml-2.0/response', { method: 'POST', headers: { cookie }, body: responseParams, redirect: 'follow', follow: 20 }).then(res => !res.ok ? Promise.reject(res.statusText) : res).then(res => res.text())
  return result
}

const getSchema = async (cookie, childId, week, year) => {
  await sso(cookie, 'TimetableViewer')
  const form = await fetch('https://fns.stockholm.se/ng/timetable/timetable-viewer/fns.stockholm.se/', { headers: { cookie }, redirect: 'follow', follow: 20 }).then(res => !res.ok ? Promise.reject(res.statusText) : res).then(res => res.text())
  console.log('form', form)
  const login = /<title>Inloggning<\/title>/gm.test(form)
  if (login) throw new Error('Not logged in')
  const loggedIn = /userLoggedIn\s*=\s*(?<loggedIn>true|false);/gm.exec(form)?.groups.loggedIn
  const scope = /scope="(?<scope>(\w|-)+)"/gm.exec(form)?.groups.scope

  console.log(scope, loggedIn)
  const { data: { key } = {} } = await fetch('https://fns.stockholm.se/ng/api/get/timetable/render/key', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'content-type': 'application/json',
      'x-scope': scope,
      cookie
    },
    referrer: 'https://fns.stockholm.se/ng/timetable/timetable-viewer/fns.stockholm.se/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST'
  }).then(res => res.json())

  console.log('key', key)

  const body = {
    renderKey: key,
    host: 'fns.stockholm.se',
    unitGuid: 'NmRhOGRhOTYtOWNkYy05ODJkLWY4ZjgtYTExNjFjNmViOGE5', // här är jag lite osäker - den verkar inte ändra sig.
    startDate: null,
    endDate: null,
    scheduleDay: 1,
    blackAndWhite: false,
    width: 375,
    height: 550,
    selectionType: 5,
    selection: btoa(childId),
    showHeader: false,
    periodText: '',
    week,
    year,
    privateFreeTextMode: null,
    privateSelectionMode: true,
    customerKey: ''
  }
  const { data: { lessonInfo } = {} } = await fetch('https://fns.stockholm.se/ng/api/render/timetable', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9,sv;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
      cookie
    },
    referrer: 'https://fns.stockholm.se/ng/timetable/timetable-viewer/fns.stockholm.se/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json())

  console.log('lessonInfo', JSON.stringify(lessonInfo, null, 2))
}

const cookie = 'StockholmEServiceLanguage=1053,Svenska,Language,sv; ASP.NET_SessionId=wwpssgmavxf2n2pxevisxdgt; __RequestVerificationToken_L3ZhcmRuYWRzaGF2YXJl0=0uPyfGOlR0zuIiCkylXIxwRu-hVn8-s_00GVbJ987nPfH7RSASe-kXgJZMvQlmp_W0ezbcmNGSO-tzWa8z2LSlvigXhsQcjCmcAEtE-4IrA1; StockholmEserviceAcceptCookie=true; BIGipServerpool_etjanster3_prod_vhavare_19_https=836442028.47873.0000; BIGipServerpool_etjanster2_prod_int_19=836442028.20480.0000; SMIDENTITY=Ef4wFa5FSYCqynIDNVwajJE7lG1UmtCRFAKCJQ7kBzvGyVYCRZQ7nrTDTCCMn19YMfxp1rc2zeRJxU8FtdZFufYzc2Uxrgf6BO4fBQLUzbrKoK3VM+eZFDlkkcnOYGa0xJZy5qjvVCrJvsBBp8thshDiBy9/bHYBJt5iByiuMmQAQun1UVaFveNPY3i6qy5+LhUvcQyFo5d1Ha/WNdVgOGwcaqhtwaFQtsfRB80g2+p46fQO7j4Q0Lt7RrCK/HUOckiHnfYrLO43hLjGVr3nIV15eZp8Osu9XM2ewUNtUZFcc0nAvWNdtXors1S0oEuG7jCbWYRV/MfDFFp2XbudGrdVLyPGio17/khYzfCOEcnFV2u+3tQB95a+UKpWXNDmneOB+XtSAJlL+cZirhspVkcbkUg5l6XuIZDLknzfWOJpedQLBhAd8IrnhYHD3Yqc61wQ8LUA9FakDo4wUFGLPfSDWOkOmxL6DQJS197+mADztJy10Dk7155ZW6wgHS6vi+XWCY9TkNO+YnzDSUO3TIjjmrmVhy3O71VKizXZunbCy3L96aOi5qGqx0QDF6CU; WT_FPC=id=d00d2960-cc47-42f1-ac22-4cc8e5899c67:lv=1617482359477:ss=1617482329514; SMSESSION=GkwOpGjU18qBxiTG2OqZx1Xk8rApKFcqEY4SpX4j7YioL8XDX3x8SoDQ5LKGLisMakdKH2xCv66HKzhuy2yEYwuIRDlwPZtBHupmLy0RW83PEizlRosfPg5q41yoZGoKrfreb+rBmrI1nWz1njjnpfT8KIzZcxcsdKBKFmeNnH/DrqVecZrI/+zdHvkp3iQUa9c8/laBaNXA6m9Oxh14V/XhbBCECgRzLeme1AARtUnFLmEUrUJVe3jmkCU9FSWcMpr8lyaSXGbLkvfB11dJdIz9K0pzBxaOEFfamibXmDTe5VV6ZEz0eORKdw+CsJXS7uM4Rz5ybN1fmRBNDXQoPU6QvwKH1hkxbEd0aTKMRCe823hp0KMbwDbFzrOdAODCg055hMbpJOnQJl4ZC6UYX3IxpQtjaWBK7IIVEGP1/Kj8o8WeHNL8vuTuBPFDbX1bmazM4wSG5T4K6ZBhAI5p90CXPbMRQph47WGHHAHGUqIkJwH6wR1WPb6wqH76+6bmWoivNl2QCWByuI/CcG9C6ivt0MYXrrCmrmzmpUf+aqy/l4iquc4T8mS6wypKeMJ2mx4WhbHfPV2WrEg2S76cQ55H5b5VonFB2BQC52K2QMhtL4O5thlqlVUL15VxPX1fWMLtqY3bSk7duYGq2Sjvng+9pC2tj8QnNTj678gK78sZG8M/Rw1W4EJv4PNS0Fwf07QCfJIFQxT4nmqiLyb7copdV90+fTwvzPDL01Rwis2Sdmhwyk04vWtobpynluF1eQoWx5uyfFulwivIAdZYjozopmT4tepl5BoostsXaGRz/XW83JX8+plR75rYcMji8B5Xin5zSGKt0T9IPaUuy7TLUT1jejbTZR6t8Za/dGvv3Eq2qovvKtS4X7z2dBVRTvNWifRxZIHKmemkXRqhN4a73T/Hh8YOwb1K2aPGU4J8NFk0GYoXbZg7mxeD3FJu66ThFap8RD8FtqzRUPTvgzdcqCTM9pFKIm2KaeHW4xCjsFJ/CCTeFKg/ZyGhLwFHDw+4JkLKjiIpzEfCwavUQgFIxGu/xa21y1uJ+k0aj4Cqa3t9OMpaHk7LYkyIeeg5r4myPs4NVTC8dLOEqhOKP0v6GDML0qM2HA8K0AuU/x0cqyWxLL7v+uo1XWdd/wqa'
getSchema(cookie, '6cbecaf5-d30d-94c2-d370-f9b64636b706', '15', '2021')
