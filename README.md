# Multilingual Uber-Bot
This project is an example of how to develop a bot using bot framework while providing a solution for:

1. An **Uber-Bot** that can orchestrate and route into multiple **Sub-Bots**.
2. Developing a bot that uses LUIS intent dialogs and offers a communication in multiple languages.

For a full description of this case study [click here](https://www.microsoft.com/developerblog/real-life-code/2016/11/24/Multilingual-Context-Switching-Bot.html).

> This link will be avilable shortly

# Execution

Run `npm start`.

You can run this sample locally as is and communicate with it using [bot emulator](https://docs.botframework.com/en-us/tools/bot-framework-emulator/).
You can also connect this bot to your own registered bot by copying the file `config/dev.sample.json` to `config/dev.private.json`

and change:

```json
{
  "BOT_MicrosoftAppId": "<GUID for registered bot id>",
  "BOT_MicrosoftAppPassword": "<Password for registered bot>",
  "LUIS_modelBaseURL":"https://api.projectoxford.ai/luis/v1/application",
  "LUIS_applicationId_en":"<You can use as is or replace with a LUIS app id for your own english model>",
  "LUIS_applicationId_es":"<You can use as is or replace with a LUIS app id for your own spanish model>",
  "LUIS_subscriptionKey":"<You can use as is or replace with your own LUIS subscription id>"
}
``` 

## Testing

Run `npm test`.

# Scenarios

Try one of the following Scenarios

## Using a LUIS Dialog Sub-Bot

You can perform this scenario in english or spanish:

* Type: Change languages
* Type: English
* Type: history
* Type: Tell me about Einstein
* Type: Go back to 1983

This enters the context of history bot and remains there until you type either 'go home' or 'cancel'.

## Context Switching

* Type: history
* Type: go feedback
* Type: go home
* Type: history
* Type: cancel

This is an example of both switching between bots and ending a current bot conversation and going up to the upper level.