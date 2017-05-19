// tell node we want to use ES6 strict mode
'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
// need http object from node.js core
const http = require('http');

// initiate the server by adding in 'service' object
const server = http.createServer(service);


const witToken = '5UAY242LLPRJ427HXIEX4SRJUAZA5OC3';
const witClient = require('../server/witclient')(witToken);

const slackToken = 'xoxb-184836662593-NJiLq0mwRUQ6lnhtG1sXdmSM';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000) );

// listen on port 3000 with our server
server.listen(3000);

server.on('listening', function() {
     console.log(`AUDREY is listening on ${server.address().port} in ${service.get('env')} mode.`)
});
