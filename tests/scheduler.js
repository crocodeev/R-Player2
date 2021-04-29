const scheduler = require('node-schedule');

const job = scheduler.scheduleJob("somejob", "04 13 12 * * *", () => console.log("It's ok to using leading zeroes"))


