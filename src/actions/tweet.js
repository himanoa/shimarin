// @flow
export const SYNC_TWEET = 'tweet/sync_tweet'

type Tweet = {

}
export const syncTweet = (tweets:Array<Tweet>) => (
  {
    type: SYNC_TWEET,
    payload: {
      tweets
    }
  }
)
