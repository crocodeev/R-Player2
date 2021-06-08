const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat);

const current = dayjs().format('HH:mm:ss');;
console.log(current);