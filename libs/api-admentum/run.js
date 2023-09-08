const Admentum = require('./lib/index.ts')
const nodeFetch = require('node-fetch')
const { CookieJar } = require('tough-cookie')
const fetchCookie = require('fetch-cookie/node-fetch')

const cookieJar = new CookieJar()
const fetch = fetchCookie(nodeFetch, cookieJar)
const admentum = new Admentum(fetch, {})

const run = async () => {
  const sessionId = await admentum.login('7612040233')
}

run()
