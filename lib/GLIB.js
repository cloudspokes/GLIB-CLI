'use strict';

let _ = require('lodash');
let requestPromise = require('request-promise');

module.exports.createChallenge = function createChallenge(config, accessToken, srcFile, cb) {
    let challenge = {
        title: '[$50] GLIB CLI TEST',
        description: 'this is the description',
        submissionGuidelines: 'do something', // CWD-- fill in from file or prompt
        tcProjectId: '10139' // CWD-- fetch project Id from CLI
    };
    console.log(config);
    var glibResOpts = {
        method: 'POST',
        uri: config.URL,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + accessToken
        },
        body: {
            title: challenge.title,
            description: challenge.description,
            submissionGuidelines: challenge.submissionGuidelines,
            tc_project_id: challenge.tcProjectId
        },
        json: true
    };

    console.log(glibResOpts);

    requestPromise(glibResOpts).then(function(resGLIB) {
        console.log(resGLIB);
        cb(null, resGLIB);
    }).catch(function(err) {
        console.log(err);
        cb(err);
    });
};
