const scheduler = require('node-schedule');
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')

let counter = 0;

const job = scheduler.scheduleJob("somejob", "00 05/5 10-22 * * *", () => {
    console.log(dayjs().format());
    console.log(counter);
    counter++;
})

console.log(job);

