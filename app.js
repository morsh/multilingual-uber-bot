var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure');
var instrumentation = require('botbuilder-instrumentation');

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

// Configure custom state data storage
var cosmosDbOptions = {
    host: config.get('COSMOSDB_host'),
    masterKey: config.get('COSMOSDB_key'), 
    database: 'botdocs',   
    collection: 'botdata'
};
var cosmosDbClient = new azure.DocumentDbClient(cosmosDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, cosmosDbClient);

// Configure instrumentation
var logging = new instrumentation.BotFrameworkInstrumentation({
    instrumentationKey: config.get('BotDevAppInsightsKey'),
    sentiments: {
        key: config.get('SENTIMENT_subscriptionkey')
    }
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: config.get('MicrosoftAppId'),
    appPassword: config.get('MicrosoftAppPassword')
});
uberBot.create(connector, cosmosStorage, logging);

server.post('/api/messages', connector.listen());