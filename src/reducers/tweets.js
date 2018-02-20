// @flow
import { TWEETS_FETCH_SUCCESS, TWEETS_FETCH_FAILED } from "../actions/tweet";
import type { Tweet, Action } from "../actions/tweet";
import { uniqBy } from "ramda";

const isUniq = (t: Tweet): string => {
  if (t.retweeted_status == null) {
    return t.id_str;
  }
  return t.retweeted_status.id_str;
};
const tweets = (state: Array<Tweet> = [], action: Action) => {
  switch (action.type) {
    case TWEETS_FETCH_SUCCESS:
      return uniqBy(isUniq, action.payload.tweets).filter(t => presentMedia(t));
    case TWEETS_FETCH_FAILED:
    default:
      return state;
  }
};

const presentMedia = (t: Tweet): boolean => {
  if (t.extended_entities && t.extended_entities.media) {
    return true;
  }
  return false;
};

export default tweets;
