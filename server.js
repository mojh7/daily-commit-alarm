const express = require('express');
const app = express();
//const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const github_route = require('./routes/github');
const slack_route = require('./routes/slack');

app.use(bodyParser.json());
app.use('/github', github_route);
app.use('/slack', slack_route);

app.get('/', (req, res) => {
  res.json({test:'123'})
});

app.listen(port, ()=>{
  console.log(`express is running on ${port}`);
});

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

//app.use(cors());