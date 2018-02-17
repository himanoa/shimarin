const functions = require('firebase-functions') ;
const Twitter = require('twitter');

exports.shimarin= functions.https.onRequest((request, response) => {
  const errorHandler = (error) => {
    response.json({
      status: 500,
      payload: {
        error: JSON.stringify(error.message)
      },
      error: true
    })
  }
  response.contentType('application/json');
  try{
    const auth = {
      consumer_key: process.env.consumerKey || functions.config().twitter.consumerkey,
      consumer_secret: process.env.consumerSecret || functions.config().twitter.consumersecret,
      access_token_key: process.env.accessToken || functions.config().twitter.accesstoken,
      access_token_secret: process.env.accessTokenSecret || functions.config().twitter.accesstokensecret
    }
    const tw = new Twitter(auth)

    tw.post('statuses/update', { status: 'ｺﾄﾉﾊｼﾏｲｶﾜｲｲﾔｯﾀ-' }, (error) =>  {
      if(error) {
        errorHandler(error)
        return
      }
      response.json({
        status: 200,
        payload: {
        },
        error: false
      });
    })

  }catch(e) {
    errorHandler(e)
  }
});
