var builder = require('botbuilder');
var config = require('../../config');

//=========================================================
// Library creation
//=========================================================

var feedbackBot = (function () {

  var model;
  var recognizer;
  var intents;
  var _lib = new builder.Library('historyBot');
  _lib.localePath('./bots/history/locale/');
  _lib.dialog('/', [
      function (session, results, next) {
          session.endDialog("history-welcome");
      }
  ]);

  _lib.dialog('history', [
    function (session, results) {
        session.endDialog("history-details");
    }
  ]);

  function createLibrary () {
      return _lib;
  }

  function getName (session) { 
    return session.localizer.gettext(session.preferredLocale(), "history-name");
  }

  function welcomeMessage (session) {
      return session.localizer.gettext(session.preferredLocale(), "history-welcome");
  }

  function initialize (locale) {

    // Create LUIS recognizer that points at our model for selected locale
    model = config.get('LUIS_modelBaseURL')+"?id="+config.get('LUIS_applicationId_' + locale)+"&subscription-key="+config.get('LUIS_subscriptionKey')+"&q=";

    intents = new builder.IntentDialog();
    intents.onDefault("historyBot:/")
    intents.matches(/^(history|היסטוריה)/i, "historyBot:history");
    // .onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."))
    return intents;
  };

  return {
    createLibrary: createLibrary,
    getName: getName,
    welcomeMessage: welcomeMessage,
    initialize: initialize
  }

})();

module.exports = feedbackBot;