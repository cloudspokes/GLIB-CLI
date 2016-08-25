'use strict';

let _ = require('lodash');
let util = require('util');
let config = require('config');
let logger = config.logger;
let colors = require('colors');
let commandLineArgs = require('command-line-args');
let TCAuth = require('./lib/TCAuth');
let tc = new TCAuth(config.TC, logger);


const options = commandLineArgs([{
    name: 'file',
    alias: 'f',
    type: String
}, {
    name: 'username',
    alias: 'u',
    type: String
}, {
    name: 'password',
    alias: 'p',
    type: String
}, {
    name: 'clientId',
    alias: 'c',
    type: String
}, {
    name: 'title',
    alias: 't',
    type: String
}]);

console.log(options);

var userName = options.username || config.GLIB.USERNAME || '';
var password = options.password || config.GLIB.PASSWORD || '';

var title = options.title || ''; //CWD-- TODO: pull out from file ?
var srcFile = options.file || 'challenge.md'; //CWD-- defaulting to this for now

//CWD-- todo read in file contents if it extsts

if (srcFile) {
    console.log('using ' + srcFile + ' to create challenge');

    tc.login(userName, password, function(err, token) {
        logger.debug('we have a token: %s', token);

    });

} else {
    console.log('A file name is required to create a challenge from.');
}
