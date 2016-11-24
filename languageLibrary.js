var builder = require('botbuilder');

var LOCALE_VAR = 'BotBuilder.Data.PreferredLocale';
var LANGUAGES = [];
LANGUAGES['English'] = 'en';
LANGUAGES['Español'] = 'es';
LANGUAGES['עברית'] = 'he';

var languageLibrary = (function () {

    var _lib = new builder.Library('languageLibrary');
    var _bot = null;

    _lib.dialog('change', [
        function (session, args, next) {
            session.send('Please choose a language \n\n Por favor, elige un idioma \n\n בחר שפה בבקשה');
            builder.Prompts.choice(session, '', Object.keys(LANGUAGES));
        },
        function (session, results, next) {
            session.userData[LOCALE_VAR] = LANGUAGES[results.response.entity];

            session.preferredLocale(session.userData[LOCALE_VAR]);
            _bot.settings.localizerSettings.defaultLocale = session.preferredLocale();

            session.send('languageLibrary:language-change-success');
            session.endDialog();
        }
    ]);

    function createLibrary (bot) {

        if (!bot) {
            throw 'Please provide a bot object';
        }
        
        _bot = bot;
        return _lib;
    }

    function changeLocale (session, options) {
        // Start dialog in libraries namespace
        session.beginDialog('languageLibrary:change', options || {});
    }

    function ensureLocale (session) {
        session.preferredLocale(session.userData[LOCALE_VAR]);
        _bot.settings.localizerSettings.defaultLocale = session.preferredLocale();
    }

    function isLocaleSet (session) {
        return session.userData[LOCALE_VAR];
    }

    return {
        createLibrary: createLibrary,
        changeLocale: changeLocale,
        ensureLocale: ensureLocale,
        isLocaleSet: isLocaleSet
    };

})();

module.exports = languageLibrary;