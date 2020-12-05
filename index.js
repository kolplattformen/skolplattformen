const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie/node-fetch')(nodeFetch)

const baseUrl = 'https://etjanst.stockholm.se'
const urls = {
  login: socialSecurityNumber => `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&initialize=bankid&personalNumber=${socialSecurityNumber}&_=${Date.now()}`,
  checkStatus: order => `https://login003.stockholm.se/NECSadcmbid/authenticate/NECSadcmbid?TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt&verifyorder=${order}&_=${Date.now()}`,
  //loginTarget: `https://login001.stockholm.se/NECSadc/mbid/b64startpage.jsp?startpage=aHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvaGVt`,
  loginTarget: 'https://login003.stockholm.se/NECSadcmbid/authenticate/SiteMinderAuthADC?TYPE=33554433&REALMOID=06-42f40edd-0c5b-4dbc-b714-1be1e907f2de&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=IfNE0iMOtzq2TcxFADHylR6rkmFtwzoxRKh5nRMO9NBqIxHrc38jFyt56FASdxk1&TARGET=-SM-HTTPS%3a%2f%2flogin001%2estockholm%2ese%2fNECSadc%2fmbid%2fb64startpage%2ejsp%3fstartpage%3daHR0cHM6Ly9ldGphbnN0LnN0b2NraG9sbS5zZS92YXJkbmFkc2hhdmFyZS9pbmxvZ2dhZDIvR2V0Q2hpbGRyZW4%3d',
  children: `${baseUrl}/vardnadshavare/inloggad2/GetChildren`,
  calendar: childId => `${baseUrl}/vardnadshavare/inloggad2/Calender/GetSchoolCalender?childId=${childId}`,
  user: `${baseUrl}/vardnadshavare/base/getuserdata`,
  news: childId => `${baseUrl}/vardnadshavare/inloggad2/News/GetNewsOverview?childId=${childId}`,
  image: url => `${baseUrl}/vardnadshavare/inloggad2/NewsBanner?url=${url}`,
  notifications: childId => `${baseUrl}/https://etjanst.stockholm.se/vardnadshavare/inloggad2/Overview/GetNotification?childId=${childId}`
}

const fetchJson = (url) => {
  return fetch(url)
  .then(res => {
    return res.ok ? res : Promise.reject(res.statusText)
  })
  .then(res => res.json())
  .then(json => json.Error ? Promise.reject(json.Error) : json.Data)
}
const pause = ms => new Promise((resolve) => setTimeout(resolve, ms))

const getCookie = () => fetch(urls.children)
  .then(res => res.headers.get('set-cookie'))

const login = async (socialSecurityNumber) => {
  const url = urls.login(socialSecurityNumber)
  const {token, order} = await fetch(url).then(res => res.ok ? res.json() : Promise.reject(res.statusText))

  console.log('got tokens', {token, order})
  
  let status = ''
  let tries = 0

  while(tries++ < 60 && (status !== 'ERROR' && status !== 'OK')) {
    status = await loginStatus(order)
    console.log('status', status)
    if (status !== 'OK') await pause(1000)
  }

  if (status === 'OK'){
    // update cookies
    await fetch(urls.loginTarget).then(res => res.text()).then(text => console.log('loginTarget', text))
    return true
  } else {
    return false
  }
}

const loginStatus = (order) => fetch(urls.checkStatus(order))
  .then(async res => {
    if (!res.ok) return Promise.reject(res.statusText)
    const status = await res.text()
    /*if (status === 'ERROR') {
      console.error(res.headers)
    }*/
    return status
  })


  const getData = async () => {
  
    const children = await fetchJson(urls.children)
    const data = await Promise.all(children.map(async (child) => {
      const childId = child.Id
      const news = fetchJson(urls.news(childId)).then(news => news.NewsItems.map(({Body: body, Preamble: intro, Header: header, BannerImageUrl: image, PubDateSE: published, ModDateSE: modified}) => ({header, intro, body, modified, published, image: urls.image(image) }))).catch(err => ({err}))
      const calendar = fetchJson(urls.calendar(childId)).catch(err => ({err}))
      const notifications = fetchJson(urls.notifications(childId)).catch(err => ({err}))
      return Promise.all([news, calendar, notifications]).then(([news, calendar, notifications]) => ({child, news, calendar, notifications}))
    }))
    return data
    /*
  
    const news = fetchJson(urls().children)
    .then(children => Promise.all()))
    .then(text => console.log('text', text))
    */
  }

const run = async (socialSecurityNumber) => {
  const OK = await login(socialSecurityNumber)
  if (!OK) return Promise.reject('Login failed')
  const data = await getData()
  return data
}

run('197612040233')
  .then(data => console.log('data', JSON.stringify(data, null, 2)))
  .catch(err => console.error(err))