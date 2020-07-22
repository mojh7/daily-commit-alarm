const Router = require('express');
const router = Router();
const Slack = require('slack-node');
 
//const webhookUri = "Webhook URL"; 
const webhookUri = "https://hooks.slack.com/services/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"; 

const slack = new Slack();
slack.setWebhook(webhookUri);

async function sendMsgSlack(message) {
  slack.webhook({
    channel: '#slack-test', // 전송될 슬랙 채널
    username: 'daily-commit-alarm-bot', //슬랙에 표시될 이름
    text: message
  }, function(err, response) {
    if(err) return console.error(err);
    console.log('response : ' + response.response);
  });
}

// 테스트를 위해 localhost:port/slack 호출시 메시지 slack에 전송
router.get('/', (req, res) => {
  msg = '슬랙 메시지 보내기 테스트 random num : ' + Math.floor(100*Math.random());
  result = sendMsgSlack(msg),
  res.send('slack webhook test~')
});

module.exports = router;
