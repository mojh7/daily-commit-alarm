const express = require('express');
const app = express();
//const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const route = require('./routes/index');

var schedule = require('node-schedule');

var scheduler = schedule.scheduleJob("5,10,15,20,25,30 * * * * *", function() {
    console.log('schedule test1');
});
var scheduler2 = schedule.scheduleJob("5,10,15,20,25,30 * * * * *", function() {
    console.log('schedule test2');
});
var scheduler3 = schedule.scheduleJob("5,10,15,20,25,30 * * * * *", function() {
    console.log('schedule test3');
});

//app.use(cors());

app.use(bodyParser.json());
app.use('/api', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});