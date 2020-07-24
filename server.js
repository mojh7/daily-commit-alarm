const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
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
//checkDailyCommit();
function checkDailyCommit(){
  github.existsTodayCommit(slack.sendMsgSlack);
}

schedule.scheduleJob("0 0 21,23 * * *", function() {
  checkDailyCommit();
}

/*
* * * * * *
│ │ │ │ │ │
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

ex)
var scheduler = schedule.scheduleJob("5,30 * * * * *", function() {
    console.log('schedule test1');
});
*/