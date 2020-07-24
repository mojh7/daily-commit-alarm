const request = require('request');
const githubConfig = require('./config/github-config.json');

const getOptions = {
  //method : 'get',
  uri : 'https://api.github.com/users/' + githubConfig.userName + '/events',
  headers: {
    'User-Agent' : 'Chrome/83.0.4103.116'
  }
}

module.exports = {
  existsTodayCommit : function(callback){
    request.get(getOptions, function (error, response, body) {
      if(error){
        console.log('get git events fail, error:', error);
        return;
      }

      if(!response || 404 == response.statusCode) {
        console.log('get git events fail, statusCode :', response.statusCode);
        return;
      }
      console.log('get git events complete, statusCode :', response && response.statusCode);
      
      let events = JSON.parse(body);
      let eventsLength = Object.keys(events).length;
      let today = new Date();
      today = new Date(today.getTime() - (((((today.getHours()) * 60) + today.getMinutes()) * 60) + today.getSeconds()) * 1000);
      console.log("today : " + today);
      let todayStr = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일';
      
      for(var i = 0; i < eventsLength; i++) {
        let createdEventDate = new Date(events[i].created_at);
        if(today.getTime() <= createdEventDate.getTime()){
          if('PushEvent' == events[i].type || 'PullRequestEvent' == events[i].type) {
            let msg = todayStr + ' 1일 1커밋 완료';
            console.log(msg);
            return;
          }
        }else {
          let msg = todayStr + ' 1일 1커밋 미완료, 커밋좀 합시다~ :)';
          console.log(msg + ', 슬랙 메시지 전송 시도');
          callback(msg);
          return;
        }
      }
      return; 
    })
  }
}
