const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const schedule = require('node-schedule');
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
checkDailyCommit();
function checkDailyCommit(){
  github.existsTodayCommit(slack.sendMsgSlack);
}