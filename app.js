var restify = require('restify');
var builder = require('botbuilder');
var uberBot = require('./uber-bot');

var config = require('./config');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.use(restify.queryParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: config.get('BOT_MicrosoftAppId'),
    appPassword: config.get('BOT_MicrosoftAppPassword')
});
uberBot.create(connector);

server.post('/api/messages', connector.listen());