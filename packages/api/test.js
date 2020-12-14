/*
const backend = require('./backend')

const run = async (socialSecurityNumber) => {
  const OK = await backend.login(socialSecurityNumber)
  if (!OK) return Promise.reject('Login failed')
  const data = await backend.getAll()
  return data
}

run('197612040233')
  .then(data => console.log('data', JSON.stringify(data, null, 2)))
  .catch(err => console.error(err))

*/

const fetch = require('node-fetch')
const test = async () => {
  const socialSecurityNumber = '197612040233'

  const token = await fetch(`http://localhost:9000/login?socialSecurityNumber=${socialSecurityNumber}`, {method: 'POST'}).then(res => res.json())
  // login with BankID
  const jwt = await fetch(`http://localhost:9000/login/${token.order}/jwt`).then(res => res.json())
  const headers = {authorization: 'Bearer ' + jwt}

  const children = await fetch(`http://localhost:9000/children`, {headers}).then(res => res.json())

  const data = await Promise.all(children.map(async child => ({
    ...child,
    ...await fetch(`http://localhost:9000/children/${child.id}`, {headers}).then(res => res.json())
  })))

  data.map(async child => ({
    ...child,
    messages: await Promise.all(child.notifications.map((notification) => fetch(notification.url, {headers}).then(res => res.text())))
  }))
  
  console.log(JSON.stringify(data, null, 2))
}


test()