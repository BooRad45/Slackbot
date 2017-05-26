// tell node we want to use ES6 strict mode
'use strict';

// instantiate express
const express = require("express");
// store express application object in variable 'service'
const service = express();
const ServiceRegistry = require('./serviceRegistry');
const serviceRegistry = new ServiceRegistry();

service.set('serviceRegistry', serviceRegistry);

// adding service registry to make app more resilient
service.put('/service/:intent/:port', (req, res, next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;
    // on some systems the remote address will be in IPv6 notation (double colon)
    const serviceIp = req.connection.remoteAddress.includes('::')
        // if in IPv6 notation we have to put the IP address in curly brackets
        ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress; // all other cases
    serviceRegistry.add(serviceIntent, serviceIp, servicePort);
    res.json({ result: `${serviceIntent} at ${serviceIp}:${servicePort}` });
});

// export the express application object
module.exports = service;
