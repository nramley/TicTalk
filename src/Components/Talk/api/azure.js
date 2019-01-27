require('dotenv').config()

let https = require ('https');
// Requires request for HTTP requests
const request = require('request');
// Requires fs to write synthesized speech to a file
const fs = require('fs');
// Requires readline-sync to read command line inputs
const readline = require('readline-sync');
// Requires xmlbuilder to build the SSML body
const xmlbuilder = require('xmlbuilder');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Read SubscriptionKey of Azure
const subscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY;
if (!subscriptionKey) {
  throw new Error('Environment variable for your subscription key is not set.')
};

// TextToSpeech
function textToSpeech(text, audiofile, callback) {
    let options = {
        method: 'POST',
        uri: 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBSCRIPTION_KEY
        }
    };
    // This function retrieve the access token and is passed as callback
    // to request below.
    function getToken(error, response, body) {
        console.log("Getting your token...\n")
        if (!error && response.statusCode == 200) {
            saveAudio(text, audiofile, body, callback)
        }
        else {
          throw new Error(error);
        }
    }
    request(options, getToken)
}


// Make sure to update User-Agent with the name of your resource.
// You can also change the voice and output formats. See:
// https://docs.microsoft.com/azure/cognitive-services/speech-service/language-support#text-to-speech
function saveAudio(text, audiofile, accessToken, callback) {
    // Create the SSML request.
    let xml_body = xmlbuilder.create('speak')
      .att('version', '1.0')
      .att('xml:lang', 'en-us')
      .ele('voice')
      .att('xml:lang', 'en-us')
      .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
      .txt(text)
      .end();
    // Convert the XML into a string to send in the TTS request.
    let body = xml_body.toString();

    let options = {
        method: 'POST',
        baseUrl: 'https://westus.tts.speech.microsoft.com/',
        url: 'cognitiveservices/v1',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'User-Agent': 'YOUR_RESOURCE_NAME',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml'
        },
        body: body
    };
    // This function makes the request to convert speech to text.
    // The speech is returned as the response.
    function convertText(error, response, body){
      if (!error && response.statusCode == 200) {
        console.log("Converting text-to-speech. Please hold...\n")
      }
      else {
        callback(error);
        throw new Error(error);
      }
      callback("File is ready");
      console.log("Your file is ready.\n")
    }
    // Pipe the response to file.
    // var audiofile = 'newspeech2.wave';
    const file = fs.createWriteStream(audiofile);
    request(options, convertText).pipe(file);
}

// // Example api call
// textToSpeech("Test", "output.wav", (res) => {
//     console.log("completed conversion")
// });


//////////////////////////////////////
// Text to Speech ////////////////////
//////////////////////////////////////

// // pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");

// Example function call
// speechToText("output.wav", (res) => {
//     console.log(res);
// })

function speechToText(filename, callback){
    var serviceRegion = "westus"; // e.g., "westus"
    
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
        // console.log(result);
        callback(result);
        recognizer.close();
        recognizer = undefined;
        },
        function (err) {
        console.trace("err - " + err);
    
        recognizer.close();
        recognizer = undefined;
    });
}


//Example call
spellChecker("I will take there food", (res)=>{
    console.log(res);
});

function spellChecker(query, callback){
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/spellcheck';    

    let mkt = "en-US";
    let mode = "proof";
    let text = query;
    let query_string = "?mkt=" + mkt + "&mode=" + mode;
    
    let request_params = {
        method : 'POST',
        hostname : host,
        path : path + query_string,
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : text.length + 5,
            'Ocp-Apim-Subscription-Key' : process.env.BING_SUBSCRIPTION_KEY,
    //        'X-Search-Location' : CLIENT_LOCATION,
    //        'X-MSEdge-ClientID' : CLIENT_ID,
    //        'X-MSEdge-ClientIP' : CLIENT_ID,
        }
    };
    
    let response_handler = function (response) {
        let body = '';
        response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            // console.log (body);
            callback(body);
        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };
    
    let req = https.request (request_params, response_handler);
    req.write ("text=" + text);
    req.end ();
}


module.exports = {
    textToSpeech: textToSpeech,
    speechToText: speechToText,
    spellChecker: spellChecker
}

