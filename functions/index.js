const functions = require('firebase-functions') ;
const Twitter = require('twitter');

exports.shimarin= functions.https.onRequest((request, response) => {
  const searchEndPoint = '/search/tweets'
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

    const searchParams = {
      q: 'しまりん OR 志摩リン OR しまリン',
      locale: 'ja',
      popular: 'recent',
      count: 100
    }
    tw.get(searchEndPoint, searchParams, (error, tweets) =>  {
      if(error) {
        errorHandler(error)
        return
      }
      response.json({
        status: 200,
        payload: {
          tweets: tweets.statuses
        },
        error: false
      });
    })

  }catch(e) {
    errorHandler(e)
  }
});
