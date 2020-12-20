const init = require('./dist').default

async function run () {
  try {
    const api = init()
    const status = await api.login('197304161511')
    status.on('PENDING', () => console.log('PENDING'))
    status.on('USER_SIGN', () => console.log('USER_SIGN'))
    status.on('ERROR', () => console.error('ERROR'))
    status.on('OK', () => console.log('OK'))

    api.on('login', async () => {
      console.log('Logged in')
      const children = await api.getChildren()
      console.log(children)
    })
  } catch (err) {
    console.error(err)
  }
}

run()
