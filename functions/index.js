const functions = require('firebase-functions');
const twitter = require('twitter');

exports.shimarin= functions.https.onRequest((request, response) => {
  response.contentType('application/json');
  response.json({
    status: 200,
    payload: {
    }
  });
});
