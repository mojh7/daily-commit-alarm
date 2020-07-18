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
  console.log(bodyLength);
  for(var i = 0; i < bodyLength; i++){
    if('PushEvent' == body[i].type){
      console.log(i + ", type = " + body[i].type + " id : "  + body[i].id + ", created_at : " + body[i].created_at);
      //  + " msg : " + body[i].payload.commits[0].message + 
      console.log((gmt < body[i].created_at));
    } else if('PullRequestEvent' == body[i].type){
      console.log(i + ", type = " + body[i].type + " id : "  + body[i].id + ", created_at : " + body[i].created_at);
      //console.log(i + ", " + body[i].id + " title : " + body[i].payload.pull_request.title + ", created_at : " + body[i].created_at);
    }
  }
}


module.exports = router;
