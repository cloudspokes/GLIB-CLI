'use strict';

let _ = require('lodash');
let util = require('util');
let config = require('config');
let logger = config.logger;
let colors = require('colors');
let commandLineArgs = require('command-line-args');
let request = require('request');
let requestPromise = require('request-promise');


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

var userName = options.username || config.GLIB_USERNAME || '';
var password = options.password || config.GLIB_PASSWORD || '';
var client_id = options.clientId || config.TC_CLIENT_ID || '';
var title = options.title || ''; //CWD-- TODO: pull out from file ?

if (options.file) {
    console.log('using ' + options.file + ' to create challenge');

    var tokenRequestPayload = {
        "username": userName,
        "password": password,
        "client_id": client_id,
        "sso": false,
        "scope": "openid profile offline_access",
        "response_type": "token",
        "connection": "LDAP",
        "grant_type": "password",
        "device": "Browser"
    };

    var reqOpts = {
        method: 'POST',
        uri: config.AUTH_URL,
        json: true,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: tokenRequestPayload
    };

    requestPromise(reqOpts).then(function(res) {
        console.log(res);
        var accessToken = res.id_token;

        var glibResOpts = {
            method: 'POST',
            uri: config.GLIB_URL,
            header: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + accessToken
            },
            body: {
                title: title,
                description: '', //CWD-- fill in from file
                submissionReq: '', //CWD-- fill in from file or prompt
                tc_project_id: '' //CWD-- fetch project Id from CLI
            },
            json: true
        };

        console.log(glibResOpts);
        requestPromise(glibResOpts).then(function(resGLIB) {
            console.log(resGLIB);
        }).catch(function(err) {
            console.log(err);
        });

    }).catch(function(err) {
        console.log(err);
    });

} else {
    console.log('A file name is required to create a challenge from.');
}
