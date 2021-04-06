const scheduler = require('node-schedule');


const startTime = new Date(Date.now() + 5000);
const endTime = new Date(startTime.getTime() + 5000);
const job = scheduler.scheduleJob({ start: startTime, end: endTime, rule: null }, function(){
  console.log('Time for tea!');
});