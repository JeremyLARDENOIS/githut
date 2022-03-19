const { Parser } = require("json2csv")
const fs = require("fs")

const dataDir = "./src/data/"

for (const file of fs.readdirSync(dataDir)) {
  console.log(`Converting ${file}...`)
  const data = JSON.parse(fs.readFileSync(dataDir + file))
  const json2csvParser = new Parser(["name", "year", "quarter", "count"])
  const csv = json2csvParser.parse(data)
  fs.writeFileSync(dataDir + file + ".csv", csv)
}
