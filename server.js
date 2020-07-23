const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const github = require(__dirname + '/github.js');
const slack = require(__dirname + '/slack.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({test:'123'})
});

app.listen(port, ()=>{
  console.log(`express is running on ${port}`);
});

slack.init();

checkTodayCommit();

function checkTodayCommit(){
  github.existsCommitToday(slack.sendMsgSlack);
}

//var schedule = require('node-schedule');

/*
var scheduler = schedule.scheduleJob("5,10,15,20,25,30 * * * * *", function() {
    console.log('schedule test1');
});
var scheduler2 = schedule.scheduleJob("5,10,15,20,25,30 * * * * *", function() {
    console.log('schedule test2');
});
var scheduler3 = schedule.scheduleJob("5,10,15,20,25,30 * * * * *", function() {
    console.log('schedule test3');
});
*/