const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export default function createDateStamp(){
    return dayjs().format('YYYY-MM-DDTHH:mm:ss');
}