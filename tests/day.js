const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat);

const current = dayjs().format('YYYY-MM-DDTHH:mm:ss');
console.log(current);