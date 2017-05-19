// tell node we want to use ES6 strict mode
'use strict';

// instantiate express
const express = require("express");
// store express application object in variable 'service'
const service = express();

// export the express application object
module.exports = service;
