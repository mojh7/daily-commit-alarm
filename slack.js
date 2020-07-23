const Slack = require('slack-node');
const slack = new Slack();
const slackConfig = require('./config/slack-config.json');

module.exports = {
    init: function () {
      slack.setWebhook(slackConfig.webhook_uri),
      console.log(slackConfig.webhook_uri)
    },
    sendMsgSlack : function(message) {
      slack.webhook({
        channel: '#slack-test', // 전송될 슬랙 채널
        username: 'daily-commit-alarm-bot', //슬랙에 표시될 이름
        text: message
      }, function(err, response) {
        if(err) return console.error(err);
        console.log('response : ' + response.response);
      });
    }
}

