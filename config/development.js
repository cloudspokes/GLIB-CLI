'use strict';

const winston = require('winston');

let config = {};

config.TC = {};
config.TC.AUTHN_URL = process.env.TC_AUTHN_URL || 'https://topcoder.auth0.com/oauth/ro';
config.TC.AUTHZ_URL = process.env.TC_AUTHZ_URL || 'https://api.topcoder.com/v3/authorizations';
config.TC.CLIENT_ID = process.env.TC_CLIENT_ID || '6ZwZEUo2ZK4c50aLPpgupeg5v2Ffxp9P';

config.GLIB = {};
config.GLIB.HOST = process.env.GLIB_HOST || 'http://glib-prod.herokuapp.com';
config.GLIB.ENDPOINT = process.env.GLIB_ENDPOINT || '/challenges/cli';
config.GLIB.URL = config.GLIB_HOST + config.GLIB_ENDPOINT;
config.GLIB.USERNAME = process.env.GLIB_USERNAME || '';
config.GLIB.PASSWORD = process.env.GLIB_PASSWORD || '';

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
