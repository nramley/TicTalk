var apiai = require('apiai');

var app = apiai("7d84fd1d0c27411daec92fde07c8417b");

var request = app.textRequest('Nice to see you!', {
    sessionId: '123456'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
