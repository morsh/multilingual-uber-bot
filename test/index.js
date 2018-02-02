process.env.NODE_ENV = 'test';

var builder = require('botbuilder');

var common = require('./common');
var uberBot = require('../uber-bot');
var historyMessages = require('./dialog-flows/history-intents');
var switchingMessages = require('./dialog-flows/context-switch');

common.setup();

//Our parent block
describe('Bot Tests', () => {

  it('should recognize history intents', function (done) { 
      var connector = new builder.ConsoleConnector();
      var inMemoryStorage = new builder.MemoryBotStorage();
      var bot = uberBot.create(connector, inMemoryStorage, common.fakeInstrumentation);

      common.testBot(bot, historyMessages, done);
      
      connector.processMessage('hi');
  });

  it('context switching', function (done) { 
      var connector = new builder.ConsoleConnector();
      var inMemoryStorage = new builder.MemoryBotStorage();
      var bot = uberBot.create(connector, inMemoryStorage, common.fakeInstrumentation);       

      common.testBot(bot, switchingMessages, done);
      
      connector.processMessage('hi');
  });
});
