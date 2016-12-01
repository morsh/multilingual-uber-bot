var history = require('../../bots/history/locale/en');
var feedback = require('../../bots/feedback/locale/en');

module.exports = [
    {
      in: "Please choose a language \n\n Por favor, elige un idioma"
    },
    {
      in: " (1. English or 2. Español)",
      out: "English"
    },
    {
      in: "Language change was successfull",
    },
    {
      in: /^(What bot do you want?).*(2. History)/i,
      out: "history"
    },
    { 
      in: history["history-welcome"], 
      out: "tell me about history" 
    },
    {
      in: history["history-details"],
      out: "go back to 2009" 
    },
    {
      in: history["history-goback"]
    }
];