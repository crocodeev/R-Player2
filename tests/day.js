const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat);

const time = '9:0';

const current = dayjs(time, 'hh:mm').format('HH:mm:ss');
console.log(current);