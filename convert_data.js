const { Parser } = require("json2csv")
const fs = require("fs")

const dataDir = "./src/data/"

for (const file of fs.readdirSync(dataDir)) {
  if (file.includes(".json")) {
  console.log(`Converting ${file}...`)
  const data = JSON.parse(fs.readFileSync(dataDir + file))
  const json2csvParser = new Parser(["name", "year", "quarter", "count"])
  const csv = json2csvParser.parse(data)
  // Convert json to csv
  fs.writeFileSync(dataDir + file.substring(0, file.length - 5) + ".csv", csv)
  }
}
