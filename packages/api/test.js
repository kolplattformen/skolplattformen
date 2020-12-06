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