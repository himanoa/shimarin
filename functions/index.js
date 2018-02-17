const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getsShimarin = functions.https.onRequest((request, response) => {
  response.contentType('application/json');
  response.json({
    status: 200,
    payload: {
      tintin: true
    }
  });
});
