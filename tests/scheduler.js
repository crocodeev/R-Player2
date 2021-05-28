const scheduler = require('node-schedule');
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

let counter = 0;

const job = scheduler.scheduleJob("somejob", "00 10/01 10-23,00-01 * * *", () => {
    console.log(dayjs().format());
    console.log(counter);
    counter++;
})

console.log(job);

