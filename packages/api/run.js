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
  const {token: jwt} = await fetch(`http://localhost:9000/login/${token.order}/jwt`).then(res => res.json())
  console.log('got jwt', jwt)
  const headers = {authorization: 'Bearer ' + jwt}

  const children = await fetch(`http://localhost:9000/children`, {headers}).then(res => res.json())
  console.log('children', children)
  const data = await Promise.all(children.map(async child => ({
    ...child,
    classmates: await fetch(`http://localhost:9000/children/${child.sdsId}/classmates`, {headers}).then(res => res.json()),
    news: await fetch(`http://localhost:9000/children/${child.id}/news`, {headers}).then(res => res.json()),
    calendar: await fetch(`http://localhost:9000/children/${child.id}/calendar`, {headers}).then(res => res.json()),
    schedule: await fetch(`http://localhost:9000/children/${child.sdsId}/schedule`, {headers}).then(res => res.json()),
    menu: await fetch(`http://localhost:9000/children/${child.id}/menu`, {headers}).then(res => res.json()),
    notifications: await fetch(`http://localhost:9000/children/${child.sdsId}/notifications`, {headers}).then(res => res.json()),
  })))

  console.log(JSON.stringify(data, null, 2))
}


test()