const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie/node-fetch')(nodeFetch)
const createError = require('http-errors')
const camel = require('camelcase-keys')
const { logRequest } = require('./logger')

const logging = (f) => async (url, cookie) => {
  const log = {}
  try {
    const result = await f(url, cookie, log)
    return result
  } finally {
    if (process.env.LOG_REQUESTS) {
      console.error(log)
      logRequest(log)
    }
  }
}

const errorExists = (errors, {message, status}) => {
  return !!errors.find((e) => (
    e.message === message &&
    e.status === status
  ))
}

const logError = (log, error) => {
  if (error) return
  const {message, status, stack} = error
  if (!log.errors) {
    log.errors = [{message, status, stack}]
  } else if (!errorExists(error)) {
    log.errors.push({message, status, stack})
  }
}

const fetchRaw = async (url, cookie, log = {}) => {
  const options = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.87 Safari/537.36'
  }
  if (cookie) {
    options.headers = {cookie}
  }
  log.request = {
    url,
    ...options
  }
  const response = await fetch(url, options)
  log.response = {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    headers: {
      'content-type': response.headers.get('content-type')
    }
  }
  if (!response.ok) {
    const error = createError(response.status, response.statusText)
    logError(log, error)
    throw error
  }
  return response
}

const fetchText = async (url, cookie, log = {}) => {
  try {
    const response = await fetchRaw(url, cookie, log)
    const text = await response.text()
    log.response.body = text
    return text
  } catch (error) {
    if (!log.response.body) {
      try {
        log.response.body = await parse(response)
      } catch (_) {}
    }
    logError(log, error)
    throw error
  }
}

const fetchJson = async (url, cookie, log = {}) => {
  try {
    const response = await fetchRaw(url, cookie, log)
    if (response.headers.get('content-type').split(';')[0] !== 'application/json') {
      log.response.body = await response.text()
      throw new Error('Expected JSON')
    }
    const json = await response.json()
    log.response.body = json
    const camelized = camel(json, { deep: true })
    
    if (camelized.error) {
      throw camelized.error
    }
    return camelized.data || camelized
  } catch (error) {
    if (!log.response.body) {
      try {
        log.response.body = await parse(response)
      } catch (_) {}
    }
    logError(log, error)
    throw error
  }
}

const parse = async (response) => {
  const contentType = response.headers.get('content-type').split(';')[0]
  switch (contentType) {
    case 'application/json':
      const json = await response.json()
      return camel(json, { deep: true })
    case 'text/html':
      return response.text()
    default:
      return
  }
}

module.exports = {
  fetchRaw: logging(fetchRaw),
  fetchJson: logging(fetchJson),
  fetchText: logging(fetchText)
}
