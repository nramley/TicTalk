const apiai = require('apiai');

const app = apiai("7d84fd1d0c27411daec92fde07c8417b");

// returns a request object
function getRequest(requestText) {
    return app.textRequest(
        requestText,
        {sessionId: '123456'}
    )
}

// returns a response text 
function printResponse(request) {
    request.on('response', function(response) {
        console.log(response.result.fulfillment.speech);
    });

    request.on('error', function(error) {
        console.log(error);
    });
}

function endRequest(request) {
    request.end();
}


var request = getRequest("How are you");
printResponse(request);
endRequest(request);


// request.on('response', function(response) {
//     console.log(response.result.fulfillment.speech);
// });

// request.on('error', function(error) {
//     console.log(error);
// });

// request.end();


// exports the functions
module.exports.getRequest = getRequest;
module.exports.printResponse = printResponse;
module.exports.endRequest = endRequest;