const functions = require("firebase-functions");
const Twitter = require("twitter");
const adminKey = require("./key.json");
const auth = require("./twitterToken.json");
const admin = require("firebase-admin");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(adminKey),
  databaseURL: "https://shimar-in.firebaseio.com/"
});

const expireTime = 900000; // 15分

const isCacheAlive = cache =>
  new Promise((resolve, reject) => {
    try {
      const diff = new Date().getTime() - cache.lastUpdate;
      if (cache && diff <= expireTime) {
        console.log(diff);
        console.log("cached");
        resolve(cache);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });

const responseCache = response => cache =>
  new Promise((resolve, reject) => {
    try {
      console.log("poepoe");
      console.log(cache);
      if (!cache) {
        resolve(cache);
      } else {
        response.json({
          status: 200,
          payload: {
            tweets: cache.tweets
          },
          error: false
        });
      }
    } catch (e) {
      reject(e);
    }
  });

const fetchShimarinForTwitter = () =>
  new Promise((resolve, reject) => {
    try {
      const searchEndPoint = "/search/tweets";
      console.error(auth);
      const tw = new Twitter(auth);
      const searchParams = {
        q: "しまりん OR 志摩リン OR しまリン filter:images",
        locale: "ja",
        popular: "recent",
        count: 100,
        include_entities: true
      };
      tw.get(searchEndPoint, searchParams, (error, tweets) => {
        if (error) {
          throw error;
        }
        tweets = tweets.statuses;
        resolve(tweets);
      });
    } catch (e) {
      reject(e);
    }
  });

const writeCache = db => tweets =>
  new Promise((resolve, reject) => {
    try {
      db.ref("/cache").set({ tweets, lastUpdate: new Date().getTime() });
      resolve(tweets);
    } catch (e) {
      reject(e);
    }
  });

const errorHandler = response => error => {
  response.json({
    status: 500,
    payload: {
      error: JSON.stringify(error.message)
    },
    error: true
  });
};

exports.shimarin = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET");
  const db = admin.database();
  db
    .ref("cache")
    .once("value")
    .then(
      snapshot =>
        new Promise(resolve => {
          const value = snapshot.val();
          if (!value) {
            resolve({});
          }
          console.log("cache hit");
          resolve({ tweets: value.tweets, lastUpdate: value.lastUpdate });
        })
    )
    .then(isCacheAlive)
    .then(responseCache(response))
    .then(fetchShimarinForTwitter)
    .then(
      tweets =>
        new Promise((resolve, reject) => {
          try {
            response.json({
              status: 200,
              payload: {
                tweets
              },
              error: false
            });
            resolve(tweets);
          } catch (e) {
            reject(e);
          }
        })
    )
    .then(writeCache(db))
    .catch(errorHandler(response));
});
