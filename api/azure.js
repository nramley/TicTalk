require('dotenv').config()

// Requires request for HTTP requests
const request = require('request');
// Requires fs to write synthesized speech to a file
const fs = require('fs');
// Requires readline-sync to read command line inputs
const readline = require('readline-sync');
// Requires xmlbuilder to build the SSML body
const xmlbuilder = require('xmlbuilder');

/*
 * These lines will attempt to read your subscription key from an environment
 * variable. If you prefer to hardcode the subscription key for ease of use,
 * replace process.env.SUBSCRIPTION_KEY with your subscription key as a string.  
 */

const subscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY;
if (!subscriptionKey) {
  throw new Error('Environment variable for your subscription key is not set.')
};

// // Prompts the user to input text.
// let text = readline.question('What would you like to convert to speech? ');

// function textToSpeech(subscriptionKey, saveAudio) {
//     let options = {
//         method: 'POST',
//         uri: 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
//         headers: {
//             'Ocp-Apim-Subscription-Key': subscriptionKey
//         }
//     };
//     // This function retrieve the access token and is passed as callback
//     // to request below.
//     function getToken(error, response, body) {
//         console.log("Getting your token...\n")
//         if (!error && response.statusCode == 200) {
//             //This is the callback to our saveAudio function.
//             // It takes a single argument, which is the returned accessToken.
//             saveAudio(body)
//         }
//         else {
//           throw new Error(error);
//         }
//     }
//     request(options, getToken)
// }


// // Make sure to update User-Agent with the name of your resource.
// // You can also change the voice and output formats. See:
// // https://docs.microsoft.com/azure/cognitive-services/speech-service/language-support#text-to-speech
// function saveAudio(accessToken) {
//     // Create the SSML request.
//     let xml_body = xmlbuilder.create('speak')
//       .att('version', '1.0')
//       .att('xml:lang', 'en-us')
//       .ele('voice')
//       .att('xml:lang', 'en-us')
//       .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
//       .txt(text)
//       .end();
//     // Convert the XML into a string to send in the TTS request.
//     let body = xml_body.toString();

//     let options = {
//         method: 'POST',
//         baseUrl: 'https://westus.tts.speech.microsoft.com/',
//         url: 'cognitiveservices/v1',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken,
//             'cache-control': 'no-cache',
//             'User-Agent': 'YOUR_RESOURCE_NAME',
//             'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
//             'Content-Type': 'application/ssml+xml'
//         },
//         body: body
//     };
//     // This function makes the request to convert speech to text.
//     // The speech is returned as the response.
//     function convertText(error, response, body){
//       if (!error && response.statusCode == 200) {
//         console.log("Converting text-to-speech. Please hold...\n")
//       }
//       else {
//         throw new Error(error);
//       }
//       console.log("Your file is ready.\n")
//     }
//     // Pipe the response to file.
//     var audiofile = 'newspeech.wave';
//     const file = fs.createWriteStream(audiofile);
//     request(options, convertText).pipe(file);
// }

// // Test api call
// textToSpeech(subscriptionKey, saveAudio);




//////////////////////////////////////
// Text to Speech ////////////////////
//////////////////////////////////////

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";

// pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");

// replace with your own subscription key,
// service region (e.g., "westus"), and
// the name of the file you want to run
// through the speech recognizer.
// var subscriptionKey = subscriptionKey;
var serviceRegion = "westus"; // e.g., "westus"
var filename = "sample.wav"; // 16000 Hz, Mono

// create the push stream we need for the speech sdk.
var pushStream = sdk.AudioInputStream.createPushStream();

// open the file and push it to the push stream.
fs.createReadStream(filename).on('data', function(arrayBuffer) {
    pushStream.write(arrayBuffer.buffer);
}).on('end', function() {
    pushStream.close();
});

// we are done with the setup
console.log("Now recognizing from: " + filename);

// now create the audio-config pointing to our stream and
// the speech config specifying the language.
var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

// setting the recognition language to English.
speechConfig.speechRecognitionLanguage = "en-US";

// create the speech recognizer.
var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

// start the recognizer and wait for a result.
recognizer.recognizeOnceAsync(
    function (result) {
    console.log(result);

    recognizer.close();
    recognizer = undefined;
    },
    function (err) {
    console.trace("err - " + err);

    recognizer.close();
    recognizer = undefined;
});


