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

const getSchema = async (cookie, childId, unitId, week, year) => {
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
    unitGuid: unitId,
    startDate: null,
    endDate: null,
    scheduleDay: 1,
    blackAndWhite: false,
    width: 375,
    height: 550,
    selectionType: 5,
    selection: childId, 
    showHeader: false,
    periodText: '',
    week,
    year,
    privateFreeTextMode: null,
    privateSelectionMode: true,
    customerKey: ''
  }
  const { data : {lessonInfo} } = await fetch('https://fns.stockholm.se/ng/api/render/timetable', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9,sv;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'x-scope': scope,
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


const getChildrenData = async (cookie) => {
  
  const body = { getPersonalTimetablesRequest: {
    hostName: 'fns.stockholm.se'
  }}
  const   { data : {getPersonalTimetablesResponse:  {childrenTimetables  } } }  = 
    await fetch('https://fns.stockholm.se/ng/api/services/skola24/get/personal/timetables', {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9,sv;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      host: 'fns.stockholm.se',
      'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
      cookie
      },  
      referrer: 'https://fns.stockholm.se/ng/timetable/timetable-viewer/fns.stockholm.se/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(body),
      method: 'POST',
      mode: 'cors'
    }).then(res => res.json())

   return childrenTimetables;
}


const getSchemas = async (cookie, week, year) => {
  var children = await getChildrenData(cookie);
  console.log(children)

  children.forEach(child => {
    getSchema(cookie, child.personGuid, child.unitGuid, week, year)
  });

}

const cookie = '<cookie here>'

getSchemas(cookie,'15','2021');

