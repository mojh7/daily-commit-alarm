var express = require('express');
var router = express.Router();
var request = require('request');

const getOptions = {
  //method : 'get',
  uri : 'https://api.github.com/users/momojh94/events',
  headers: {
    'User-Agent' : 'Chrome/83.0.4103.116'
  }
}

let events = new Array();

router.get('/', (req, res) =>
  request.get(getOptions, function (error, response, body) {
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode);
    printAllGitEvents(JSON.parse(body));
    res.json(JSON.parse(body));
  })
);

function printAllGitEvents(body){
  let bodyLength = Object.keys(body).length;
  let today = new Date();
  today = new Date(today.getTime() - (((((today.getHours()) * 60) + today.getMinutes()) * 60) + today.getSeconds()) * 1000);
  console.log("today : " + today + ", " + today.getTime() + ", " + today.getMonth());
  let todayStr = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일';
  for(var i = 0; i < bodyLength; i++){
    let createdEventDate = new Date(body[i].created_at);
    if(today.getTime() <= createdEventDate.getTime()){
      if('PushEvent' == body[i].type || 'PullRequestEvent' == body[i].type){
        console.log(todayStr + ' : 1일 1커밋 완료');
        break;
      }
    }else {
      console.log(todayStr + ' : 1일 1커밋 미완료');
      break;
    }
  }
}


module.exports = router;
