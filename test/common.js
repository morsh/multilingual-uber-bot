var assert = require('assert');
var nock = require('nock');

function setup() {
  var englishModel = '/?id=en&subscription-key=subId&q=';
  var spanishModel = '/?id=es&subscription-key=subId&q=';
  nock('https://luis.url')
    .get(englishModel + encodeURIComponent('go back to 2009'))
    .reply(200, {
      "query": "go back to 2009",
      "intents": [
        {
          "intent": "history.goback",
          "score": 0.6
        },
        {
          "intent": "history.info",
          "score": 0.2
        },
        {
          "intent": "None",
          "score": 0.1
        }
      ],
      "entities": [
        {
          "entity": "2009",
          "type": "builtin.datetime.date",
          "startIndex": 11,
          "endIndex": 14,
          "resolution": {
            "date": "2009"
          }
        }
      ]
    })
    .get(englishModel + encodeURIComponent('tell me about history'))
    .reply(200, {
      "query": "tell me about history",
      "intents": [
        {
          "intent": "history.info",
          "score": 0.554733932
        },
        {
          "intent": "history.goback",
          "score": 0.131422982
        },
        {
          "intent": "None",
          "score": 0.0588838123
        }
      ],
      "entities": [
        {
          "entity": "history",
          "type": "entity",
          "startIndex": 14,
          "endIndex": 20,
          "score": 0.5316767
        }
      ]
    });
}

function testBot(bot, messages, done) {
  var step = 1;
  var connector = bot.connector();
  bot.on('send', function (message) {
      
    if (step++ >= 1) {
      var check = messages[step - 2];
      if (check.type) {
        assert(message.type === check.type);
      }
      
      if (check.in) {
        if (check.in.test ? check.in.test(message.text) : message.text === check.in) {
        assert(true);
        } else {
        console.error('<%s> does not match <%s>', message.text, check.in);
        assert(false);
        }
      }

      if (check.out) {
        connector.processMessage(check.out);
      }

      if (step - 1 == messages.length) {
        done();
      }
    } else {
      assert(false);
      done();
    }
  });
}

module.exports = {
  setup,
  testBot
};