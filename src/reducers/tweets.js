// @flow
import { TWEETS_FETCH_SUCCESS, TWEETS_FETCH_FAILED } from "../actions/tweet";
import type { Tweet, Action } from "../actions/tweet";

const tweets = (state: Array<Tweet> = [], action: Action) => {
  switch (action.type) {
    case TWEETS_FETCH_SUCCESS:
      return action.payload.tweets;
    case TWEETS_FETCH_FAILED:
    default:
      return state;
  }
};

export default tweets;
