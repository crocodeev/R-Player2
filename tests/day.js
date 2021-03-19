const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat);
const start = "2021-02-02"
const end = "2021-03-31"

const current = dayjs().format('YYYY-MM-DD') 
console.log(current >= start && current <= end);