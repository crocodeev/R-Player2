const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat);
console.log(dayjs("10:0", "H:m").format("HH:mm:ss"));