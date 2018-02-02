var builder = require('botbuilder');

var LOCALE_VAR = 'BotBuilder.Data.PreferredLocale';
var LANGUAGES = [];
LANGUAGES['English'] = 'en';
LANGUAGES['Español'] = 'es';

var languageLibrary = (function () {

    var _lib = new builder.Library('languageLibrary');
    var _bot = null;

    _lib.dialog('change', [
        function (session, args, next) {
            builder.Prompts.choice(session, 'Please choose a language \n\n Por favor, elige un idioma', Object.keys(LANGUAGES), { listStyle: builder.ListStyle.button });
        },
        function (session, results, next) {
            session.userData[LOCALE_VAR] = LANGUAGES[results.response.entity];

            session.preferredLocale(session.userData[LOCALE_VAR]);
            _bot.settings.localizerSettings.defaultLocale = session.preferredLocale();

            session.send('language-change-success');
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