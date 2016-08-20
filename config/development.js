'use strict';

var winston = require('winston');

let config = {};

config.AUTH_URL = 'https://topcoder.auth0.com/oauth/ro';
config.GLIB_HOST = process.env.GLIB_HOST || 'http://glib-prod.herokuapp.com';
config.GLIB_ENDPOINT = process.GLIB_ENDPOINT || '/cli';
config.GLIB_URL = config.GLIB_HOST + config.GLIB_ENDPOINT;
config.GLIB_USERNAME = process.GLIB_USERNAME || '';
config.GLIB_PASSWORD = process.GLIB_PASSWORD || '';
config.TC_CLIENT_ID = process.TC_CLIENT_ID || '';

config.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
config.LOG_FILE = process.env.LOG_FILE || 'app.log';

config.logger = new(winston.Logger)({
    level: config.LOG_LEVEL,
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: config.LOG_FILE
        })
    ]
});

module.exports = config;
