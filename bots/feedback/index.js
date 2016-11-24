var builder = require('botbuilder');
var config = require('../../config');

//=========================================================
// Library creation
//=========================================================

var feedbackBot = (function () {

  var model;
  var recognizer;
  var intents;
  var _lib = new builder.Library('feedbackBot');
  _lib.localePath('./bots/feedback/locale/');
  _lib.dialog('/', [
      function (session, results, next) {
          session.endDialog("feedback-welcome");
      }
  ]);

  _lib.dialog('feedback', [
      function (session, results) {
          session.endDialog('feedback-message');
      }
  ]);

  function createLibrary () {
      return _lib;
  }

  function getName (session) { 
    return session.localizer.gettext(session.preferredLocale(), "feedback-name");
  }

  function welcomeMessage (session) {
      return session.localizer.gettext(session.preferredLocale(), "feedback-welcome");
  }

  function initialize (locale) {

      // Create LUIS recognizer that points at our model for selected locale
      model = config.get('LUIS_modelBaseURL')+"?id="+config.get('LUIS_applicationId_' + locale)+"&subscription-key="+config.get('LUIS_subscriptionKey')+"&q=";
      
      intents = new builder.IntentDialog();
      intents.onDefault("feedbackBot:/");
      intents.matches(/^(feedback|משוב)/i, "feedbackBot:feedback");
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