const Slack = require('slack-node');
const slack = new Slack();
const slackConfig = require('./config/slack-config.json');

module.exports = {
    init: function () {
      slack.setWebhook(slackConfig.webhookUri)
    },
    sendMsgSlack : function(message) {
      slack.webhook({
        channel: slackConfig.channel, // 전송될 슬랙 채널
        username: slackConfig.username, //슬랙에 표시될 이름
        text: message
      }, function(err, response) {
        if(err) return console.error(err);
        console.log('slack webhook response :', response && response.response);
      });
    }
}

