const fs = require('fs')

const version = fs.readFileSync('./.version').toString()
const packageFile = require('./package.json')

packageFile.version = version

console.log(version.toString())
fs.writeFileSync('./package.json', JSON.stringify(packageFile))
