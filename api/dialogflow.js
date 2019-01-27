const Dialogflow = require('dialogflow');


// You can find your project ID in your Dialogflow agent settings
const projectId = 'conversation-bot-496a0'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

    const config = {
      credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
      },
    };


    const sessionClient = new Dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const processMessage = message => {
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode,
          },
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
        //   return pusher.trigger('bot', 'bot-response', {
        //     message: result.fulfillmentText,
        //   });
            console.log(result);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }

    module.exports = processMessage;