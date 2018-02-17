const functions = require('firebase-functions') ;
const Twitter = require('twitter');
const adminKey = require('./key.json');
const admin = require('firebase-admin');
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(adminKey),
  databaseURL:functions.config().firebase.databaseURL
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
//
//
const db = admin.database();

const expireTime = 900000 // 15分

const isCacheAlive = (cache) => new Promise((resolve, reject) => {
  try{
    if(cache && (new Date().getTime() - cache.lastUpdate) <= expireTime) {
      resolve()
    }
    resolve(cache)
  }catch(e){
    reject(e)
  }
})

const responseCache = (response) => (cache) => new Promise((resolve, reject) => {
  try {
    if(!cache) {
      resolve()
    }
    response.json({
      status: 200,
      payload: {
        tweets: cache.tweets
      },
      error: false
    });
  }catch(e){
    reject(e)
  }
})

const fetchShimarinForTwitter = () => new Promise((resolve, reject) => {
  try{
    const searchEndPoint = '/search/tweets'
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
    tw.get(searchEndPoint, searchParams, (error, { statuses : tweets }) =>  {
      if(error) { throw error }
      resolve(tweets)
    })
  }catch(e){
    reject(e)
  }
})

const writeCache = (tweets) => new Promise((resolve, reject) => {
  try{
    db.ref("/cache").set({tweets, lastUpdate: new Date().getTime()})
    resolve(tweets)
  }catch(e){
    reject(e)
  }
})

const errorHandler = (error) => {
  response.json({
    status: 500,
    payload: {
      error: JSON.stringify(error.message)
    },
    error: true
  })
}

exports.shimarin= functions.https.onRequest((request, response) => {
  response.contentType('application/json');
  db.ref('/cache').once('value', (snapshot) => new Promise((resolve) => {
    resolve(snapshot)
  }))
    .then(isCacheAlive)
    .then(responseCache(response))
    .then(fetchShimarinForTwitter)
    .then(tweets => new Promise((resolve, reject) => {
      try{
        response.json({
          status: 200,
          payload: {
            tweets
          },
          error: false
        });
      }catch(e){
        reject(e)
      }
    }))
    .then(writeCache)
    .catch(errorHandler)
});
