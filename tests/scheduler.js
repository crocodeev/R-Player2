const scheduler = require('node-schedule');

<<<<<<< HEAD
const job = scheduler.scheduleJob()
=======

const startTime = new Date(Date.now() + 5000);
const endTime = new Date(startTime.getTime() + 5000);
const job = scheduler.scheduleJob({ start: startTime, end: endTime, rule: null }, function(){
  console.log('Time for tea!');
});
>>>>>>> 8b46a7b5fee626edcc948f0f2f43d7f2c2996cd3
