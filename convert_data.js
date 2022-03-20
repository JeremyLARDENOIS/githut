const { Parser } = require('json2csv')
const Admzip = require('adm-zip')
const fs = require('fs')

const dataDir = './src/data/'

const zipJson = new Admzip()
const zipCsv = new Admzip()

for (const file of fs.readdirSync(dataDir)) {
  if (file.includes('.json')) {
  console.log(`Converting ${file}...`)
  const data = JSON.parse(fs.readFileSync(dataDir + file))
  const json2csvParser = new Parser(['name', 'year', 'quarter', 'count'])
  const csv = json2csvParser.parse(data)
  // Convert json to csv
  const csvName = file.substring(0, file.length - 5) + '.csv'
  fs.writeFileSync(dataDir + csvName, csv)
  // Add to zip
  zipJson.addFile(dataDir + file, file)
  zipCsv.addFile(dataDir + csvName, csvName)
  // Create zip
  zipJson.writeZip(dataDir + 'data-json.zip')
  zipCsv.writeZip(dataDir + 'data-csv.zip')
  }
}


