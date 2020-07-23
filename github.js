var request = require('request');

const getOptions = {
  //method : 'get',
  uri : 'https://api.github.com/users/momojh94/events',
  headers: {
    'User-Agent' : 'Chrome/83.0.4103.116'
  }
}

module.exports = {
  existsCommitToday : function(callback){
    request.get(getOptions, function (error, response, body) {
      if(error){
        console.log('fail, error:', error);
        return;
      }

      if(!response || 404 == response.statusCode) {
        console.log('fail, statusCode :', response.statusCode);
        return;
      }
      console.log('complete, statusCode :', response && response.statusCode);
      
      let events = JSON.parse(body);
      let eventsLength = Object.keys(events).length;
      let today = new Date();
      today = new Date(today.getTime() - (((((today.getHours()) * 60) + today.getMinutes()) * 60) + today.getSeconds()) * 1000);
      console.log("today : " + today + ", " + today.getTime());
      let todayStr = today.getFullYear() + '년 ' + (today.getMonth() + 1) + '월 ' + today.getDate() + '일';
      
      for(var i = 0; i < eventsLength; i++) {
        let createdEventDate = new Date(events[i].created_at);
        console.log(i + " : " + createdEventDate);
        if(today.getTime() <= createdEventDate.getTime()){
          if('PushEvent' == events[i].type || 'PullRequestEvent' == events[i].type) {
            console.log(todayStr + ' : 1일 1커밋 완료');
            return true;
          }
        }else {
          console.log(todayStr + ' : 1일 1커밋 미완료');
          let msg = todayStr + ' 1일 1커밋 미완료, 오늘의 커밋을 푸시 해주세요!!';
          callback(msg);
          return false;
        }
      }
      return false; 
    })
  }
}
