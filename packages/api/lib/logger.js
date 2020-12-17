const { writeFile } = require('fs/promises')
const { join } = require('path')
const mkdirp = require('mkdirp')

const wait = (ms) => new Promise(r => setTimeout(r, ms))

const logRequest = async (log) => {
  try {
    const [,,host,...slugs] = log.request.url.split('/')
    const [sub] = host.split('.')
    const last = slugs.pop()
    const filename = []
    filename.push((last.indexOf('?') > 0
      ? last.substring(0, last.indexOf('?'))
      : last))
    if (log.errors) {
      filename.push('_error')
    }
    filename.push('.json')
    const dir = join(process.cwd(), 'requests', sub, ...slugs)
    await mkdirp(dir)
    await wait(100)
    await writeFile(
      join(dir, filename.join('')),
      JSON.stringify(log, null, 2)
    )
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  logRequest
}
