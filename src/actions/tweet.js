// @flow
export const SYNC_TWEET = 'tweet/sync-tweet'

export const syncTweet = (tweets:string) => (
  {
    type: SYNC_TWEET,
    payload: {
      tweets
    }
  }
)
