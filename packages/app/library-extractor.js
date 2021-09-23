// Filters the output from 'react-native-oss-license'.

const fs = require('fs').promises
const packageJson = require('./package.json')
const rnLicenses = require('./licenses-oss.json')

/**
 * TOOD: Make this a bit more testable
 */
async function run() {
  try {
    const dependencies = Object.keys(packageJson.dependencies)

    const result = rnLicenses.filter((pkg) => {
      return dependencies.find((name) => pkg.libraryName === name)
    })

    await fs.writeFile(
      './libraries.json',
      JSON.stringify(result, null, 2),
      'utf-8'
    )
  } catch (e) {
    console.error(e)
  }
}

run()
